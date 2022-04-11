import sendEmail from './sendEmail';

describe('Controller: Send email', () => {
  describe('when name is not provided in request body', () => {
    const req = {
      body: {
        email: 'johndoe@mail.com',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const dep = {};

    it('should throw validation error', async () => {
      await sendEmail({ req, res, dep });

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          code: 'VALIDATION',
          message: 'validation error',
          context: ['name'],
        })
      );
    });
  });

  describe('when email is not provided in request body', () => {
    const req = {
      body: {
        name: 'John Doe',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const dep = {};

    it('should throw validation error', async () => {
      await sendEmail({ req, res, dep });

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          code: 'VALIDATION',
          message: 'validation error',
          context: ['email'],
        })
      );
    });
  });

  describe('when request body is empty', () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const dep = {};

    it('should throw validation error', async () => {
      await sendEmail({ req, res, dep });

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          code: 'VALIDATION',
          message: 'validation error',
          context: ['name', 'email'],
        })
      );
    });
  });

  describe('when calling SES failed for any reason', () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@mail.com',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const uuidv4 = () => 'fc7eb54f-dc0a-4e95-b81d-f9b650567f0f';

    const VerifyHtmlTemplate = {
      subject: 'Verify Your Account',
      html: '<html>Hi {{name}}, please verify your account</html>',
    };

    const ses = {
      sendEmail: jest.fn(() => ({
        promise: () => {
          throw new Error('Failed for whatever reason (╯°□°）╯︵ ┻━┻');
        },
      })),
    };

    const dep = { uuidv4, ses, VerifyHtmlTemplate };

    it('should throw unknown error with id', async () => {
      await sendEmail({ req, res, dep });

      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          code: 'UNKNOWN_ERROR',
          id: 'fc7eb54f-dc0a-4e95-b81d-f9b650567f0f',
        })
      );
    });
  });

  describe('when execution is a success', () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@mail.com',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const uuidv4 = () => 'fc7eb54f-dc0a-4e95-b81d-f9b650567f0f';

    const VerifyHtmlTemplate = {
      subject: 'Verify Your Account',
      html: '<html>Hi {{name}}, please verify your account</html>',
    };

    const ses = {
      sendEmail: jest.fn(() => ({
        promise: () => ({}),
      })),
    };

    const dep = { uuidv4, ses, VerifyHtmlTemplate };

    it('should return success', async () => {
      await sendEmail({ req, res, dep });

      expect(ses.sendEmail).toBeCalledWith(
        expect.objectContaining({
          Destination: { ToAddresses: ['johndoe@mail.com'] },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: '<html>Hi John Doe, please verify your account</html>',
              },
            },
            Subject: { Charset: 'UTF-8', Data: 'Verify Your Account' },
          },
          Source: 'hello@wengkhing.com',
        })
      );
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          message: 'success',
        })
      );
    });
  });
});

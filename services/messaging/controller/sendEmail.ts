import Joi from 'joi';
import { ControllerPayload } from '../inject/controller';
import { EmailTemplate, Receiver } from '../helper/type';
import { emailSource } from '../config/app.config';

const schema = Joi.object<Receiver>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const constructParams = (
  { email: emailTo, name }: Receiver,
  template: EmailTemplate
) => {
  return {
    Source: emailSource,
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: template.subject,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: template.html.replace(/{{name}}/g, name),
        },
      },
    },
  };
};

export default async ({ req, res, dep }: ControllerPayload) => {
  const { value: body, error } = schema.validate(req.body, {
    abortEarly: false,
  });

  const { ses, uuidv4, VerifyHtmlTemplate } = dep;

  if (error) {
    return res.status(400).json({
      code: 'VALIDATION',
      message: 'validation error',
      context: error.details.map((detail) => detail.context.key),
    });
  }

  const params = constructParams(body, VerifyHtmlTemplate);

  try {
    await ses.sendEmail(params).promise();

    res.status(200).json({ message: 'success' });
  } catch (error) {
    const errorId = uuidv4();
    console.error('UNKNOWN_ERROR:', `${errorId}:`, error);
    return res.status(500).json({
      code: 'UNKNOWN_ERROR',
      id: errorId,
    });
  }
};

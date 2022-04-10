import Joi from 'joi';
import { ControllerPayload } from '../inject/controller';

const schema = Joi.object({
  email: Joi.string().email().required(),
});

export default async ({ req, res, dep }: ControllerPayload) => {
  const { value: body, error } = schema.validate(req.body, {
    abortEarly: false,
  });

  const { uuidv4 } = dep;

  if (error) {
    return res
      .status(400)
      .json({ code: 'VALIDATION', message: 'validation error' });
  }

  try {

    res.status(200).json({ message: 'success' });
  } catch (error) {
    const errorId = uuidv4();
    console.error('INTERNAL_SERVER_EXCEPTION:', `${errorId}:`, error);
    return res.status(500).json({
      code: 'INTERNAL_SERVER_EXCEPTION',
      id: errorId,
    });
  }
};

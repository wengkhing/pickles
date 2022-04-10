import { SES } from 'aws-sdk';
import { publishEvent } from './helper/event';
import { v4 as uuidv4 } from 'uuid';

export type AppDependency = {
  ses: SES;
  publishEvent: typeof publishEvent;
  uuidv4: typeof uuidv4;
};

const ses = new SES();

const appDependency: AppDependency = {
  publishEvent,
  uuidv4,
  ses,
};

export default appDependency;

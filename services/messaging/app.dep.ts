import { SES } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { publishEvent } from './helper/event';
import VerifyHtmlTemplate from './templates/verify';
import { EmailTemplate } from './helper/type';

export type AppDependency = {
  ses: SES;
  publishEvent: typeof publishEvent;
  uuidv4: typeof uuidv4;
  VerifyHtmlTemplate: EmailTemplate;
};

const ses = new SES();

const appDependency: AppDependency = {
  publishEvent,
  uuidv4,
  ses,
  VerifyHtmlTemplate,
};

export default appDependency;

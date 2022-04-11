import { SES } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { publishEvent } from './helper/event';
import TransactionHtmlTemplate from './templates/transaction';
import VerificationHtmlTemplate from './templates/verification';
import { EmailTemplate } from './helper/type';

export type AppDependency = {
  ses: SES;
  publishEvent: typeof publishEvent;
  uuidv4: typeof uuidv4;
  emailTemplates: {
    [key: string]: EmailTemplate;
  };
};

const ses = new SES();

const appDependency: AppDependency = {
  publishEvent,
  uuidv4,
  ses,
  emailTemplates: {
    transaction: TransactionHtmlTemplate,
    verification: VerificationHtmlTemplate,
  },
};

export default appDependency;

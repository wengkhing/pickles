import VerifyHtmlTemplate from './verify.html';
import { EmailTemplate } from '../helper/type';

const VerifyEmailHtmlTemplate: EmailTemplate = {
  subject: 'Verify Your Email',
  html: VerifyHtmlTemplate,
};

export default VerifyEmailHtmlTemplate;

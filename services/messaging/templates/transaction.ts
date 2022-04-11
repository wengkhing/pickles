import TransactionHtmlTemplate from './transaction.html';
import { EmailTemplate } from '../helper/type';

const TransactionEmailHtmlTemplate: EmailTemplate = {
  subject: 'Transaction Completed',
  html: TransactionHtmlTemplate,
};

export default TransactionEmailHtmlTemplate;

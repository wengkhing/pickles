const { appName } = require('../../../shared/constants/app');

const serviceName = 'messaging';
const fullServiceName = `${appName}-${serviceName}`;
const region = 'ap-southeast-1';

const isOffline = process.env.IS_OFFLINE;
const remoteOrigin =
  process.env.APP_ENV === 'prod'
  ? 'https://heyget.me'
  : 'https://dev.heyget.me'

const allowedOrigin =
  isOffline === 'true'
  ? 'http://localhost:3000'
  : remoteOrigin;

exports.appName = appName;
exports.serviceName = serviceName;
exports.fullServiceName = fullServiceName;
exports.region = region;
exports.allowedOrigin = allowedOrigin;

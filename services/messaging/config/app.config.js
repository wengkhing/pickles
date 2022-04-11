const { appName } = require('../../../shared/constants/app');
const serviceName = require('../package.json').name;

const fullServiceName = `${appName}-${serviceName}`;
const region = 'ap-southeast-1';
const emailSource = 'hello@wengkhing.com';

exports.appName = appName;
exports.serviceName = serviceName;
exports.fullServiceName = fullServiceName;
exports.region = region;
exports.emailSource = emailSource;

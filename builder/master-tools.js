// builder/master-tools.js

const tools = [
  ...require('./tools-pdf'),
  ...require('./tools-pdf-2'),
  ...require('./tools-image'),
  ...require('./tools-image-2'),
  ...require('./tools-text'),
  ...require('./tools-text-2'),
  ...require('./tools-calculator'),
  ...require('./tools-calculator-2'),
  ...require('./tools-converter'),
  ...require('./tools-converter-2'),
  ...require('./tools-developer'),
  ...require('./tools-developer-2'),
  ...require('./tools-generator'),
  ...require('./tools-generator-2'),
  ...require('./tools-utility'),
  ...require('./tools-utility-2'),
  ...require('./tools-extra'),
  ...require('./tools-extra-2')
];

module.exports = tools;

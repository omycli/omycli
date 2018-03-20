const _ = require('lodash');

const { resolveApp, resolveOwn } = require('./resolve');
const { getPlugins } = require('./plugins');
const allConfig = require('./config/index')
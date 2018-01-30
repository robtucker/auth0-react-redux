const path = require('path');
const webpackMerge = require('webpack-merge');
const build = require('@robtucker/webpack-build');

const entry = path.resolve("./object/index.js");

module.exports = webpackMerge(build.getConfig(), {
    entry: entry,
});
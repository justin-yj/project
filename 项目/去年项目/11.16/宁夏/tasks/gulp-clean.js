'use strict';

var del = require('del');

module.exports = function clean() {
    return del(['.tmp', 'dist', 'build']);
}

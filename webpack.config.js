const path = require('path');

module.exports = {
  entry: './public/js/main.js',
  output: {
    path: path.resolve(__dirname,'public', 'dist'),
    filename: 'bundle.js',
  },
};
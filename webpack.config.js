var path = require('path');

  module.exports = {
    context: __dirname,
    entry: './helloworld/frontend/entry.jsx',
    output: {
      path: path.resolve(__dirname, 'helloworld', 'frontend', 'static','js'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '*']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015','react']
          }
        }
      ]
    },
    devtool: 'source-maps',
    watch: true
  };

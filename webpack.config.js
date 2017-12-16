var path = require('path');


  var webpack = require("webpack");

  var plugins = []; // if using any plugins for both dev and production
  var devPlugins = []; // if using any plugins for development

  var prodPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ];

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
   
  };

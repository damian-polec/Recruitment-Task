const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const config = {};

  config.mode = 'development';

  config.devtool = 'cheap-module-eval-source-map'

  config.entry = './src/index.js';

  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: ''
  };

  config.resolve = {
    extensions: ['.js', '.jsx']
  }

  config.module = {
    rules: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
            // options: {
            //   modules: true,
            //   localIdentName: '[name]__[local]__[hash:base64:5]'
            // }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
  return config;
}

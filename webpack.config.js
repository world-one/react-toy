const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  performance: { hints: false },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            // options: {
            //   sourceMap: true,
            //   injectType: 'singletonStyleTag'
            // }
          },
          {
            loader: 'css-loader',
            // options: {
            //   modules: {
            //     localIdentName: '[local]'
            //   },
            //   sourceMap: true
            // }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions:{
                // includePaths: [`${__dirname}/src/scss`],
              },
              // prependData: `@import '/utilities/variables';`
            }
          }
        ]
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    port: 8080,
    host: 'localhost',
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
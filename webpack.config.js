/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/source',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, './dist/js'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      // favicon: path.resolve(__dirname, './src/assets/icon-lemon.png'),
    }),
    // for favicon
    // new CopyPlugin({ 
    //   patterns: [
    //     {
    //       from: './src/assets/icon-lemon.png',
    //       to: './assets/icon-lemon.png',
    //       globOptions: {
    //         ignore: ['*.ts', '*.html'],
    //       },
    //     },
    //   ],
    // }),
    new Dotenv(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
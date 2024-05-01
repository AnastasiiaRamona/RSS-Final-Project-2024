const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',

  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
        exclude: /node_modules/
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};

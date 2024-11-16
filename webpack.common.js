import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  target: 'web',
  entry: {
    content: path.resolve(import.meta.dirname, 'src/content/content.js'),
    background: path.resolve(import.meta.dirname, 'src/background/background.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
  devServer: {
    contentBase: path.resolve(import.meta.dirname, 'dist'),
    hot: true,
    watchContentBase: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}
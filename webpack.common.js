import { fileURLToPath } from 'url';
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'web',
  entry: {
    content: './src/content/content.js',
    background: './src/background/background.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    watchContentBase: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }],
    }),
  ]
}
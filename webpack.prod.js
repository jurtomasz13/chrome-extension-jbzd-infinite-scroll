import path from 'path'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ZipPlugin from 'zip-webpack-plugin'

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(import.meta.dirname, 'static/manifest.prod.json'), to: 'manifest.json' },
        {
          from:
            path.resolve(import.meta.dirname, 'static'),
          globOptions: {
            ignore: [
              '**/manifest.*.json'
            ],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new ZipPlugin({
      filename: 'extension.zip',
      path: path.resolve(import.meta.dirname, 'dist'),
      compression: 'DEFLATE'
    })
  ],
})
import path from 'path'
import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(import.meta.dirname, 'static/manifest.dev.json'), to: 'manifest.json' },
        {
          from:
            path.resolve(import.meta.dirname, 'static'),
          globOptions: {
            ignore: [
              '**/manifest.*.json',
            ]
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ]
})
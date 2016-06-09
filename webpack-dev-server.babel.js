import webpack from 'webpack'
import express from 'express'
import _ from 'lodash'
import config, { serverPort, serverURI } from './webpack.config.babel.js'

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

const webpackDevModules = [
  `webpack-hot-middleware/client?path=${serverURI}/__webpack_hmr`,
]

_.each(config.entry, (file, name) => {
  config.entry[name] = webpackDevModules.concat([file])
})

const compiler = webpack(config)
const app = express()

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.listen(serverPort, 'localhost', (err) => {
  if (err) {
    cosole.log(err)
    return
  }

  console.log(`Dev server is listening at ${serverURI}`)
})

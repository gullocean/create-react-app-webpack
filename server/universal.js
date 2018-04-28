const path = require('path')
const fs = require('fs')

const React = require('react')
const {Provider} = require('react-redux')
const {renderToString} = require('react-dom/server')
const {StaticRouter} = require('react-router-dom')
const {Helmet} = require('react-helmet')

const {default: configureStore} = require('./../src/store')
const {default: App} = require('./../src/App')

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  process.env.HOST = req.headers.host
  process.env.PROTOCOL = req.protocol

  const context = {}
  const store = configureStore()
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App/>
      </StaticRouter>
    </Provider>
  )
  const helmet = Helmet.renderStatic()
  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app">${markup}</div>
      </body>
    </html>
  `

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    res.redirect(301, context.url)
  } else {
    res.send(html)
  }
}


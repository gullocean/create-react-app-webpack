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

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
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
    const regHead = /<head[^>]*>[\s\S]*<\/head>/gi
    const helmet = Helmet.renderStatic()
    const originHead = htmlData.match(regHead)[0]
    let html = htmlData.replace(regHead, `
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${originHead.replace('<head>', '').replace('</head>', '')}
      </head>
    `)
    html = html.replace('<html>', `<html ${helmet.htmlAttributes.toString()}>`)
    html = html.replace('<body>', `<body ${helmet.bodyAttributes.toString()}>`)

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url)
    } else {
      res.send(html)
    }
  })
}


import httpProxy from 'http-proxy'
import log from 'fancy-log'
import chalk from 'chalk'
import { parse } from 'url'

export default function (options) {
  // Proxy settings
  if (!options.proxyMaps[options.env]) {
    return null
  }
  const target = options.proxyMaps[options.env]
  const proxy = httpProxy.createProxyServer({
    target,
    secure: false,
    headers: {
      host: options.hostName || parse(target)['host'],
    },
  })
  log(chalk.cyan(`Seting proxy target to ${target}`))

  // Handle proxy error
  proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    })
    res.end('Proxy Error!')
    log.error(chalk.red(err))
  })
  return proxy
}

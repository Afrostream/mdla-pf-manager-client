import _ from 'lodash'
import client from './client'

const config = _.merge(
  {
    domain: {
      host: process.env.DOMAIN_HOST || 'localhost',
    },
    subdomain: process.env.SUBDOMAIN || 'www',

    token: {
      user: 'mandela-user',
      geo: 'mandela-geo',
    },
    /**
     * Front-End Server
     */
    server: {
      host: '0.0.0.0',
      ip: process.env.IP || undefined,
      port: process.env.PORT || 3000
    },

    /**
     * API Server
     */
    apiServer: {
      urlPrefix: process.env.API_END_POINT || 'http://localhost:3002'
    },

  }, client)

export default config

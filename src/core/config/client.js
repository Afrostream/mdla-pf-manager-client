// eslint-disable-next-line
const isProduction = process.env.NODE_ENV === 'production'
const client = {
  /**
   * Front-End Server
   */
  externalsJs: [],
  images: {
    protocol: process.env.API_IMAGES_PROTOCOL || 'http',
    authority: process.env.API_IMAGES_AUTHORITY || 'images.cdn.afrostream.net',
    urlPrefix: process.env.API_IMAGES_END_POINT || 'https://images.cdn.afrostream.net',
    quality: 65,
    type: 'jpg'
  },
  heroku: {
    appName: process.env.HEROKU_APP_NAME || 'afrostream-dev'
  },
}

export default client

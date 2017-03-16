import _ from 'lodash'
import config from './config'

_.mixin({
  flattenJson: function (x, result = {}, prefix) {
    if (_.isPlainObject(x)) {
      _.each(x, function (v, k) {
        _.flattenJson(v, result, prefix ? prefix + '.' + k : k)
      })
    }
    else {
      result[prefix] = x
    }
    return result
  }
});

export function getStatusColor (status) {
  switch (status) {
    case 'pending':
    case 'downloading':
    case 'waiting':
    case 'preprocessing':
    case 'running':
    case 'saving':
    case 'postprocessing':
    case 'someotherstatus':
      return 'processing'
    case 'ready':
    case 'complete':
      return 'success'
    case 'cancelled':
      return 'warning'
    case 'error':
      return 'error'
    default:
      return 'default'
  }
}

export function getStatusProgress (status) {
  switch (status) {
    case 'pending':
    case 'downloading':
    case 'ready':
    case 'waiting':
    case 'preprocessing':
    case 'running':
    case 'saving':
    case 'postprocessing':
    case 'someotherstatus':
      return 'active'
    case 'complete':
      return 'success'
    case 'cancelled':
    case 'error':
      return 'exception'
    default:
      return 'active'
  }
}

export function extractImg ({
  data,
  key,
  isMobile = false,
  keys = [],
  defaultImage,
  width = 1280,
  height = 'none',
  format = 'jpg',
  fit = 'clip',
  crop = 'entropy'
}) {
  let thumb

  let sizes = {
    width,
    height
  }

  let imageUrl = defaultImage || ''
  if (data) {

    let imageUrlExplicit = data.get('imageUrl')
    if (key) {
      thumb = data.get(key)
    }

    _.forEach(keys, (value) => {
      if (!thumb) {
        thumb = data.get(value)
      }
    })


    if (thumb) {
      if (typeof thumb === 'string') {
        return thumb
      }
      const path = thumb.get('path')
      if (path) {
        imageUrl = path
      }
    }

    else if (imageUrlExplicit) {
      return imageUrlExplicit
    }

  }

  if (isMobile) {
    sizes.width = Math.min(sizes.width, 768)
    sizes.height = Math.min(Math.round(sizes.width * 1.666), 650)
  }

  imageUrl = `${config.images.urlPrefix}${imageUrl}?&crop=${crop}&fit=${fit}&w=${sizes.width}&h=${sizes.height}&q=${config.images.quality}&fm=${format || config.images.type}`

  return imageUrl

}

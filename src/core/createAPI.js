import _ from 'lodash'
import URL from 'url'
import NProgress from 'nprogress'
import config from '../core/config'
import { getToken } from '../core/storage'
const {heroku} = config;

NProgress.configure({showSpinner: false});

const isTokenValid = function (tokenData) {
  return tokenData && tokenData.access_token
};

async function setTokenInHeader (headers) {
  try {
    let tokenData = await fetchToken()
    if (tokenData && isTokenValid(tokenData)) {
      headers = _.merge(headers || {}, {
        'Access-Token': tokenData.access_token
      });
    }
    return headers
  }
  catch (err) {
    console.log('set AccessToken in header fail', err);
    return headers;
  }
}

export async function fetchToken (refresh = false) {
  let tokenData = getToken();

  if (isTokenValid(tokenData) && !refresh) {
    return tokenData;
  }

  if (!refresh) {
    return tokenData;
  }

  if (!tokenData || !tokenData.refresh_token) {
    throw new Error('No refresh token availlable, refresh error');
  }
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log('Status Error :', error);
    throw error;
  }
}

/**
 * return api function base on createRequest function
 * Usage:
 *   api('/users')
 *   api('/users/me')
 *   ...
 *
 * createRequest() may different from client and server sides
 * You can see createRequest() at:
 * Client: ../main.js
 * Server: /servr/index.js
 */
export default function createAPI (createRequest) {
  return async function api ({
    path,
    method = 'GET',
    params = {},
    passToken = false
  }) {
    let {pathname} = URL.parse(path);
    let query = {},
      headers = {
        'Authorization': 'Basic ZGV2OmRldg==',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, body;

    if (_.isObject(method)) {
      params = method;
      method = 'GET'
    }

    query.from = query.from || heroku.appName;

    if (method === 'GET') {
      if (params && _.isObject(params)) {
        _.assign(query, params);
      }
    } else {
      body = params;
    }

    NProgress.start();

    if (passToken) {
      headers = await setTokenInHeader(headers);
    }

    const data = {
      method,
      headers,
      pathname,
      query,
      body
    };

    return createRequest(data)
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        NProgress.done();
        return json
      })
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import Router from './routes/Router'
import createStore from './core/createStore'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import './index.css';

const store = createStore();
const state = store.getState();

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Provider {...{store}} >
      <IntlProvider key="intl" {...{locale: state.intl.defaultLocale}}>
        <Router />
      </IntlProvider>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);

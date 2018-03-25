import React from 'react'
import { render } from 'react-dom'
import App from './screens/App'

render(<App />, document.getElementById('app'))

if (module.hot) module.hot.accept('./screens/App', () => render(Routes));

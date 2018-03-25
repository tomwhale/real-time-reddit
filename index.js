import React from 'react'
import { render } from 'react-dom'
import Routes from './Routes'

render(<Routes />, document.getElementById('app'))

if (module.hot) module.hot.accept('./Routes', () => render(Routes));

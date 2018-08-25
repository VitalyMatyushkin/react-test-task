import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux'
import Tables from './components/Tables';


ReactDOM.render(
	<Provider store={store}>
  		<Tables/>
	</Provider>,
  document.getElementById('app')
);
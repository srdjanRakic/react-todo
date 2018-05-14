import React from 'react';
import ReactDOM from 'react-dom';
import Todo from "./Todo"
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<Todo />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
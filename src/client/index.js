import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/containers/App.jsx';
import store from './store';
const io = require('socket.io-client');

const socket = io('http://localhost:3000');
socket.emit('testEvent', 'test test', 'param2');

socket.on('testResponse', (message) => {
    console.log(message);
});

render(
    // wrap the App in the Provider and pass in the store
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('contents')
);



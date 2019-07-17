import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'font-awesome/css/font-awesome.min.css'
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document && document.getElementById('root');


ReactDOM.render(<App  baseUrl={baseUrl}/>, rootElement);
//file:/home/dev/tinhht/fixbug/core-component-ui/dist
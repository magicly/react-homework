import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import First from './First';
import AuthExample from './AuthExample';
import ModalGallery from './ModalGallery';
import LifecycleTest from './LifecyleTest'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LifecycleTest />, document.getElementById('root'));
registerServiceWorker();

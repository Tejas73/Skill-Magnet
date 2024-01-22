import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <style>
      {`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}
    </style>
    <React.StrictMode>
      <RecoilRoot>
        <App></App>
      </RecoilRoot>
    </React.StrictMode>
  </>,
);


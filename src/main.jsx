import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import config from 'devextreme/core/config'; 
import { BrowserRouter } from 'react-router-dom';
// import { licenseKey } from './devextreme-license';  

config({ 
  // licenseKey,
  editorStylingMode: "outlined" 
});   

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

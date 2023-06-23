cd src
rm setupTests.js reportWebVitals.js App.test.js App.css logo.svg
echo "function App() {
  return (
    <div>
      
    </div>
  );
}
export default App;
" > App.js
echo "import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
" > index.js
mkdir components
cd ..
cd public
rm favicon.ico logo192.png logo512.png manifest.json robots.txt
cd..
echo "Deleted unnecessary files, created useful folders!"
git config \-\-global user.email "hackmech007@gmail.com"
git config \-\-global user.name "Arjun Patel"
git add .
git commit  \-m "Deleted unnecessary files, created useful folders!"
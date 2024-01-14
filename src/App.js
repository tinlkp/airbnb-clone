import logo from './logo.svg';
import './App.css';
import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import BackToTop from './components/BacktoTop/BackToTop';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <BackToTop />
    </BrowserRouter>

  );
}

export default App;

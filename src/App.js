import Menu from './components/Menu/Menu';
import './reset.scss';
import './variables.scss';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainInfo from './components/MainInfo/MainInfo';
import { useSelector } from 'react-redux';
import LogIn from './components/LogIn/LogIn';
import Advantages from './components/Advantages/Advantages';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainInfo />} />
            <Route path="/advantages" element={<Advantages/>} />
            <Route path="/main_info" element={<MainInfo />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

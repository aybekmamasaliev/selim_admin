import Menu from './components/Menu/Menu';
import './reset.scss';
import './variables.scss';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainInfo from './components/MainInfo/MainInfo';
import { useSelector } from 'react-redux';
import LogIn from './components/LogIn/LogIn';

import Advantages from './components/Advantages/Advantages';
import Services from './components/Services/Services';
import News from './components/News/News';
import Reviews from './components/Reviews/Reviews';
import Feedback from './components/FeedBack/FeedBack';
import Categories from './components/Categories/Cetegories';
import MainInfoTwo from './components/MainInfo2/MainInfoTwo';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainInfoTwo />} />
            <Route path="/advantages" element={<Advantages/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/news" element={<News/>} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/categories" element={<Categories/>} />
            {/* <Route path="/main_info" element={<MainInfo />} /> */}
            <Route path="/main_info" element={<MainInfoTwo />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { EmailProvider } from './context/EmailContext';

import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import SinglePage from './pages/SinglePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';

import Header from './components/Header';
import Footer from './components/Footer';


function App() {


  return (
    <>
    <ThemeProvider>
    <EmailProvider>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/work' element={<WorkPage />} />
          <Route path='/work/:slug' element={<SinglePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>

    </EmailProvider>
    </ThemeProvider>
    </>
  )
}

export default App

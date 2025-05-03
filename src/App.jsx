import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import HomePage from './pages/HomePage';

import Header from './components/Header';


function App() {


  return (
    <>
    <ThemeProvider>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='/work' element={<h1>Work</h1>} />
          <Route path='/work/:slug' element={<h1>Work Single</h1>} />
          <Route path='/contact' element={<h1>Contact</h1>} />
          <Route path='*' element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App

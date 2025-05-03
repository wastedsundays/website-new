import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='/work' element={<h1>Work</h1>} />
          <Route path='/work/:slug' element={<h1>Work Single</h1>} />
          <Route path='/contact' element={<h1>Contact</h1>} />
          <Route path='*' element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

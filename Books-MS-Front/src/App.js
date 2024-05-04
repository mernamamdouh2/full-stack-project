import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Utility/NavBar';
import HomePage from './Pages/Home/HomePage';

function App() {
  return (
    <div className='m-2' style={{
      backgroundColor: '#fff8f3',
      borderRadius: '15px',
      boxShadow: 'inset 0 0 6px #b99c7d',
      paddingRight: '15px',
      paddingLeft: '15px',
      paddingTop: '20px',
      paddingBottom: '20px'
    }}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

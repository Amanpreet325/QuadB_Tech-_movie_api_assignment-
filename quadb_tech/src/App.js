import React from 'react'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ShowList from './Components/ShowList';
import ShowSummary from './Components/ShowSummary';
import LocalStorage from './assets/LocalStorage';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [selectedShow, setSelectedShow] = useState({show:null});

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    console.log('selected show')
  };
  return (
    <>
    <Router>
        <Routes>
          <Route
            path="/"
            element={<ShowList  handleShowSelect={handleShowSelect} />}
          />
          <Route
            path="/show/:id"
            element={<ShowSummary/>}
          />
        </Routes>
      </Router>
      </>
  );
}

export default App;

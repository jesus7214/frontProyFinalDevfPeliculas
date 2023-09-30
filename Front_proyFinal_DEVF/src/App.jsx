

import React, { useState } from 'react';
import Header from './components/header';
import MainComponent from './components/mainComponent';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <Header />
      <MainComponent/>
      <footer>
        Desarrollado por Jesus Ignacio Sanchez Delgado
      </footer>
    </>
  );
}

export default App;

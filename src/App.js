import React from 'react';

import { About, Footer, Header, Skills, Education, Work } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Education />
      <Skills />
      <Work />
      <Footer />
    </div>
  );
}

export default App;
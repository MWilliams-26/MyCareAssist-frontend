import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import RegisterModal from '../RegisterModal/RegisterModal';

function App() {
  const [currentUser, setCurrentUser] = useState({
    
  });


  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;

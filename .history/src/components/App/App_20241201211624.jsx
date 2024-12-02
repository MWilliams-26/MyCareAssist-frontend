import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import RegisterModal from '../RegisterModal/RegisterModal';

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
    _id: "",
  });

  const hand


  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;

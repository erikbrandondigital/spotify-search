import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import { UserContext } from './contexts/UserContext';

import Home from './pages/Home';

function App() {
  const { userLoggedIn } = useContext(UserContext);

  return (
    <>
      <Header loggedIn={userLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

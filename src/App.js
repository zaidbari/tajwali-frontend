import React, { useEffect } from 'react';
import { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'



export const AuthContext = createContext();
function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [userId, setUserId] = React.useState(null);


  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setIsAuth(true);
      setUserId(user_id)
    }
  }, [])

  return (
    <AuthContext.Provider value={{isAuth, userId, setUserId, setIsAuth}}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </AuthContext.Provider>
    
    )
  }

export default App;

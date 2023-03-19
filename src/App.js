import React,{useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddMovie from './components/AddMovie';
import Cards from './components/Cards';
import Header from './components/Header';
import Detail from './components/Detail';
import Login from './components/Login';
import Signup from './components/Signup';
import { createContext , useContext} from 'react';

const AppState = createContext();


function App() {

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <AppState.Provider value={{login,setLogin,userName,setUserName}}>
    <div className="App relative">
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};

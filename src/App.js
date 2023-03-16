import { Route,Routes } from 'react-router-dom';
import './App.css';
import AddMovie from './components/AddMovie';
import Cards from './components/Cards';
import Header from './components/Header';



function App() {
  return (
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>}/>
        <Route path='/addmovie' element={<AddMovie/>}/>
      </Routes>
     
    </div>
  );
}

export default App;

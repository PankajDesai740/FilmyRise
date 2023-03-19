import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppState } from '../App';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {

  const useAppstate = useContext(AppState);

  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between text-red-400 items-center font-bold border-b-2 p-2 border-gray-400'>
      <Link to={'/'}><span>Filmy<span className='text-white'>Rise</span> </span></Link>
    { 
      useAppstate.login ?
      <Link to={'/addmovie'}>
        <h1 className='text-lg flex items-center cursor-pointer'>
          <Button>< AddIcon className='m-0.5 ' color='secondary' />
            <span className='text-white'> Add New</span>
          </Button>
        </h1>
      </Link>
      :
      <Link to={'/login'}>
      <h1 className='text-lg bg-green-600 flex items-center cursor-pointer'>
        <Button>
          <span className='text-gray-900 font-lg capitalize'>
          <LoginIcon className='mr-1 items-center' />  Login</span>
        </Button>
      </h1>
    </Link>
      }
    </div>
  )
}

export default Header
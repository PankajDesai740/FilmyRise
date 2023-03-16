import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between text-red-400 items-center font-bold border-b-2 p-2 border-gray-400'>
      <span>Filmy<span className='text-white'>Rise</span> </span>
      <Link to={'/addmovie'}>
        <h1 className='text-lg flex items-center cursor-pointer'>
          <Button>< AddIcon className='m-0.5 ' color='secondary' />
            <span className='text-white'> Add New</span>
          </Button>
        </h1>
      </Link>
    </div>
  )
}

export default Header
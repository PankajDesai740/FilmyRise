import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
const Header = () => {
  return (
    <div className='text-3xl flex justify-between text-red-400 items-center font-bold border-b-2 p-3 border-gray-400'>
    <span>Filmy<span className='text-white'>Rise</span> </span> 
    <h1 className='text-lg flex items-center cursor-pointer'>
      <Button>< AddIcon className='m-0.5 ' color='secondary'/>
      <span  className='text-white'> Add New</span>
       </Button>
       </h1>
    </div>
  )
}

export default Header
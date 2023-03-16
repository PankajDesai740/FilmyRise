import React, { useState } from 'react';
import ReactStars from 'react-stars';

const Cards = () => {

  const [data, setData] = useState([

    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },

    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },

    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    },
    {
      name: "Vikram",
      rating: 5,
      year: 2022,
      img: "https://wallpaperaccess.com/full/8242549.jpg"
    }
  ]);


  return (
    <div className='flex flex-wrap justify-between p3 mt-3'>
      {
        data.map((e, i) => {
          return (
            <div key={i} className='cards text-sm font-bold shadow-lg p-2 cursor-pointer
         hover:-translate-y-3 mt-6 transition-all duration-700'>
              <img className='h-72' src={e.img} alt="" />
              <h1> <span className='text-blue-200'>Name:</span>{e.name}</h1>
              <h1 className='flex items-center mr-1'><span className='text-blue-200'>Rating: </span>
                < ReactStars
                  size={20}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
              </h1>
              <h1><span className='text-blue-200'>Year:</span>{e.year}</h1>
            </div>
          )
        })
      }

    </div>
  )
}

export default Cards
import React, { useState , useEffect} from 'react';
import { Audio } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';


const Cards = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(() => {
   async function getData() {
    setLoading(true);
    const _data = await getDocs(moviesRef);
    console.log(_data);
    _data.forEach((doc => {
      setData((prev) => [...prev,doc.data()])
    }))

    setLoading(false);
   }
   getData();
  }, [])
  


  return (
    <div className='flex flex-wrap justify-betweeen gap-4 ml-4 mr-1 md:gap-8  px-3 mt-2'>
      { 
      loading ? <div className='w-full flex justify-center items-center h-96'><Audio height={40} color="white"/> </div>:
        data.map((e, i) => {
          return (
            <div key={i} className='cards text-sm font-medium shadow-lg p-2 cursor-pointer
         hover:-translate-y-3 mt-6 transition-all duration-700'>
              <img className='h-60 w-36 md:h-72 md:w-52 ' src={e.image} alt="" />
              <h1> <span className='text-blue-200'>Name:</span>{e.name}</h1>
              <h1 className='flex items-center mr-1'><span className='text-blue-200'>Rating: </span>
                < ReactStars
                  size={20}
                  half={true}
                  value={5}
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
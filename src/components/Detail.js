import React, { useState, useEffect } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ThreeCircles } from 'react-loader-spinner';
import Review from './Review';
const Detail = () => {

    const { id } = useParams();
    const [data, setData] = useState({
        name: "",
        year: "",
        image: "",
        desc: "",
        rating:0,
        rated:0
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _doc = doc(db, "movies", id)
            const _data = await getDoc(_doc)
            setData(_data.data());
            setLoading(false);
        }
        getData();

    }, [])



    return (
        <div className=' w-full p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center'>
            {
                loading ? <div className='h-96 w-full flex  justify-center items-center' >
                    <ThreeCircles height={35} color="white" /> </div> :
                    <>
                        <img className=' md:sticky md:top-24 h-96' src={data.image} alt="" />
                        <div className="md:ml-4 ml-0 w-full md:w-1/2">
                            <h1 className='text-3xl font-bold text-gray-400'>{data.name}
                                <span className='text-xl'> ({data.year})</span></h1>
                            < ReactStars
                                size={20}
                                half={true}
                                value={data.rating/data.rated}
                                edit={false}
                            />
                            <p className='mt-2'>
                                {data.desc}
                            </p>
                            <Review id={id} prevRating={data.rating} userRated={data.rated}/>
                        </div>
                    </>
            }
        </div>
    )
}

export default Detail
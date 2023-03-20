import React, { useContext, useState, useEffect } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import {AppState} from '../App';
import { useNavigate } from 'react-router-dom';


const Review = ({ id, prevRating, userRated }) => {
    const useAppState = useContext(AppState);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);

    const sendReview = async () => {
        setLoading(true);
        try {
            if(useAppState.login){
            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppState.userName,
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()

            })

            // to update doc 
            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1


            })
            setRating(0);
            setForm("");
            swal({
                title: "Reviews Posted Successfully",
                icon: "success",
                button: false,
                timer: 3000
            })
        } else {
            navigate('/login');
        }
        } catch (error) {

            swal({
                title: error.message,
                icon: "error",
                button: false,
                timer: 3000
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            let que = query(reviewsRef, where('movieid', '==', id));
            const querySnapshot = await getDocs(que);

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })

            setReviewsLoading(false);
        }
        getData();
    }, [])


    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            < ReactStars
                className='mb-2'
                value={rating}
                size={30}
                half={true}
                edit={true}
                onChange={(rate) => setRating(rate)}
            />
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Share Your Thoughts ... '
                className='w-full p-2 outline-none review border-y-2 border-x-2 border-gray-400 '
            />
            <button onClick={sendReview} className='w-full flex justify-center bg-green-600 p-2 mt-3 border-y-2 border-x-2 border-gray-700 '>

                {loading ? <TailSpin height={15} color=" white" /> : 'Share'}

            </button>

            {
                reviewsLoading ?
                    <div className='mt-8 flex justify-center'><ThreeDots height={15} color="white" /></div>
                    :
                    <div className='mt-6 '>
                        {
                            data.map((e,i) => {
                                return(
                                    <div className=' p-2 w-full   mt-2 border-b border-gray-700 header ' key={i}>
                                       <div className='flex items-center capitalize'> 
                                       <p className='text-blue-400 '> {e.name}</p>
                                       <p className='ml-2 text-xs'> ({new Date(e.timestamp).toLocaleString()})</p>
                                       </div>
                                       < ReactStars
                                          
                                            value={e.rating}
                                            size={15}
                                            half={true}
                                            edit={false}
                                            
                                           
                                         />
                                       <p className='capitalize text-xm'>{e.thought}</p>
                                      
                                       </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Review;
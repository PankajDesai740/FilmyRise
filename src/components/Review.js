import React,{useState} from 'react';
import ReactStars from 'react-stars';
import { reviewsRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';


const Review = ({id}) => {

    const [rating, setRating] = useState(0);
    const [loading,setLoading]= useState(false);
    const [form, setForm] = useState("")

    const sendReview = async () => {
        setLoading(true);
        try {
            await addDoc(reviewsRef, {
                movieid:id,
                name:" pankaj desai",
                rating: rating,
                thought:form,
                timestamp: new Date().getTime()

            })
            setRating(0);
            setForm("");
            swal({
                title: "Reviews Posted",
                icon: "success",
                button: false,
                timer: 3000
            })
         
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

  return (
    <div  className='mt-4 border-t-2 border-gray-700 w-full'>
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
       
       {loading ? <TailSpin height={15}  color=" white" /> :  'Share' }
         
         </button>
    </div>
  )
}

export default Review;
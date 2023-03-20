import React,{useContext, useState} from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { query , where, getDocs  } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import bycrpt from 'bcryptjs';
import {AppState} from '../App';


const Login = () => {
    const useAppState = useContext(AppState);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile:"",
        password:""
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {

            const que = query(usersRef,where('mobile', '==', form.mobile));
            const querySnapshot =await getDocs(que);
            querySnapshot.forEach((doc) =>{
            const _data = doc.data();
            const isUser = bycrpt.compareSync(form.password,  _data.password);
            if (isUser){
                useAppState.setLogin(true);
                useAppState.setUserName(_data.name)
                swal({
                    title: "Successfully Logged In",
                    icon: "success",
                    button: false,
                    timer: 3000
                }) 
                navigate('/');
            }else{
                swal({
                    title: "Invalid Credentials",
                    icon: "error",
                    button: false,
                    timer: 3000
                }) 
               
            }
           
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
    <div className='w-full mt-10 flex flex-col items-center'>
      <h1 className='text-2xl font-bold'>Login</h1>  

         <div className="p-2 w-full md:w-1/3">
             <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                   Mobile No..
                </label>
                 <input
                    type={'number'}
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    id="message"
                    name="message"
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                   />
             </div>
            </div>
            <div className="p-2 w-full md:w-1/3">
             <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                    Password
                </label>
                 <input
                    type={'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    id="message"
                    name="message"
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                   />
             </div>
            </div>
           
                <div className="p-2 w-full">
                                <button
                                    onClick={login}
                                    className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                    {loading ? <TailSpin height={25} color='white' /> : 'Login'}
                                </button>
                            </div>
                <div>
                    <p>Don't Have account? <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span></Link> </p>
                </div>

    </div>

  )
}

export default Login
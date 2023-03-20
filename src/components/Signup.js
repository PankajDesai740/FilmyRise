import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { usersRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import app from '../firebase/firebase';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import bycrypt from 'bcryptjs'


const auth = getAuth(app);

const Signup = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [otpsent, setOtpsent] = useState(false);
    const [OTP, setOTP] = useState("")

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size':'invisible',
            'callback':(response) => {

            }
        },auth);
    }

        const requestOtp = () => {
            setLoading(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier)
            .then(confirmationResult => {
               window.confirmationResult = confirmationResult ;
               swal({
                text:"OTP Sent",
                icon :"success",
                buttons:false,
                timer:3000,
               });
               setOtpsent(true);
               setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }

            //verify otp
    const verifyOTP =  () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text:"Successfully Verified",
                    icon:"success",
                    buttons:false,
                    timer:3000,
                })
                setLoading(false);
                navigate('/login')
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        const salt = bycrypt.genSaltSync(10);
        var hash = bycrypt.hashSync(form.password, salt);
        await addDoc(usersRef, {
           name:form.name,
           password:hash,
           mobile:form.mobile
        })
    }


    return (
        <div className='w-full mt-10 flex flex-col items-center'>
             <h1 className='text-2xl font-bold'>Sign Up</h1>
            {
                otpsent ?
                    <>
                    
                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                                  Confirm The OTP
                                </label>
                                <input
                                    placeholder='Enter a OTP'
                                    value={OTP}
                                    onChange={(e) => setOTP(e.target.value)}
                                    id="message"
                                    name="message"
                                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div className="p-2 w-full">
                            <button
                                onClick={verifyOTP}
                                className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                {loading ? <TailSpin height={25} color='black' /> : 'Confirm OTP'}
                            </button>
                        </div>


                    </>
                    :
                    <>
                        

                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label for="message" className="leading-7 text-sm text-gray-300">
                                    Name
                                </label>
                                <input

                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    id="message"
                                    name="message"
                                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label for="message" className="leading-7 text-sm text-gray-300">
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
                        <div class="p-2 w-full md:w-1/3">
                            <div class="relative">
                            <label htmlFor="message" class="leading-7 text-sm text-gray-300">
                                Password
                            </label>
                            <input
                                type={'password'}
                                id="message"
                                name="message"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            </div>
                        </div>


                            


                        <div className="p-2 w-full">
                            <button
                                onClick={requestOtp}
                                className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                {loading ? <TailSpin height={25} color='white' /> : 'Sign Up'}
                            </button>
                        </div>
                        <div>
                            <p>Already Have an account <Link to={'/login'}>   <span className='text-blue-500'> Login</span></Link> </p>
                        </div>
                    </>
            }

            <div id='recaptcha-container'></div>
        </div>

    )
}

export default Signup;
import React,{useState} from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        mobile:"",
        password:""
    });
    const [loading, setLoading] = useState(false);
  return (
    <div className='w-full mt-10 flex flex-col items-center'>
      <h1 className='text-2xl font-bold'>Login</h1>  

         <div class="p-2 w-1/3">
             <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-300">
                   Mobile No..
                </label>
                 <input
                    type={'number'}
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    id="message"
                    name="message"
                    class="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                   />
             </div>
            </div>
            <div class="p-2 w-1/3">
             <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-300">
                    Password
                </label>
                 <input
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    id="message"
                    name="message"
                    class="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                   />
             </div>
            </div>
           
                <div class="p-2 w-full">
                                <button
                                    class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
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
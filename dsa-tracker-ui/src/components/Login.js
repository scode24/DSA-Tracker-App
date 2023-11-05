import React from 'react'
import { Link } from 'react-router-dom'

function Login() {

    return (
        <div className='flex flex-row justify-center h-90v'>
            <div className='flex flex-col justify-center h-full text-center w-1/4 max-md:w-3/4'>
                <span className='text-3xl font-bold'>Sign in to your account</span>
                <form className='mt-9 text-left'>
                    <div className='flex flex-col'>
                        <label>Email address</label>
                        <input type='text' />
                    </div>

                    <div className='flex flex-col mt-3'>
                        <div className='flex flex-row justify-between'>
                            <label>Password</label>
                            <Link className='text-indigo-700 font-bold' to='/forgotPassword'>Forgot password?</Link>
                        </div>
                        <input type='password' />
                    </div>

                    <button className='w-full mt-5'>Sign in</button>
                </form>

                <span className='mt-7'>Not a member ? <Link className='text-indigo-700 font-bold' to='/register'>Sign up here</Link></span>
            </div>
        </div>
    )
}

export default Login
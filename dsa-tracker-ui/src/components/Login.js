import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { messageStore, userInfoStore } from '../shared/StateStore'
import axios from 'axios'
import bcrypt from 'bcryptjs'

function Login() {

    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

    const { messageObj, setMessageObj } = messageStore()
    const { userInfoObj, setUserInfoObj } = userInfoStore();

    const navigator = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const hashPassword = (password) => {
        // const salt = bcrypt.genSaltSync(10)
        // example =>  $2a$10$CwTycUXWue0Thq9StjUM0u => to be added always to the password hash
        return bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    }

    const handleLoginInput = (e) => {
        formData[e.target.name] = e.target.value
        setFormData(formData)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (formData['email'] === '' || formData['password'] === '') {
            setMessageObj('Please provide email id and password in order to login', 'info')
            return
        }

        axios.get(baseUrl + '/login', {
            headers: {
                'Content-Type': 'application/json',
                'email': formData['email'],
                'password': hashPassword(formData['password'])
            }
        }).then(response => {
            if (response['data'].length === 0) {
                setMessageObj('Invalid credentials. Please try again', 'info')
            } else {
                setUserInfoObj(response['data'][0])
                navigator('/playground')
            }
        }).catch(error => {
            const response = error['response']
            setMessageObj(response['data'], response['status']);
        })
    }

    return (
        <div className='flex flex-row justify-center h-90v'>
            <div className='flex flex-col justify-center h-full text-center w-1/4 max-md:w-3/4'>
                <span className='text-3xl font-bold'>Sign in to your account</span>
                <form className='mt-9 text-left' onSubmit={handleFormSubmit}>
                    <div className='flex flex-col'>
                        <label>Email address</label>
                        <input type='email' name='email' onChange={handleLoginInput} />
                    </div>

                    <div className='flex flex-col mt-3'>
                        <div className='flex flex-row justify-between'>
                            <label>Password</label>
                            <Link className='text-indigo-700 font-bold' to='/forgotPassword'>Forgot password?</Link>
                        </div>
                        <input type='password' name='password' onChange={handleLoginInput} />
                    </div>

                    <button className='custom-button w-full mt-5' type='submit'>Sign in</button>
                </form>

                <span className='mt-7'>Not a member ? <Link className='text-indigo-700 font-bold' to='/register'>Sign up here</Link></span>
            </div>
        </div>
    )
}

export default Login
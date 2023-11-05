import React from 'react'
import { useNavigate } from 'react-router-dom'
import { messageStore } from '../shared/StateStore';

function Header() {

    const { messageObj, setMessageObj } = messageStore();

    const navigator = useNavigate();

    const getBackgroundColor = () => {
        if (messageObj['status'] === 'success' || messageObj['status'] === 200) {
            return { 'backgroundColor': '#019031' }
        } else if (messageObj['status'] === 'info' || messageObj['status'] === 400) {
            return { 'backgroundColor': '#2475B0' }
        }
        return { 'backgroundColor': '#B83227' }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between p-4'>
                <div className='flex flex-row'>
                    <div className='flex flex-col justify-center items-center text-2xl mr-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                    </div>
                    <div className='flex flex-col justify-center items-center font-semibold cursor-pointer' onClick={() => navigator('/')}>
                        DSA Tracker 1.0
                    </div>
                </div>

                <div className='flex flex-row justify-center items-center'>
                    <div className='mr-5 cursor-pointer'>About</div>
                    <div className='flex flex-row cursor-pointer' onClick={() => navigator('/login')}>
                        <div className='flex flex-col justify-center items-center font-semibold'>
                            Sign In
                        </div>
                        <div className='flex flex-col justify-center items-center font-semibold pt-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {messageObj['message'] !== '' ?
                <div className='flex flex-row justify-between text-white w-full p-4' style={getBackgroundColor()}>
                    <div></div>
                    <div className='flex flex-row'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>

                        <span className='ml-3'>{messageObj['message']}</span>
                    </div>
                    <div className='flex flex-row justify-end text-white cursor-pointer' onClick={() => setMessageObj('', '')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div> : <></>
            }

        </div>
    )
}

export default Header
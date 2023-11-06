import React, { useEffect } from 'react'
import { messageStore } from '../shared/StateStore'
import { userInfoStore } from '../shared/StateStore'

function Playground() {

    const { messageObj, setMessageObj } = messageStore();
    const { userInfoObj, setUserInfoObj } = userInfoStore();

    useEffect(() => {
        setMessageObj('', '')
    }, [setMessageObj])

    return (
        <div className='flex flex-row border-t h-90v max-md:flex-col'>
            <div className='w-1/4 flex-col border-r p-3 max-md:w-full'>
                <div className='flex flex-col'>

                    <div className='flex flex-col card p-5'>
                        <span>Data metric</span>
                        <span className='text-2xl font-bold mt-1'>Entry statistics</span>
                        <div className='flex flex-row mt-2'>
                            <div className='h-10p rounded-sm' style={{ 'backgroundColor': '#019031', 'width': '80%' }}></div>
                            <div className='h-10p rounded-sm ml-1' style={{ 'backgroundColor': '#DFAF2B', 'width': '20%' }}></div>
                        </div>

                        <div className='flex flex-row mt-3'>
                            <div className='flex flex-col text-center mr-6' style={{ 'color': '#019031' }}>
                                <span className=''>Solved</span>
                                <span className='text-2xl mt-1 font-bold'>70</span>
                            </div>

                            <div className='flex flex-col text-center mr-5' style={{ 'color': '#DFAF2B' }}>
                                <span>Flagged</span>
                                <span className='text-2xl mt-1 font-bold'>70</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-3/4 flex-col p-3'>
                Coder
            </div>
        </div>
    )
}

export default Playground
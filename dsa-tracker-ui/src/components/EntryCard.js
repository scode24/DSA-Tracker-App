import React from 'react'

function EntryCard() {
    return (
        <div className='card flex flex-col h-fit-content border mr-3 mb-3 max-md:w-full'>
            <div className='h-5p rounded-md rounded-t-full bg-green-700'>
            </div>
            <div className='p-3 border-b'>
                <span className='font-bold'>Squares of a Sorted Array If you want to include a polyfill, you need to:</span>
                <p className='mt-3 text-sm h-90p overflow-scroll'>
                    If you want to include a polyfill, you need to
                </p>
            </div>

            <div className='flex flex-row justify-center m-3'>
                <button className='w-24'>Link</button>
                <button className='w-24'>Update</button>
                <button className='w-24'>Delete</button>
            </div>
        </div>
    )
}

export default EntryCard
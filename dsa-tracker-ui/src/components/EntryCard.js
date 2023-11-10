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
                <button className='w-28 bg-transparent text-black'>
                    <div className='flex flex-row justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        <span>Link</span>
                    </div>
                </button>
                <button className='w-28 bg-transparent text-black mx-3'>
                    <div className='flex flex-row justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <span>Update</span>
                    </div>
                </button>
                <button className='w-28 bg-transparent text-black'>
                    <div className='flex flex-row justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span>Delete</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default EntryCard
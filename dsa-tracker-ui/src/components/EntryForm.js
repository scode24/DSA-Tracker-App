import React from 'react'

function EntryForm() {
    return (
        <div className='card w-auto'>
            <div className='flex flex-row justify-between p-2 px-3 border-b'>
                <span className='font-bold'>Log entry form</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <form className='mt-5 text-left pb-5 px-5'>
                <div className='flex flex-col'>
                    <label>Question</label>
                    <input type='text' />
                </div>

                <div className='flex flex-col'>
                    <label>Link</label>
                    <input type='text' />
                </div>

                <div className='flex flex-col'>
                    <label>Topic</label>
                    <input type='text' />
                </div>

                <div className='flex flex-col'>
                    <label>Complexity</label>
                    <input type='text' />
                </div>

                <div className='flex flex-col'>
                    <label>Note</label>
                    <textarea type='text' />
                </div>

                <div className='flex flex-col mt-3'>
                    <div className='flex flex-row' style={{ 'color': '#DFAF2B' }} >
                        <input className='mr-2' type="radio" id="flagged" name="status" value="flagged" />
                        <label className='flex flex-col justify-center' for="flagged">Flagged for later revisit</label>
                    </div>

                    <div className='flex flex-row' style={{ 'color': '#019031' }}>
                        <input className='mr-2' type="radio" id="solved" name="status" value="solved" />
                        <label className='flex flex-col justify-center' for="solved">Solved</label>
                    </div>
                </div>

                <button className='custom-button w-full mt-5' type='submit'>Save information</button>
            </form>
        </div>
    )
}

export default EntryForm
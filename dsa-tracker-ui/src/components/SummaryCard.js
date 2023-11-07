import React from 'react'

function SummaryCard() {
    return (
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
    )
}

export default SummaryCard
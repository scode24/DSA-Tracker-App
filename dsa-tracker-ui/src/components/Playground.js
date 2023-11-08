import React, { useEffect, useState } from 'react'
import { messageStore } from '../shared/StateStore'
import { userInfoStore } from '../shared/StateStore'
import { updateFormDataStore } from '../shared/StateStore'
import SummaryCard from './SummaryCard';
import EntryForm from './EntryForm';

function Playground() {

    const { messageObj, setMessageObj } = messageStore()
    const { userInfoObj, setUserInfoObj } = userInfoStore()
    const { updateFormDataObj, setUpdateFormDataObj } = updateFormDataStore()
    const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false)

    useEffect(() => {
        setMessageObj('', '')
    }, [setMessageObj])

    const toggleLogEntryDialog = (value) => {
        if (value) {
            setIsEntryDialogOpen(true)
        } else {
            setIsEntryDialogOpen(false)
        }
    }

    return (
        <div className='flex flex-row border-t h-90v max-md:flex-col'>
            <div className='w-1/4 flex-col border-r p-3 max-md:w-full'>
                <div className='flex flex-col'>
                    <SummaryCard toggleLogEntryDialogFn={toggleLogEntryDialog}></SummaryCard>
                </div>
            </div>

            <div className='flex flex-row w-3/4 p-3 max-md:flex-col max-md:pt-0 max-md:w-auto'>
                {isEntryDialogOpen ?
                    <div className='w-1/3 max-md:w-auto'>
                        <EntryForm toggleLogEntryDialogFn={toggleLogEntryDialog} data={updateFormDataObj}></EntryForm>
                    </div>
                    : <></>
                }
                <div className='w-2/3 mx-3 max-md:w-auto max-md:mx-0 max-md:mt-3'>
                    {/* <EntryForm></EntryForm> */}
                </div>
            </div >
        </div >
    )
}

export default Playground
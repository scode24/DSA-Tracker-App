import React, { useEffect, useState } from 'react'
import { messageStore } from '../shared/StateStore'
import { userInfoStore } from '../shared/StateStore'
import { updateFormDataStore } from '../shared/StateStore'
import SummaryCard from './SummaryCard';
import EntryForm from './EntryForm';
import CardsPanel from './CardsPanel';
import axios from 'axios';

function Playground() {

    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

    const { messageObj, setMessageObj } = messageStore()
    const { userInfoObj, setUserInfoObj } = userInfoStore()
    const { updateFormDataObj, setUpdateFormDataObj } = updateFormDataStore()
    const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false)
    const [logData, setLogData] = useState([])
    const [solvedCount, setSolvedCount] = useState(0)
    const [flaggedCount, setFlaggedCount] = useState(0)

    useEffect(() => {
        setMessageObj('', '')
        fetchLogs('')
    }, [setMessageObj])

    const toggleLogEntryDialog = (value) => {
        if (value) {
            setIsEntryDialogOpen(true)
        } else {
            setIsEntryDialogOpen(false)
        }
    }

    const fetchLogs = (id) => {
        setSolvedCount(0)
        setFlaggedCount(0)
        let url = ''
        if (id === '') {
            url = baseUrl + '/find'
        } else {
            url = baseUrl + '/find/' + id
        }

        axios.get(url)
            .then(response => {
                setLogData(response['data'])
                for (let index = 0; index < response['data'].length; index++) {
                    const element = response['data'][index];
                    if (element['status'].toLowerCase() === 'solved') {
                        setSolvedCount(solvedCount + 1)
                    } else {
                        setFlaggedCount(flaggedCount + 1)
                    }
                }
            }).catch(error => {
                const response = error['response']
                setMessageObj(response['data'], response['status']);
            })
    }

    return (
        <div className='flex flex-row border-t h-90v max-md:flex-col'>
            <div className='w-1/4 flex-col border-r p-3 max-md:w-full'>
                <div className='flex flex-col'>
                    <SummaryCard toggleLogEntryDialogFn={toggleLogEntryDialog} data={
                        {
                            'solvedCount': solvedCount,
                            'flaggedCount': flaggedCount
                        }
                    }></SummaryCard>
                </div>
            </div>

            <div className='flex flex-row w-3/4 p-3 max-md:flex-col max-md:pt-0 max-md:w-auto'>
                {isEntryDialogOpen ?
                    <div className='w-1/3 max-md:w-auto'>
                        <EntryForm toggleLogEntryDialogFn={toggleLogEntryDialog} data={updateFormDataObj}></EntryForm>
                    </div>
                    : <></>
                }
                <div className='w-full mx-3 max-md:w-auto max-md:mx-0 max-md:mt-3' >
                    <CardsPanel toggleLogEntryDialogFn={toggleLogEntryDialog} fetchLogs={fetchLogs} data={logData}></CardsPanel>
                </div>
            </div >
        </div >
    )
}

export default Playground
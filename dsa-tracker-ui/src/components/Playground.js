import React, { useEffect, useState, useCallback } from 'react'
import { messageStore } from '../shared/StateStore'
import { updateFormDataStore } from '../shared/StateStore'
import SummaryCard from './SummaryCard';
import EntryForm from './EntryForm';
import CardsPanel from './CardsPanel';
import axios from 'axios';

function Playground() {

    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

    const { setMessageObj } = messageStore()
    const { updateFormDataObj, setUpdateFormDataObj } = updateFormDataStore()
    const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false)
    const [logData, setLogData] = useState([])
    const [solvedCount, setSolvedCount] = useState(0)
    const [flaggedCount, setFlaggedCount] = useState(0)

    const toggleLogEntryDialog = (value) => {
        if (value) {
            setIsEntryDialogOpen(true)
        } else {
            setIsEntryDialogOpen(false)
        }
    }

    const searchLogs = (value) => {
        axios.get(baseUrl + '/search?searchValue=' + value)
            .then(response => {
                let solvedCount = 0
                let flaggedCount = 0
                setLogData(response['data'])
                for (let index = 0; index < response['data'].length; index++) {
                    const element = response['data'][index];
                    if (element['status'].toLowerCase() === 'solved') {
                        solvedCount++
                    } else {
                        flaggedCount++
                    }
                }

                setSolvedCount(solvedCount)
                setFlaggedCount(flaggedCount)

            }).catch(error => {
                const response = error['response']
                setMessageObj(response['data'], response['status']);
            })
    }

    const fetchLogs = useCallback(
        async (id) => {
            let url = '';
            if (id === '') {
                url = baseUrl + '/find';
            } else {
                url = baseUrl + '/find/' + id;
            }

            try {
                const response = await axios.get(url);
                let solvedCount = 0;
                let flaggedCount = 0;
                setLogData(response.data);
                response.data.forEach((element) => {
                    if (element.status.toLowerCase() === 'solved') {
                        solvedCount++;
                    } else {
                        flaggedCount++;
                    }
                });

                setSolvedCount(solvedCount);
                setFlaggedCount(flaggedCount);
            } catch (error) {
                const response = error.response;
                setMessageObj(response.data, response.status);
            }
        },
        [setMessageObj, baseUrl]
    );

    useEffect(() => {
        setMessageObj('', '')
        fetchLogs('')
    }, [setMessageObj, fetchLogs])


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
                        <EntryForm toggleLogEntryDialogFn={toggleLogEntryDialog} data={updateFormDataObj} fetchLogs={fetchLogs} ></EntryForm>
                    </div>
                    : <></>
                }
                <div className='w-full mx-3 max-md:w-auto max-md:mx-0 max-md:mt-3' >
                    <CardsPanel toggleLogEntryDialogFn={toggleLogEntryDialog} fetchLogs={fetchLogs} searchLogs={searchLogs} data={logData}></CardsPanel>
                </div>
            </div >
        </div >
    )
}

export default Playground
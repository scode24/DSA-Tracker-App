import React, { useEffect } from 'react'
import { messageStore } from '../shared/StateStore'

function Playground() {

    const { messageObj, setMessageObj } = messageStore();

    useEffect(() => {
        setMessageObj('', '')
    }, [setMessageObj])

    return (
        <div>Playground</div>
    )
}

export default Playground
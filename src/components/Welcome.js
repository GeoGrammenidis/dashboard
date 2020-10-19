import React from 'react'
import useWrapper from '../hooks/useWrapper';

export default function Welcome() {
    useWrapper("users")
    return (
        <>
            <h2>Welcome</h2>
        </>
    )
}

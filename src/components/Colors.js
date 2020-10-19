import React from 'react'
import Loading from './Loading'
import useWrapper from '../hooks/useWrapper';

export default function Colors() {
    const {loading, error} = useWrapper("colors");
    const colors = JSON.parse(sessionStorage.getItem("colors"));
    return (
        <>
            {loading&&<Loading/>}
            {error&&<div className="error">{error}</div>}
            {colors&&<>
                <div className="colors-header">
                    <h2>Colors</h2>
                    <h3>Items:{colors.length}</h3>
                </div>
                <div className="colors-grid">
                    {colors.sort((a,b)=>b.year-a.year).map(x=>
                        <div className="grid-item" key={x.id}>
                            <div className="grid-box" style={{background:`${x.color}`}}>
                                <div className="grid-hex">
                                    <h3>{x.color}</h3>
                                </div>
                                <div className="grid-text">
                                    <span>{x.name}</span>
                                    <span>{x.year}</span>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </>}
        </>
    )
}
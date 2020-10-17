import React from 'react'
import { fetchColors } from '../utils/api'
import Loading from './Loading'

function colorsReducer(state, action) {
    switch (action.type) {
        case "success":
            return {
                colors: action.colors,
                error: null,
                loading: false
            }
        case "error":
            return {
                ...state,
                error: action.error,
                loading: false   
            }
        default:
            throw new Error(`That action type isnt supported`)
    }
}

export default function Colors() {
    const initialState = {
        colors: null,
        error: null,
        loading: true,
    }
    const [state, dispatch] = React.useReducer(colorsReducer, initialState)
    const _isMounted = React.useRef(null)

    React.useEffect(() => {
        _isMounted.current = true;
        fetchColors().then(colors=>{
            console.log(colors);
            const { error } = colors;
            error
                ? _isMounted.current&&dispatch({type:"error", error:`Error: ${error}`})
                : _isMounted.current&&dispatch({type:"success", colors})
        })
        .catch((error)=>_isMounted.current&&dispatch({type:"error", error:error.toString()}))
        return ()=> _isMounted.current=false
    }, [])

    const {loading, error, colors} = state;
    return (
        <>
            {loading&&<Loading/>}
            {error&&<div className="error">{error}</div>}
            {colors&&<>
                <div className="colors-header">
                    <h2>Colors</h2>
                    <h3>Items:{colors.data.length}</h3>
                </div>
                <div className="colors-grid">
                    {colors.data.sort((a,b)=>b.year-a.year).map(x=>
                        <div className="grid-item" key={x.id}>
                            <div className="grid-box" style={{background:`${x.color}`}}>
                                <div className="grid-hex">
                                    <h3>{x.color}</h3>
                                </div>
                                <div className="grid-text">
                                    <p>{x.name}</p>
                                    <p>{x.year}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </>}
        </>
    )
}
import React from 'react'
import { fetching } from '../utils/api'

function wrapperReducer(state, action){
    switch (action.type) {
        case "sessionLoad":
            return {
                error: null,
                loading: false
            }
        case "success":
            sessionStorage.setItem(action.dataKind, JSON.stringify(action.res.data));
            return {
                ...state,
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
            throw new Error(`This type of action is not supported`)
    }
}

export default function useWrapper( dataKind ) {
    const initialState = {
        error: null,
        loading: true,
    }
    const [state, dispatch] = React.useReducer(wrapperReducer, initialState)
    const _isMounted = React.useRef(null)

    React.useEffect(() => {
        _isMounted.current = true;

        if(!(sessionStorage.getItem(dataKind))){
            fetching(dataKind).then(res=>{
                const { error } = res;
                error
                    ? _isMounted.current&&dispatch({type:"error", error:`Error: ${error}`})
                    : _isMounted.current&&dispatch({type:"success", res, dataKind})
            })
            .catch((error)=>_isMounted.current&&dispatch({type:"error", error:error.toString()}))
            console.log("fetching...")
        }else{
            dispatch({type:"sessionLoad"})
        }
        return ()=> _isMounted.current=false
    }, [])
    return {
        loading:state.loading,
        error:state.error
    }
}
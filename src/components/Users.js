import React from 'react'
import { fetchUsers } from '../utils/api'
import Loading from './Loading'

function usersReducer(state, action) {
    switch (action.type) {
        case "delete":
            var toBeSet = JSON.parse(sessionStorage.getItem("users")).filter(x=>!action.toRemove.includes(x.id.toString()))
            sessionStorage.setItem("users", JSON.stringify(toBeSet))
            action.toRemove.forEach(x=>delete state.checked[x])
            return {
                ...state,
                activeBtn:Object.values(state.checked).length!=0?Object.values(state.checked).reduce((x,y)=>x||y):{}
            }
        case "toggle":
            state.checked[action.id]= !state.checked[action.id];
            return {
                ...state,
                activeBtn:Object.values(state.checked).reduce((x,y)=>x||y)
            }
        case "success":
            var myObj = {};
            action.users.data.sort((a,b)=>a.id-b.id).forEach(x=>myObj[x.id]=false)
            if(!(sessionStorage.getItem("users")))
                sessionStorage.setItem("users", JSON.stringify(action.users.data));
            return {
                activeBtn: false,
                checked: myObj,
                users: action.users,
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

export default function Users() {
    const initialState = {
        activeBtn: false,
        checked: null,
        users: null,
        error: null,
        loading: true,
    }
    const [state, dispatch] = React.useReducer(usersReducer, initialState)
    const _isMounted = React.useRef(null)

    React.useEffect(() => {
        _isMounted.current = true;
        fetchUsers().then(users=>{
            const { error } = users;
            error
                ? _isMounted.current&&dispatch({type:"error", error:`Error: ${error}`})
                : _isMounted.current&&dispatch({type:"success", users})
        })
        .catch((error)=>_isMounted.current&&dispatch({type:"error", error:error.toString()}))
        return ()=> _isMounted.current=false
    }, [])


    const {loading, error, users, checked, activeBtn} = state;

    function deleteAction() {
        var checkedKeys = Object.keys(checked)
        var checkedValues = Object.values(checked)
        var toRemove = checkedKeys.filter((x,i)=>checkedValues[i]);
        var comfirmed = false;
        if(toRemove.length==1)
            comfirmed=confirm(`Do you really want to delete user ${toRemove[0]}?`);
        else
            comfirmed=confirm(`Do you really want to delete users ${toRemove}?`);
        if(comfirmed)
            dispatch({type:"delete", toRemove})

    }

    return (
        <>
            {loading&&<Loading/>}
            {error&&<div className="error">{error}</div>}
            {users&&<>
                <div className="users-header">
                    <h2>Users</h2>
                    <button disabled={!activeBtn} onClick={()=>deleteAction()}>Delete</button>
                </div>
                <div className="users-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>LAST NAME</th>
                                <th>FIRST NAME</th>
                                <th>EMAIL</th>
                                <th>AVATAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(sessionStorage.getItem("users")).length==0?<tr><td colSpan="6" style={{textAlign:"center"}}>Empty table</td></tr>:
                                <>{JSON.parse(sessionStorage.getItem("users")).map(x=>
                                    <tr key={x.id}>
                                        <td><input type="checkbox" onChange={()=>dispatch({type:"toggle", id:x.id})} checked={checked[x.id]}></input></td>
                                        <td>{x.id}</td>
                                        <td>{x.last_name}</td>
                                        <td>{x.first_name}</td>
                                        <td>{x.email}</td>
                                        <td>{x.avatar.slice(47, -8)}</td>
                                    </tr>
                                )}</>
                            }

                        </tbody>
                    </table>
                </div>
            </>}
        </>
    )
}

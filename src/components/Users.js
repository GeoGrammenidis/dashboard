import React from 'react'
import { fetchUsers } from '../utils/api'
import Loading from './Loading'

function usersReducer(state, action) {
    switch (action.type) {
        case "success":
            return {
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
        users: null,
        error: null,
        loading: true,
    }
    const [state, dispatch] = React.useReducer(usersReducer, initialState)
    const _isMounted = React.useRef(null)

    React.useEffect(() => {
        _isMounted.current = true;
        fetchUsers().then(users=>{
            console.log(users);
            const { error } = users;
            error
                ? _isMounted.current&&dispatch({type:"error", error:`Error: ${error}`})
                : _isMounted.current&&dispatch({type:"success", users})
        })
        .catch((error)=>_isMounted.current&&dispatch({type:"error", error:error.toString()}))
        return ()=> _isMounted.current=false
    }, [])

    const {loading, error, users} = state;
    return (
        <>
            {loading&&<Loading/>}
            {error&&<div className="error">{error}</div>}
            {users&&<>
                <div className="users-header">
                    <h2>Users</h2>
                    <button disabled>Delete</button>
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
                            {users.data.map(x=>
                                <tr key={x.id}>
                                    <td><input type="checkbox"></input></td>
                                    <td>{x.id}</td>
                                    <td>{x.last_name}</td>
                                    <td>{x.first_name}</td>
                                    <td>{x.email}</td>
                                    <td>{x.avatar.slice(47, -8)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>}
        </>
    )
}

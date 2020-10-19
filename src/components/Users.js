import React from 'react'
import Loading from './Loading'
import useWrapper from '../hooks/useWrapper';
import useDelete from '../hooks/useDelete';

export default function Users() {
    const {loading, error} = useWrapper("users");
    const users = JSON.parse(sessionStorage.getItem("users"));
    const {activeBtn, checked, toggle, deleteAction } = useDelete();
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
                                <>{JSON.parse(sessionStorage.getItem("users")).sort((a,b)=>a.id-b.id).map((x,i)=>
                                    <tr key={x.id}>
                                        <td><input type="checkbox" onChange={()=>toggle(x.id)} checked={checked[x.id]}></input></td>
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

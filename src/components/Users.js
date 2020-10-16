import React from 'react'
import { fetchUsers } from '../utils/api'

export default function Users() {
    const getUsers = ()=> fetchUsers();
    getUsers().then(res=>{
        console.log(res);
    })
    return (
        <div>
            Users works
        </div>
    )
}

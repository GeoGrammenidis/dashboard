import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div>
            <ul>
                <li><NavLink to="/" exact activeClassName="selected">Logo</NavLink></li>
                <li><NavLink to="/colors" activeClassName="selected">Colors</NavLink></li>
                <li><NavLink to="/users" activeClassName="selected">Users</NavLink></li>
            </ul>
        </div>
    )
}
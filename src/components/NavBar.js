import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../images/logo.svg'
import Person from '../images/person.svg'

export default function NavBar() {
    const [active, setActive] = React.useState(false);
    function onClick() {
        setActive(!active)
    }
    function onClickClose() {
        setActive(false)
    }
    return (
        <>
            <div className="header">
                <div className="burger-container">
                    <div className={active?"burger open":"burger"} onClick={()=>onClick()}>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                    </div>
                </div>
                <div className="logo-wrap"><NavLink to="/" exact activeClassName="selected" onClick={()=>onClickClose()}><Logo/></NavLink></div>
                <div className="inside-header"><p>Dashboard</p></div>
                <div className="logout"><h6>Logout</h6><Person/></div>
            </div>
            <div className={active?"navigation open":"navigation"}>
                <ul>
                    <li><NavLink to="/colors" activeClassName="selected" onClick={()=>onClickClose()}>Colors</NavLink></li>
                    <li><NavLink to="/users" activeClassName="selected" onClick={()=>onClickClose()}>Users</NavLink></li>
                    <li><NavLink to="/settings" activeClassName="selected" onClick={()=>onClickClose()}>Settings</NavLink></li>
                </ul>
            </div>
        </>
    )
}
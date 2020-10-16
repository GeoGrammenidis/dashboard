import React from 'react'
import { fetchColors } from '../utils/api'

export default function Colors() {
    const getColors = ()=> fetchColors();
    getColors().then(res=>{
        console.log(res);
    })
    return (
        <div>
            Colors
        </div>
    )
}
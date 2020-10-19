import React from 'react'

function deleteReducer(state, action){
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
        default:
            throw new Error(`This type of action is not supported`)
    }
}

export default function useDelete() {
    var myObj = {};
    if(sessionStorage.getItem("users"))
        JSON.parse(sessionStorage.getItem("users")).forEach(x=>myObj[x.id]=false)
    const initialState = {
        activeBtn:false,
        checked: myObj,
    }
    const [state, dispatch] = React.useReducer(deleteReducer, initialState)
    
    function deleteAction() {
        var checkedKeys = Object.keys(state.checked)
        var checkedValues = Object.values(state.checked)
        var toRemove = checkedKeys.filter((x,i)=>checkedValues[i]);
        var comfirmed = false;
        if(toRemove.length==1)
            comfirmed=confirm(`Do you really want to delete user ${toRemove[0]}?`);
        else
            comfirmed=confirm(`Do you really want to delete users ${toRemove}?`);
        if(comfirmed)
            dispatch({type:"delete", toRemove})
    }

    function toggle(id) {
        dispatch({type:"toggle", id})
    }

    return {
        activeBtn:state.activeBtn,
        checked:state.checked,
        toggle,
        deleteAction
    }
}
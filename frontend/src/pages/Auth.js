import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import './Auth.css'

const Auth = props =>{
    const [users, setUsers] = useState()


    const [username ,setUsername]= useState({value:'', isValid:true})
    const [email ,setEmail]= useState()
    const [password, setPassword] = useState()

    const usernameChanegHandler = event => {
    let name = event.currentTarget.value
 
    if(users.find(user => user.name === name))
        setUsername({value:event.currentTarget.value, isValid:false})
    else 
        setUsername({value:event.currentTarget.value, isValid:true})
    }


    useEffect(()=>{
        fetch('http://localhost:5000/user/users')
        .then(res => res.json())
        .then(data => setUsers(data.users))
    }, [])


    return <div>
        <h1>Create FreeLance  Account</h1> 
        {props.login && 
        <form>
            <input className={` ${username.isValid ? "" : "wrong"}`} list="user-list" onChange={usernameChanegHandler} />
           {username.isValid ? "" :  <p>the username is already taken </p>}
        </form>
        }
        {props.signup &&
        <p> If you already have One , please <NavLink to={'login'} >aas</NavLink></p>&&
        <form>

        </form>
        }
     </div>
     
}


export default Auth
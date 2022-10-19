import React, { useContext, useState } from "react";

import { CheckContect, AuthContext } from "../shared/context/auth-context";


const Conform = props =>{
    const [code, setCode] = useState()
    const check_email = useContext(CheckContect)
    const auth = useContext(AuthContext)

    const submitHnadler = async event =>{
        event.preventDefault();
        try{
        const formData = new FormData()
            let check_email= JSON.parse(localStorage.getItem('check_email'))
            formData.append('name', check_email.username)
            formData.append('email',check_email.email)
            formData.append('password', check_email.password)
            console.log(check_email.image)
            formData.append('image',check_email.image)
            formData.append('hasdedCode',check_email.code)
            formData.append('code',code)

        const res = await fetch('http://localhost:5000/user/signup', {
            method: 'POST',
            body:formData
        })
        let data = await res.json()
        if(!res.ok){
            console.log(data.message)
        }
        auth.login(data.userId, data.token  )
    }catch(err){

    }
    }
    return <form onSubmit={submitHnadler}>
        <input onChange={event=>setCode(event.target.value)} />
        <button type={'submit'}>Conform</button>
    </form>
}


export default Conform
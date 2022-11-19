import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from './../../shared/loadingSpinner/LoadingSpinner'
import './Auth.css'

const Auth = props => {
    const [users, setUsers] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState({ value: '', isValid: true })
    const [email, setEmail] = useState({ value: '', isValid: true })
    const [password, setPassword] = useState({ value: '', isValid: true })
    const [image, setImage] = useState()
    const [isFormValid, setIsFormValid] = useState(true)

    const [code,setCode] = useState("c")
    const [receivedCode, setReceivedCode] = useState()

    const img = useRef()

    const auth = useContext(AuthContext)



    const setUsernameChangeHandler = event => {
        let name = event.currentTarget.value
        let isValid = true

        
        setError('')
        if (users.find(user => user.name === name) ) {
            setError('User Is Already Exist')
            isValid = false

        }
        if(name.includes(" ")){
            setError("can't name contain any spaces")
            isValid = false

        }
        setUsername({ value: name, isValid: isValid })

        setIsFormValid(isValid && password.isValid && email.isValid)

    }

    const setEmailChangeHandler = event => {
        let value = event.currentTarget.value
        let isValid = false
        if (value.indexOf('@') > 0) {
            isValid = true
        }
        setIsFormValid(username.isValid && password.isValid && isValid)
        setEmail({ value: value, isValid: isValid })

    }
    const setPasswordChangeHandler = event => {
        let value = event.currentTarget.value
        let isValid = false
        if (value.length > 4) {
            isValid = true
        }
        setPassword({ value: value, isValid: isValid })
        setIsFormValid(username.isValid && isValid && email.isValid)

    }


    const submitLoginHandler = async event => {
        event.preventDefault()
        setLoading(true)
        try {

            const res = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
            let data = await res.json()
            if (!res.ok) {
                setError(data.message)
            }
            console.log()
            auth.login(data.userId, data.token)

        } catch (err) {
            console.log(err)
        }
        setLoading(false)

    }

    const loadImageHandler = event => {

        let fileReader = new FileReader()
        fileReader.onload = () => {
            setImage(fileReader.result);
        }
        console.log(event.currentTarget.files[0])
        fileReader.readAsDataURL(event.currentTarget.files[0]);

    }
    const submitSignupHandler = async event => {
        event.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/user/validate-email', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email:email.value, name:username.value}),

            })
            let data = await res.json()
            if (!res.ok) {
                setError(data.message)
            }
            setReceivedCode(data.code)
            console.log(data.code)

        } catch (err) {
            console.log(err)
        }
        setLoading(false)

    }

    const signupHandler = async event => {
        event.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', username.value)
            formData.append('email', email.value)
            formData.append('password', password.value)
            formData.append('code',code)
            formData.append('hashedCode',receivedCode)
            
            formData.append('image',img.current.files[0])

            console.log(img.current.files[0])
            const res = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                body:formData,

            })
            let data = await res.json()
            if (!res.ok) {
                setError(data.message)
            }
            auth.login(data.userId, data.token)

        } catch (err) {
            console.log(err)
        }
        setLoading(false)

    }

    
    useEffect(() => {
        fetch('http://localhost:5000/user/users')
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }, [])
        
    document.title = props.login  ? 'login' : "signup"
    return  <div className="auth-container" style={{ backgroundImage: 'url(http://localhost:5000/static/images/auth.jpg)' }} >
        {receivedCode && <div className="auth validate">
        <h1>Activate Your Email  </h1>
        <form className="login-form "  onSubmit={signupHandler}>
            <input className={` ${username.isValid ? "" : "wrong"}`} required type={'text'} autoComplete="off" onChange={event => setCode(event.target.value)} />
            <p >{error}</p>
            <button type={'submit'}  >Activate</button>
        </form>
        </div>
        }
        <div className="auth" style={{display:receivedCode ? "none":"flex"}} >
            {props.login && <h1>login into Freelance </h1>}
            {props.login &&
                <form className="login-form" onSubmit={submitLoginHandler}>
                    <label>Email</label>
                    <input className={` ${username.isValid ? "" : "wrong"}`}  required type={'email'} onChange={setEmailChangeHandler} />
                    <label>Password</label>
                    <input className={` ${username.isValid ? "" : "wrong"}`} required type={'password'} onChange={setPasswordChangeHandler} />
                    <p >{error}</p>
                    <button type={'submit'}  >login</button>
                    <NavLink to={'/signup'} >I don't have an account ?</NavLink>
                    <LoadingSpinner isLoading={loading} />
                </form>
            }
            {props.signup && <h1>Create FreeLance  Account</h1>}
            {props.signup &&
                <p> If you already have One , please <NavLink to={'login'} >aas</NavLink></p> &&
                <form className="login-form " onSubmit={submitSignupHandler}>
                    <label>Username</label>
                    <input className={` ${isFormValid ? "" : "wrong"}`} type={'text'} required onChange={setUsernameChangeHandler} />
                    <label>Email</label>
                    <input className={` ${isFormValid ? "" : "wrong"}`}  type={'email'} required onChange={setEmailChangeHandler} />
                    <label>Password</label>
                    <input className={` ${isFormValid ? "" : "wrong"}`} min={4} type={'password'} required onChange={setPasswordChangeHandler} />
                    <p>{error}</p>
                    <img width={'100px'} src={image?image:'http://localhost:5000/static/images/user-icon.png'} alt={'sourceImage'} onClick={() => { img.current.click() }} />
                    <input style={{display:'none'}} id="image" required  ref={img} type={'file'} accept={'.jpg , .png'} onInput={(loadImageHandler)} />
                    <LoadingSpinner isLoading={loading} />
                    <button type={'submit'} disabled={!isFormValid} >signup</button>
                </form>
            }

        </div>
        
    </div>

}


export default Auth
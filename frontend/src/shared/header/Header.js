import React, { useEffect, useRef, useState } from "react";
import './Header.css'
import  logo from  './../../logo.png'
import {NavLink} from 'react-router-dom'
const Header = props =>{
    const [searchValue, setSearchValue] = useState("")
    const [searchContext, setSearchcontext] = useState()
    const [searhFocus, setSearchFocus] = useState(false)
    const [index, setIndex] = useState(0)
    const [dataListValue, setDataListValue ]  = useState("")
    const datalist = useRef()



    const selectDataListValue = event =>{
        if(event.key === 'Enter' ){
            setSearchValue(dataListValue)
            setSearchFocus(false)
        }
    }
    const keydataListHandler = event =>{

        if(event.key === 'ArrowDown' ){
            if(datalist.current.childNodes.length === 1){
                datalist.current.childNodes[0].style['backgroundColor']='rgb(207, 230, 208)'
                setDataListValue(datalist.current.childNodes[0].value)
                return
            }
            datalist.current.childNodes[index].style['backgroundColor']='rgb(207, 230, 208)'
            setDataListValue(datalist.current.childNodes[index].value)
            if (index !== 0)
                datalist.current.childNodes[index-1].style['backgroundColor']=''
            if(index < searchContext.length-1)
                setIndex(index+1) 
        }
        else if(event.key === 'ArrowUp'){
            if(datalist.current.childNodes.length === 1){
                datalist.current.childNodes[0].style['backgroundColor']='rgb(207, 230, 208)'
                setDataListValue(datalist.current.childNodes[0].value)
                return
            }
            datalist.current.childNodes[index].style['backgroundColor']=''
            setDataListValue(datalist.current.childNodes[index-1].value)
            datalist.current.childNodes[index-1].style['backgroundColor']='rgb(207, 230, 208)'
            if(index > 1)
                setIndex(index-1)
        }
    }

    useEffect( ()=>{
        fetch('http://localhost:5000/product/search', {
            method:'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({productName:searchValue})
        }).then((res)=>res.json()).then(data => setSearchcontext(data.products))
        
    },[ searchValue])


    return <div className="header"  style={{backgroundImage: 'url(http://localhost:5000/static/images/image1.jpg)'}} >
        <div></div>
        {searhFocus && <div className="black-shadow" onClick={()=>{setSearchFocus(false)}}></div>}
        <div className="header-content" onClick={()=>{setSearchFocus(false)}}>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="content">
                <div className="links">
                    <NavLink to='/home'>Popular</NavLink>
                    <NavLink to='/home'>Discover</NavLink>
                    <NavLink to='/home'>Bussines</NavLink>
    
                </div>
                <div className="auth-btn">
                    <NavLink>Login</NavLink>
                    <NavLink>Sign Up</NavLink>
                </div>
                <div className="profile">
                    <img width={64} src="http://localhost:5000/static/images/user-icon.png" alt="" />
                </div>
            </div>
        </div>
        <div className="search-bar"   onFocus={()=>{setSearchFocus(true)} }   >
            <p>Gabrielle, Video Editor
Find the perfect freelance services for your business</p>
            <div className="search" >
                <input list="lists" type={'search'} onKeyUp={selectDataListValue} onKeyDown={keydataListHandler} onChange={(event) => setSearchValue(event.target.value)}  value={searchValue}  />
 
                <button style={{borderTopRightRadius:searhFocus?0:'5px', borderBottomRightRadius:searhFocus?0:'5px'}} >search</button>
         
            </div>

            { searhFocus &&searchContext&&
           
            <div className="datalist" id="lists" ref={datalist}>
            {searchContext.map(item => <input 
             key={item.id} defaultValue={item.productName} 
             onClick={(event)=>{
                setSearchValue(event.target.value)
                setSearchFocus(false)
                }
                }  />)}
            </div>
            }
             
        </div>

    </div>
}

export default Header
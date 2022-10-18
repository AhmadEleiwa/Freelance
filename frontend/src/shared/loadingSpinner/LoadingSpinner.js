import React from "react";
import loadingSpinner from './loading.gif'
import './LoadingSpinner.css'
const LoadingSpinner = props =>{
    return <div className={`loading-spinner ${props.isLoading ? '': 'disabled'}`}>
        <div className="img">
            <img src={loadingSpinner}  alt=" "/>
        </div>
    </div>
}


export default LoadingSpinner
import React from 'react';
import {Redirect} from 'react-router-dom'

const Loggout=()=>{
    localStorage.removeItem('login');
    return(
        <div>
            <Redirect to='/login'/>
        </div>
    )
}

export default Loggout;
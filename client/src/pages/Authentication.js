import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {sendCode} from "../utils/googleAuth";

const Authentication=()=>{
    const search = useLocation().search;

    useEffect(() => {
        
        const code = new URLSearchParams(search).get('code');
        console.log(code);
        sendCode(code)
      }, []);

    return(
        <div>Hello</div>
    )
}

export default Authentication;
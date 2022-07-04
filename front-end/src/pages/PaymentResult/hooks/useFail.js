import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

async function useFail() {
    const [res, setRes] = useState(null)
    const { search } = useLocation();
    const query = queryString.parse(search);
    
    console.log(query)
    useEffect(()=>{
        setRes(query)
    }, [])
    
    return {
        res
    }
}

export default useFail
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

function CompEdit(){
    const { comId } = useParams();
    const [comInfo, setComInfo] = useState([]);

    async function getCompInfo() {
        try {
            let info = await axios.get(`${process.env.REACT_APP_SPRING_API}/api/company/${comId}`)
            setComInfo(info.data.body)

        } catch (error) {
            console.log(error)
        }
    }

    async function updateCompInfo() {
        try {
            let result = await axios.patch(`${process.env.REACT_APP_SPRING_API}/api/company/`, comInfo)
            console.log(result)

        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setComInfo({
            ...comInfo,
            [name]: value,
        });
    };

    useEffect(()=>{
        getCompInfo()
        return () => {
            setComInfo([])
        }
    }, [])

    return {
        comInfo, handleInput
    }
}

export default CompEdit
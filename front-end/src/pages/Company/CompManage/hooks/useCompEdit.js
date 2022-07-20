import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CompEdit(){
    const { comId } = useParams();
    const [comInfo, setComInfo] = useState([]);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState(null);
    const [updateForm, setUpdateForm] = useState([]);

    async function getCompInfo() {
        try {
            let info = await axios.get(`${process.env.REACT_APP_SPRING_API}/api/company/${comId}`)
            console.log(info)
            setComInfo(info.data.body)
            setUpdateForm(info.data.body)

        } catch (error) {
            console.log(error)
        }
    }

    async function updateCompInfo(e) {
        try {
            e.preventDefault();

            // console.log(comInfo)
            console.log(updateForm)
            // let result = await axios.patch(`${process.env.REACT_APP_SPRING_API}/api/company/`, comInfo)
            // console.log(result)

        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUpdateForm({
            ...updateForm,
            [name]: value,
        });
    };

    const handleOpenTime = (newValue) => {
        console.log(newValue)
        setOpenTime(newValue)
    }

    const handleCloseTime = (newValue) => {
        console.log(newValue)
        setCloseTime(newValue)
    }
    // https://mui.com/material-ui/react-button/
    // loading button

    useEffect(()=>{
        getCompInfo()
        return () => {
            setComInfo([])
            setUpdateForm([])
        }
    }, [])

    return {
        updateForm, openTime, closeTime, 
        handleInput, updateCompInfo, handleOpenTime, handleCloseTime
    }
}

export default CompEdit
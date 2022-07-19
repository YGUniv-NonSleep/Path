import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { updateStore } from "../../../../store/comp";

function useCompResign(){
    const { comId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [chk, setChk] = useState(false);

    const chkChange = () => {
        if(confirm("정말로 탈퇴하시겠습니까?")) setChk(true)
        else return
    }
    
    async function compResign() {
        try {
            let info = await axios.delete(`${process.env.REACT_APP_SPRING_API}/api/company/${comId}`)
            if(info.data.header.statusCode === 200) {
                dispatch(updateStore({ state: comId }))
                alert("Path콕! 서비스를 이용해주셔서 감사합니다.")
                return navigate("/company/store")

            } else return alert("탈퇴 과정 중에 문제가 발생하였습니다.")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (chk === true) compResign();
        return () => {
            setChk(false);
        }
    }, [chk])

    return {
        comId, chkChange
    }
}

export default useCompResign
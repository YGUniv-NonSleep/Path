import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

function signUp() {
    
    axios.post("/api/signup", {
        type: "USER",
        loginId: "asd",
        password: "asd",
        mail: "asd@asd.com",
        name: "asd",
        phone: "01012341234",
        addr: "주소",
        addrDetail: "상세주소",
        gender: "MALE",
        birthday: "1999-09-09",
        account: "String",
    }, {
        headers: {
            "Contents-Type": "application/json", 
            'Accept': '*/*'
        }
    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    });

    return (
        <div className="signup">
            <h2>회원가입</h2>
            <button>signup</button>
        </div>
    )
}

export default signUp;

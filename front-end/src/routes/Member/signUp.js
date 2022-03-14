import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

function signUp() {
    axios.post("/signup", {
        type: userType,
        loginId : String,
        password : String,
        mail : String,
        name : String,
        phone : String,
        addr : String,
        addrDetail : String,
        gender : userGender,
        birthday : String,
        account : String
    });

    return (
        <div>회원가입</div>
    )
}

export default signUp;

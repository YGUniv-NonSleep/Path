import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

const SignupContainer = styled.div`
    
`;

function signUp() {
    

    const su = () => axios.post("/api/company/create", {
        
        
        
        companyNumber: 1112233334, // 사업자등록번호
        openDate: "2022-11-11", 
        category: "CONVENIENCESTORE",
        name: "김가나",
        mail: "asd@naver.com",
        phone: "01012344321",
        member: {
            id: "asda"
        }
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
            <signupContainer>
                <h2>회원가입</h2>
                <button onClick={su}>signup</button>
            </signupContainer>
        </div>
    )
}

export default signUp;

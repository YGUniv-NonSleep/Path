import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

const SignupContainer = styled.div`
    width: 800px;
    height: 300px;
    padding-left: 150px;
`;

function signUp() {

    const generalUser = () => axios.post(
        process.env.REACT_APP_SPRING_API+"/api/signup", {
            
        loginId: "dasdsadsasdaaa",
        password: "asd",
        mail: "asd@asd.com",
        name: "asd",
        phone: "01012341234",
        addr: "주소",
        addrDetail: "상세주소",
        gender: "MALE",
        birthday: "1999-09-09",
    }).then((response) => {
        console.log(response.data)
        //console.log(response.data)
    }).catch((error) => {
        console.log(error)
    });

    const companyLookUp = () => axios.get(
        process.env.REACT_APP_SPRING_API+"/api/company/1") //{userId}
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log(error)})

    const companyRegist = () => axios.post(
        process.env.REACT_APP_SPRING_API+"/api/company/create", {
        // REACT_APP_SPRING_API=http://localhost:8080
        name: "김가나",
        companyNumber: "1112233334", // 사업자등록번호
        openDate: "2021-11-11", 
        category: "CONVENIENCESTORE",
        mail: "asd@naver.com",
        phone: "01012344321",
        member: {
            id: 1
        },
        latitude: "1231",
        longitude: "123213"

    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    });

    return (
        <div className="signup">
            <SignupContainer>
                <h2>회원가입</h2>
                <button onClick={generalUser}>일반 signup</button>
                <button onClick={companyRegist}>업체 signup</button>
                <button onClick={companyLookUp}>업체 조회</button>
            </SignupContainer>
        </div>
    )
}

export default signUp;

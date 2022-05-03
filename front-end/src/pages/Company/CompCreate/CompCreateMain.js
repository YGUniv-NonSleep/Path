import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompCreateCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompCreateSubCon = styled.div`
    margin-left: 130px;
`;

function CompCreateMain() {
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(null);
    const navigation = useNavigate()

    useEffect(() => {
        setLoading(true);
    }, []);

    async function compFormSubmit(e) {
        e.preventDefault();

        let inputImageFiles = e.target.userfile.files;

        const imageformData = new FormData();
        // FormData에 Key:Value 넣기
        for (var i = 0; i < inputImageFiles.length; i++) {
            imageformData.append("multipartFile", inputImageFiles[i]);
        }

        const imageData = await axios.post(process.env.REACT_APP_SPRING_API + `/api/image`, imageformData, {
            headers: {
            "Content-Type": `multipart/form-data`,
            },
        })
        .catch((err) => {
            console.log(err);
        });

        const data = {    
            "name": e.target.name.value,
            "companyNumber":parseInt(e.target.crn.value),
            "openDate": e.target.openDate.value,
            "category": e.target.category.value,
            "mail": e.target.email.value,
            "phone": e.target.phone.value,
            "latitude": e.target.lat.value,
            "longitude": e.target.long.value,
            "thumbnail": imageData.data
        };

        // let formData = new FormData();
        // formData.append("picture", e.target.userfile.files[0]);
        // formData.append(
        //     "json", new Blob([JSON.stringify(data)], { type: "application/json" })
        // );
        setFormInfo(data)
    }

    function createCompany() {
        if(formInfo != null){
            axios.post(
                process.env.REACT_APP_SPRING_API +"/api/company/", formInfo
            ).then((res)=>{
                console.log(res)
                alert("업체 등록 완료")
                navigation(-1)
            }).catch((err)=>{
                console.log(err)
            })
        } else return
    }

    useEffect(() => {
        createCompany()
    }, [formInfo])


    // const test = (event) => {
    //     event.preventDefault();
    //     axios.get(
    //         process.env.REACT_APP_SPRING_API+"/api/company/1"
    //         //"https://localhost:8080/api/company/1"
    //         )
    //         .then((res) => {
    //             console.log(res);        
    //       }).catch((err) => {
    //             console.log(err);            
    //       });
    //   };

    return (
        <CompCreateCon>
            <CompCreateSubCon>
            { loading ? <p>업체 가입 화면 나왔다</p> : <h2>로드 중...</h2> }
            {/* <button onClick={test} >Test</button> */}
            <form 
                className="compForm" 
                onSubmit={compFormSubmit}
                encType="multipart/form-data">
                <input type="text" placeholder="업체명" name="name"/>
                <input type="text" placeholder="사업자등록번호" name="crn"/>
                <input type="date" placeholder="개업일자" name="openDate"/>
                <select type="text" placeholder="카테고리" name="category" >
                    <option value='' selected>ㅡㅡㅡㅡ 선택 ㅡㅡㅡㅡ</option>
                    <option name="CONVENIENCESTORE">CONVENIENCESTORE</option>
                    <option name="CAFE">CAFE</option>
                    <option name="RESTAURANT">RESTAURANT</option>
                    <option name="MART">MART</option>
                </select>
                <input type="text" placeholder="이메일" name="email"/>
                <input type="text" placeholder="전화번호" name="phone"/>
                <input type="text" placeholder="위도" name="lat"/>
                <input type="text" placeholder="경도" name="long"/>
                <input type="file" name="userfile" multiple="multiple" />
                <button onClick={() => navigate(-1)}>돌아가기</button>
                <button onClick={createCompany}>업체등록</button>
            </form>
            </CompCreateSubCon>
        </CompCreateCon>
    )
}

CompCreateMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompCreateMain;
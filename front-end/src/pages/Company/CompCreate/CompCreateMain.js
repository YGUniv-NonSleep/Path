import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../../hooks/useLoading"
import useCompCreate from "../hooks/useCompCreate";

const CompCreateCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompCreateSubCon = styled.div`
    margin-left: 130px;
`;

function CompCreateMain() {
    const { loading } = useLoading();
    const {
        navigate, 
        // formInfo, 
        compFormSubmit, createCompany
    } = useCompCreate();

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
                {/* 도로명주소 받으면서 위도, 경도 받아서 넘기기 */}
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
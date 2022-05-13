import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompCreateCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompCreateSubCon = styled.div`
    margin-left: 130px;
`;

function CompCreate(props) {
    const navigate = useNavigate()

    return (
        <CompCreateCon>
            <CompCreateSubCon>
            { props.loading ? <p>업체 가입 화면 나왔다</p> : <h2>로드 중...</h2> }
            {/* <button onClick={props.test} >Test</button> */}
            <form 
                className="compForm" 
                onSubmit={props.compFormSubmit} 
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
                <button onClick={props.createCompany}>업체등록</button>
            </form>
            </CompCreateSubCon>
        </CompCreateCon>
    )
}

CompCreate.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompCreate;
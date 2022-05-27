import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../../hooks/useLoading"
import useCompCreate from "../hooks/useCompCreate";
import DaumPostcode from "react-daum-postcode";

const CompCreateCon = styled.div`
    width: 450px;
    height: 100%;
`;

const CompCreateSubCon = styled.div`
    margin-left: 130px;
`;

const dpStyle = {
    position: "absolute",
    width: 450,
    height: 300,
    top: 1,
    //left: "-178px",
    //right: "-178px",
    zIndex: "100",
    border: "1px solid #000000",
    overflow: "hidden",
};

function CompCreateMain() {
    const { loading } = useLoading();
    const {
        navigate, open, address, 
        handleOpen, compFormSubmit, createCompany, handleComplete
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
                <input type="text" placeholder="업체명" name="name"/><br/>
                <input type="text" placeholder="사업자등록번호" name="crn"/><br/>
                <input type="date" placeholder="개업일자" name="openDate"/><br/>
                <select type="text" placeholder="카테고리" name="category" >
                    <option defaultValue={''}>ㅡㅡㅡㅡ 선택 ㅡㅡㅡㅡ</option>
                    <option name="CONVENIENCESTORE">CONVENIENCESTORE</option>
                    <option name="CAFE">CAFE</option>
                    <option name="RESTAURANT">RESTAURANT</option>
                    <option name="MART">MART</option>
                </select>
                <input type="text" placeholder="이메일" name="email"/><br/>
                <input type="text" placeholder="전화번호" name="phone"/><br/>
                {/* 도로명주소 받으면서 위도, 경도 받아서 넘기기 */}
                <div>
                    <div>
                        <span><b>*</b>주소</span>
                    </div>
                    <div>
                        {address != null ? (
                            <div name="juso">{address.fullAddress}</div>
                        ) : (
                            "빈칸"
                        )}
                    </div>
                    <input type="text" placeholder="상세주소" name="subJuso" />
                    <button type="button" onClick={handleOpen}>주소 검색</button>
                </div>
                {open ? (
                    <>
                        {/* 닫기 버튼 구현하기 */}
                        {/* <button onClick={handleClose}>닫기</button> */}
                        <DaumPostcode
                            className="post-code"
                            onComplete={handleComplete}
                            autoClose
                            style={dpStyle}
                            errorMessage={console.error()}
                        ></DaumPostcode>
                    </>
                ) : null}
                오픈시간 : <input type="time" name="oTime" /><br/>
                종료시간 : <input type="time" name="cTime" /><br/>
                <input type="file" name="userfile" multiple="multiple" />
                <button type="button" onClick={() => navigate("/company/store")}>돌아가기</button>
                <button type="button" onClick={createCompany}>업체등록</button>
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
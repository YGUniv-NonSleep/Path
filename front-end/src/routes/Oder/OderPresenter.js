import PropTypes from "prop-types";
import styled from "styled-components";

const OderCon = styled.div`
    width: 390px;
    height: 100%;
`;

const OderSubCon = styled.div`
    margin-left: 130px;
`;

function OderPresenter(props) {
    console.log(props)
    
    return (
        <div className="Oder">
            <OderCon>
                <OderSubCon>
                { props.loading ? <p>오더 화면 나왔다</p> : <h2>로드 중...</h2> }
                {/* <button onClick={props.test} >Test</button> */}
                <form className="compForm" onSubmit={props.compFormSubmit}>
                    <input type="text" placeholder="업체명" name="name"/>
                    <input type="text" placeholder="사업자등록번호" name="crn"/>
                    <input type="date" placeholder="개업일자" name="openDate"/>
                    <input type="text" placeholder="카테고리" name="category"/>
                    <input type="text" placeholder="이메일" name="email"/>
                    <input type="text" placeholder="전화번호" name="phone"/>
                    <input type="text" placeholder="위도" name="lat"/>
                    <input type="text" placeholder="경도" name="long"/>
                    <button onClick={props.createCompany}>업체등록</button>
                </form>
                </OderSubCon>
            </OderCon>            
        </div>
    )
}

OderPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default OderPresenter;
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompEditCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompEditSubCon = styled.div`
    margin-left: 130px;
`;

function CompEdit(props) {
    return (
        <CompEditCon>
            <CompEditSubCon>
                { props.loading ? <p>업체정보 수정 화면</p> : <h2>로드 중...</h2> }
                <Outlet></Outlet>
            </CompEditSubCon>
        </CompEditCon>
    )
}

CompEdit.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompEdit;
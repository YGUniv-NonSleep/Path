import { Link, Outlet } from "react-router-dom";
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
    return (
        <CompCreateCon>
            <CompCreateSubCon>
            { props.loading ? <p>업체 가입 화면 나왔다</p> : <h2>로드 중...</h2> }
            <Outlet></Outlet>
            </CompCreateSubCon>
        </CompCreateCon>
    )
}

CompCreate.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompCreate;
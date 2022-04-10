import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ResignCon = styled.div`
    width: 390px;
    height: 100%;
`;

const ResignSubCon = styled.div`
    margin-left: 130px;
`;

function Resign(props) {
    return (
        <ResignCon>
            <ResignSubCon>
                { props.loading ? <p>업체 탈퇴 화면</p> : <h2>로드 중...</h2> }
                <Outlet></Outlet>
            </ResignSubCon>
        </ResignCon>
    )
}

Resign.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Resign;
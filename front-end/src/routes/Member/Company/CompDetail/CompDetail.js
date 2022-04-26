// import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompDetailCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompDetailSubCon = styled.div`
    margin-left: 130px;
`;

function CompDetail(props) {
    console.log(props)
    return (
        <CompDetailCon>
            <CompDetailSubCon>
                <div>디테일</div>
            </CompDetailSubCon>
        </CompDetailCon>
    )
}

export default CompDetail
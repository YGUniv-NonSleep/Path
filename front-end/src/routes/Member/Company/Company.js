import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompSubCon = styled.div`
    margin-left: 130px;
`;

function Company(props) {
    
    return (
        <>
            <CompCon>
                <CompSubCon>
                { props.loading ? <p>업체 화면 나왔다</p> : <h2>로드 중...</h2> }
                </CompSubCon>
            </CompCon>
        </>
    )
}

Company.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Company;
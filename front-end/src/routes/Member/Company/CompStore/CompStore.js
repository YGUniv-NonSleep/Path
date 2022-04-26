import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompStoreCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompStoreSubCon = styled.div`
    margin-left: 130px;
`;

function CompStore(props) {
    
    return (
        <CompStoreCon>
            <CompStoreSubCon>
                { props.loading ? <p>마이 업체 화면 나왔다</p> : <h2>로드 중...</h2> }
                <Outlet></Outlet>
            </CompStoreSubCon>
        </CompStoreCon>
    )
}

CompStore.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompStore;
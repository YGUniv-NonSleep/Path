import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompManageCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompManageSubCon = styled.div`
    margin-left: 130px;
`;

function CompManage(props) {
    return (
        <CompManageCon>
            <CompManageSubCon>
                { props.loading ? <p>업체 관리 화면 나왔다</p> : <h2>로드 중...</h2> }
            </CompManageSubCon>
        </CompManageCon>
    )
}

CompManage.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompManage;
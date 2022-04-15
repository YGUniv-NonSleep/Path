import { Link, Outlet } from "react-router-dom";
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
    console.log(props.companyId)
    return (
        <CompManageCon>
            <CompManageSubCon>
                { props.loading ? <p>상품 관리 도화지</p> : <h2>로드 중...</h2> }
                <div>여기서 관리를 시작하세요!</div>
                <Link to="items"><button>상품 목록</button></Link>
                <Link to="itemEdit"><button>상품 관리</button></Link>
                <Link to="compEdit"><button>업체정보 수정</button></Link>
                <Link to="resign"><button>업체 탈퇴</button></Link>
                <Outlet context={props.companyId}></Outlet>
            </CompManageSubCon>
        </CompManageCon>
    )
}

CompManage.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompManage;
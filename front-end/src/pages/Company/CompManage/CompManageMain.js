import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompManageCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompManageSubCon = styled.div`
    margin-left: 130px;
`;

function CompManageMain() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const { comId } = useParams()
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        // console.log(comId)
    }, []);

    return (
        <CompManageCon>
            <CompManageSubCon>
                { loading ? <p>상품 관리 도화지</p> : <h2>로드 중...</h2> }
                <div>여기서 관리를 시작하세요!</div>
                <Link to="items"><button>상품 목록</button></Link>
                <Link to="compEdit"><button>업체정보 수정</button></Link>
                <Link to="resign"><button>업체 탈퇴</button></Link>
                <Outlet context={comId}></Outlet>
            </CompManageSubCon>
        </CompManageCon>
    )
}

CompManageMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompManageMain
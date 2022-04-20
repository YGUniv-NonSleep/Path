import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CompManageCon>
            <CompManageSubCon>
                { loading ? <p>업체 관리 화면 나왔다</p> : <h2>로드 중...</h2> }
                <Outlet></Outlet>
            </CompManageSubCon>
        </CompManageCon>
    )
}

CompManageMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompManageMain
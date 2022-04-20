import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CompStoreCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompStoreSubCon = styled.div`
    margin-left: 130px;
`;

function CompStoreMain() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SPRING_API +"/api/company/myStore")
        .then((res) => {console.log(res)})
        .catch((err)=>{console.log(err)})
    }, [])
    
    return (
        <CompStoreCon>
            <CompStoreSubCon>
                { loading ? <p>마이 업체 화면 나왔다</p> : <h2>로드 중...</h2> }
                <Outlet></Outlet>
            </CompStoreSubCon>
        </CompStoreCon>
    )
}
CompStoreMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default CompStoreMain;
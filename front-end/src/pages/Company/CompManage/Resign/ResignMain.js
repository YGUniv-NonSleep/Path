import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../../hooks/useLoading';
import useCompResign from '../hooks/useCompResign';

const ResignCon = styled.div`
    width: 390px;
    height: 100%;
`;

const ResignSubCon = styled.div`
    margin-left: 130px;
`;

function ResignMain() {
    const { loading } = useLoading();

    return (
        <ResignCon>
            <ResignSubCon>
                { loading ? <p>업체 탈퇴 화면</p> : <h2>로드 중...</h2> }
            </ResignSubCon>
        </ResignCon>
    )
}

ResignMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ResignMain;
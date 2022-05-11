import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../../hooks/useLoading';
import useCompEdit from '../hooks/useCompEdit';

const CompEditCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompEditSubCon = styled.div`
    margin-left: 130px;
`;

function CompEditMain() {
    const { loading } = useLoading();

    return (
        <CompEditCon>
            <CompEditSubCon>
                { loading ? <p>업체정보 수정 화면</p> : <h2>로드 중...</h2> }
            </CompEditSubCon>
        </CompEditCon>
    )
}

CompEditMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompEditMain;
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../hooks/useLoading';

const CompCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompSubCon = styled.div`
    margin-left: 130px;
`;

function CompanyMain() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const { loading } = useLoading();

    return (
        <CompCon>
            <CompSubCon>
            { loading ? <p>업체 소개 화면 입니다.</p> : <h2>로드 중...</h2> }
            <div>너의 업체입니다.</div>
            </CompSubCon>
        </CompCon>
    )
}

CompanyMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompanyMain;
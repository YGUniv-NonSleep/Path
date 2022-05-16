import { useParams, Link } from 'react-router-dom'
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../hooks/useLoading';
import useCompDetail from '../hooks/useCompDetail'

const CompDetailCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompDetailSubCon = styled.div`
    margin-left: 130px;
`;

function CompDetailMain() {
    const { loading } = useLoading();
    const { comId } = useParams();

    return (
        <CompDetailCon>
            <CompDetailSubCon>
                <div>디테일 모달창 예정</div>
                { loading ? <div>id:{comId}인 업체의 정보</div> : <div>몰?루</div> }
                <Link to={`/company/manage/${comId}`}><button>상품 관리로 이동</button></Link>
                <Link to={"/company/store"}><button>닫기</button></Link>
            </CompDetailSubCon>
        </CompDetailCon>
    )
}

export default CompDetailMain
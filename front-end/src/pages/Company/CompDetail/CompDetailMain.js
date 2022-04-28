import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import PropTypes from "prop-types";
import styled from "styled-components";

const CompDetailCon = styled.div`
    width: 390px;
    height: 100%;
`;

const CompDetailSubCon = styled.div`
    margin-left: 130px;
`;

function CompDetailMain() {
    const [loading, setLoading] = useState(false)
    const { comId } = useParams();  // 파라미터
    // console.log(comId);

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <CompDetailCon>
            <CompDetailSubCon>
                <div>디테일 모달창 예정</div>
                <div>id:{comId}인 업체의 정보</div>
                <Link to={`/company/manage/${comId}`}><button>상품 관리로 이동</button></Link>
                <Link to={"/company/store"}><button>닫기</button></Link>
            </CompDetailSubCon>
        </CompDetailCon>
    )
}

export default CompDetailMain
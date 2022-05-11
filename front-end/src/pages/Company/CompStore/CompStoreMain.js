import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../hooks/useLoading';
import useCompStore from "../hooks/useCompStore";

const CompStoreCon = styled.div`
  width: 390px;
  height: 100%;
`;

const CompStoreSubCon = styled.div`
  margin-left: 130px;
`;

function CompStoreMain() {
  const { loading } = useLoading();
  const { myStore } = useCompStore();
  
  return (
    <CompStoreCon>
      <CompStoreSubCon>
        {loading ? <p>마이 업체 화면 나왔다</p> : <h2>로드 중...</h2>}
        {myStore != null || myStore != undefined ? (
          myStore.map((item, index) => {
            // console.log(item);
            if(item.length == 0) {
                return <div>업체를 만들어 보세요!</div>
            } else {
                return (
                    <Fragment key={index}>
                      <div>업체 카테고리: {item.category}</div>
                      <div>업체 이메일: {item.mail}</div>
                      <div>업체명: {item.name}</div>
                      <div>업체 전화번호: {item.phone}</div>
                      <img
                        src={`${process.env.REACT_APP_SPRING_API}/api/image/${item.thumbnail}`}
                        width={"100px"}
                        height={"100px"}
                      /><br/>
                      <Link to={`${item.id}`}>
                        <button>업체 세부정보</button>
                      </Link>
                    </Fragment>
                  );
            }
          })
        ) : (
          <h2>정보를 불러오는데 실패하였습니다..</h2>
        )}
        <br />
        <Link to="/company/create">
          <button>업체 생성하기</button>
        </Link>
        <Outlet></Outlet>
      </CompStoreSubCon>
    </CompStoreCon>
  );
}
CompStoreMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default CompStoreMain;

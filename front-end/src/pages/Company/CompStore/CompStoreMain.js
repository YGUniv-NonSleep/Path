import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
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
  const [myStore, setMyStore] = useState([]);

  function getMyStore() {
    console.log(myStore);
    axios
      .get(process.env.REACT_APP_SPRING_API + "/api/company/myStore")
      .then((res) => {
        // console.log(res.data.body);
        setMyStore(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    getMyStore();
    return () => {
      setMyStore([]); // unmount
    };
  }, []);

console.log(myStore)

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

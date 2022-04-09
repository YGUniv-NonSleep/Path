import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Fragment } from "react";

const CompStoreCon = styled.div`
  width: 390px;
  height: 100%;
`;

const CompStoreSubCon = styled.div`
  margin-left: 130px;
`;

function CompStore(props) {
  const stores = props.myStore[0];
  //console.log(stores)

  return (
    <CompStoreCon>
      <CompStoreSubCon>
        { props.loading ? <p>마이 업체 화면 나왔다</p> : <h2>로드 중...</h2> }
        { stores != null || stores != undefined ? (
            stores.map((item) => {
                //console.log(item)
                return (
                    <Fragment>
                        <div>{item.id}</div>
                        <Link to={`${item.id}`}>
                            <button>업체 세부</button>
                        </Link>
                    </Fragment>
                )
            })
          ) : (
            <h2>정보를 불러오는데 실패하였습니다..</h2>
            )
        }
        <Link to="/company/create">
          <button>업체 가입하기</button>
        </Link>
        <Outlet></Outlet>
      </CompStoreSubCon>
    </CompStoreCon>
  );
}

CompStore.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CompStore;

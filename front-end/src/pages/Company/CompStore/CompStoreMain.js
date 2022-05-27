import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../hooks/useLoading';
import useCompStore from "../hooks/useCompStore";
import blankImage from "../../../assets/images/gift.png";
import Modal from "../../../components/Modal";

const CompStoreCon = styled.div`
  width: 390px;
  height: 100%;
`;

const CompStoreSubCon = styled.div`
  margin-left: 130px;
`;

function CompStoreMain() {
  const { loading } = useLoading();
  const { 
    myStore, storeDetail, open, 
    handleOpen, handleClose
  } = useCompStore();
  console.log(storeDetail)
  return (
    <CompStoreCon>
      <CompStoreSubCon>
        {loading ? <p>마이 업체 화면 나왔다</p> : <h2>로드 중...</h2>}
        {myStore != null || myStore != undefined ? (
          myStore.map((item) => {
            if(item.length == 0) {
                return <div>업체를 만들어 보세요!</div>
            } else {
                return (
                    <Fragment key={item.id}>
                      { open ? (
                        <Modal
                          className={"comp-store-modal"}
                          visible={open}
                          closable={true}
                          maskClosable={true}
                          onClose={handleClose}
                        >
                          <div>{ `대표자명: ${storeDetail.member.name}` }</div>
                          <div>{ `상호명: ${storeDetail.name} ${storeDetail.category}` }</div>
                          <div>{ `영업시간: 예정` }</div>
                          <div>{ `전화번호: ${item.phone}` }</div>
                          <div>{ `사업자주소: 예정` }</div>
                          <Link to={`/company/manage/${storeDetail.id}`}><button>상품 관리로 이동</button></Link>
                          {/* <Link to={`/company/oder/${storeDetail.id}`}><button>주문 관리로 이동</button></Link> */}
                        </Modal>
                      ) : null }
                      <div>{ `상호명: ${item.name} ${item.category}` }</div>
                      <div>{ `전화번호: ${item.phone}` }</div>
                      <div>{ `사업자주소: 예정` }</div>
                      <img
                        src={
                          item.thumbnail != "blankImage" ? (
                            `${process.env.REACT_APP_SPRING_API}/api/image/${item.thumbnail}`
                          ) : (
                            blankImage
                        )}
                        width={"100px"}
                        height={"100px"}
                      /><br/>
                      <button onClick={handleOpen} value={item.id}>업체 세부정보</button>
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

import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../../hooks/useLoading';
import useCompItems from "../hooks/useCompItems";

const ItemCon = styled.div`
  width: 390px;
  height: 100%;
`;

const ItemSubCon = styled.div`
  margin-left: 130px;
`;

function ItemsMain() {
  const { loading } = useLoading();
  const { 
    myItems, 
    productForm, registProduct
  } = useCompItems()

  return (
    <ItemCon>
      <ItemSubCon>
        <Outlet context={23}></Outlet>
        {loading ? <p>상품 목록 화면</p> : <h2>로드 중...</h2>}
        {/* 상품 아이디에 맞게 띄우도록.. 도메인에는 안보이게 onClick 함수로 등록 */}
        <button onClick={productForm}>
          가게 상품 등록
        </button>
        {myItems == null ? (
          console.log("데이터 잘못넘어옴")
        ) : (
          myItems.length == 0 ? (
            // console.log("조회된 데이터가 없음")
            <div>조회된 상품이 없습니다 상품을 추가해주세요</div>
          ) : (
            myItems.map((it, index) => {
              // console.log(it);
              return (
                <Fragment key={index}>
                  <div>상품이름: {it.prodBasic.name}</div>
                  {/* <div>상품 판매 여부: {it.exposure}</div> */}
                  <div>상품가격: {it.price}</div>
                  <div>상품재고: {it.stock}</div>
                  <Link to="itemEdit"><button>상품 상세 정보</button></Link>
                  <br/>
                  {/* <div>상품옵션이름: {it.optionList[0].name}</div> */}
                  {/* <div>상품상세옵션이름: {it.optionList[0].detailOptionList[0].name}</div>
                      <div>상품상세옵션가격: {it.optionList[0].detailOptionList[0].price}</div> */}
                </Fragment>
              );
            })
          )
        )}
      </ItemSubCon>
    </ItemCon>
  );
}

ItemsMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemsMain;

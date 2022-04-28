import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ItemEditCon = styled.div`
  width: 390px;
  height: 100%;
`;

const ItemEditSubCon = styled.div`
  margin-left: 130px;
`;

function ItemEditMain() {
  const [loading, setLoading] = useState(false);
  const itemInfo = useOutletContext()
  // const companyId = useOutletContext();

  // 가게 상품 정보 수정
  // 이전 정보 들고와서 화면에 보여주어야 함
  function patchProduct(prod, e) {
    e.preventDefault();

    console.log(prod)
    console.log(e.target)

    axios
      .patch(process.env.REACT_APP_SPRING_API + "/api/product/", prod)
      .then((res) => {
        console.log(res);
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 가게 상품 삭제
  function deleteProduct(productId) {
    axios
      .delete(process.env.REACT_APP_SPRING_API + "/api/product/" + productId)
      .then((res) => {
        console.log(res);
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function changeValue(e, name){
  //   function changeValue(e){

  //     console.log(e.target)
  //     // setCurrentProduct({
  //     //   [e.target.name] : e.target.value
  //     // })

  //     console.log(currentProduct)

  //     const copiedProduct = currentProduct;

  //      copiedProduct.price = e.target.value

  //     console.log(copiedProduct);

  //     setCurrentProduct(copiedProduct);

  // }

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <ItemEditCon>
      <ItemEditSubCon>
        {itemInfo}
        <button>상품 수정하기</button>
        <button>상품 삭제하기</button>
        <button>뒤로 가기</button>
      </ItemEditSubCon>
    </ItemEditCon>
  );
}

ItemEditMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemEditMain;

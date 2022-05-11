import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../../hooks/useLoading';
import useCompItemEdit from "../hooks/useCompItemEdit";

const ItemEditCon = styled.div`
  width: 390px;
  height: 100%;
`;

const ItemEditSubCon = styled.div`
  margin-left: 130px;
`;

function ItemEditMain() {
  const { loading } = useLoading();
  const {
    itemInfo, 
    patchProduct, deleteProduct 
  } = useCompItemEdit();

  return (
    <ItemEditCon>
      <ItemEditSubCon>
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

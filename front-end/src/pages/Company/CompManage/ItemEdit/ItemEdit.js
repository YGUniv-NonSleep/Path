import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ItemEditCon = styled.div`
    width: 390px;
    height: 100%;
`;

const ItemEditSubCon = styled.div`
    margin-left: 130px;
`;

function ItemEdit(props) {
    return (
        <ItemEditCon>
            <ItemEditSubCon>
                { props.loading ? <p>상품 관리 화면</p> : <h2>로드 중...</h2> }
                <form onSubmit={props.registProductBasic}>
                    <input type={"text"} placeholder={'상품명'} name={"name"} />
                    <input type={"text"} placeholder={'상품 상세 설명'} name={"detail"} />
                    <input type={"text"} placeholder={'브랜드'} name={"brand"} />
                    <input type={"text"} placeholder={'상품 카테고리'} name={"category"} />
                    <input type={"file"} name={"imgFile"} />
                    <button type={"submit"}>상품 등록</button>
                </form>
                <Outlet></Outlet>
            </ItemEditSubCon>
        </ItemEditCon>
    )
}

ItemEdit.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ItemEdit;
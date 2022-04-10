import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Fragment } from "react";

const ItemCon = styled.div`
    width: 390px;
    height: 100%;
`;

const ItemSubCon = styled.div`
    margin-left: 130px;
`;

function Item(props) {
    console.log(props)
    return (
        <ItemCon>
            <ItemSubCon>
                { props.loading ? <p>상품 목록 화면</p> : <h2>로드 중...</h2> }
                { props.items.map((it, index) => {
                    // console.log(it)
                    return (
                        <Fragment key={index}>
                            <ul>
                                <li>{it.name}</li>
                                <li>{it.detail}</li>
                                <li>{it.category}</li>
                                <li>{it.brand}</li>
                                {/* <li><img src={`${process.env.BACKEND_IMG}\\product\\${it.img}`} alt="상품 이미지" /></li> */}
                                <button onClick={() => {props.patchProductBasic(it)}} >수정하기</button>
                                <button onClick={() => {props.deleteProductBasic(it.id)}} >삭제하기</button>
                            </ul>
                        </Fragment>
                    )
                  }) 
                }
                { props.myItems.map((it, index) => {
                    console.log(it)
                    return (
                        <Fragment key={index}>
                            <div>상품이름: {it.prodBasic.name}</div>
                            <div>상품 판매 여부: {it.exposure}</div>
                            <div>상품가격: {it.price}</div>
                            <div>상품재고: {it.stock}</div>
                            <div>상품옵션이름: {it.optionList[0].name}</div>
                            <div>상품상세옵션이름: {it.optionList[0].detailOptionList[0].name}</div>
                            <div>상품상세옵션가격: {it.optionList[0].detailOptionList[0].price}</div>
                        </Fragment>
                    )
                  })
                }
                <button onClick={() => {props.registProduct()}}>가게 상품 등록</button>
                <Outlet></Outlet>
            </ItemSubCon>
        </ItemCon>
    )
}

Item.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Item;
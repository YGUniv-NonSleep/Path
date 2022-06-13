import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import useLoading from '../../../hooks/useLoading';
import useItemBasic from '../hooks/useItemBasic';
import blankImage from "../../../assets/images/gift.png";

const ItemBasicCon = styled.div`
  width: 390px;
  height: 100%;
`;

const ItemBasicSubCon = styled.div`
  margin-left: 130px;
`;

function ItemBasicMain() {
  const { loading } = useLoading();
  const {
    basicItems, updateItem, open, 
    handleChange, registProductBasic, patchProductBasic, deleteProductBasic,
    handleOpen, handleClose, 
  } = useItemBasic();

  return (
    <ItemBasicCon>
      <ItemBasicSubCon>
        {loading ? <p>기본 상품 관리 화면</p> : <h2>로드 중...</h2>}
        {basicItems.length != 0 ? (
          <Fragment>
            {/* 기본 상품 crud */}
            <form onSubmit={registProductBasic}>
              <label htmlFor="name">상품명</label>
              <input type="text" id="name" />
              <br />
              <label htmlFor="detail">디테일</label>
              <input type="text" id="detail" />
              <br />
              <label htmlFor="brand">브랜드</label>
              <input type="text" id="brand" />
              <br />
              <label htmlFor="category">카테고리</label>
              <input type="text" id="category" />
              <br />
              <label htmlFor="imgFile">이미지</label>
              <input type="file" id="imgFile" />
              <br />
              <button type="submit">기본 상품 등록하기</button>
            </form>
            <br />

            {basicItems.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div>{index + 1}번 상품</div>
                  <div>{item.name}</div>
                  <div>{item.detail}</div>
                  <div>{item.brand}</div>
                  <div>{item.category}</div>
                  <img
                    src={
                      item.image != "blankImage" ? (
                        `${process.env.REACT_APP_SPRING_API}/api/image/${item.image}`
                      ) : (
                        blankImage
                    )}
                    width={"64px"}
                    height={"64px"}
                  />
                  <br />
                  <button
                    type="button"
                    onClick={() => deleteProductBasic(item.id)}
                  >
                    기본 상품 제거
                  </button>
                  <button onClick={handleOpen} value={index}>
                    기본 상품 수정 창 오픈
                  </button>
                  {open && (
                    <Modal
                      className={"basic-product-modal"}
                      visible={open}
                      closable={true}
                      maskClosable={true}
                      onClose={handleClose}
                    >
                      <div>기본 상품 업데이트</div>

                      <label htmlFor="updateName">상품명</label>
                      <input
                        type={"text"}
                        id={"updateName"}
                        onChange={handleChange}
                        value={updateItem.name}
                      />
                      <br />
                      <label htmlFor="updateDetail">디테일</label>
                      <input
                        type={"text"}
                        id={"updateDetail"}
                        onChange={handleChange}
                        value={updateItem.detail}
                      />
                      <br />
                      <label htmlFor="updateBrand">브랜드</label>
                      <input
                        type={"text"}
                        id={"updateBrand"}
                        onChange={handleChange}
                        value={updateItem.brand}
                      />
                      <br />
                      <label htmlFor="updateCategory">카테고리</label>
                      <input
                        type={"text"}
                        id={"updateCategory"}
                        onChange={handleChange}
                        value={updateItem.category}
                      />
                      <br />
                      {/* <label htmlFor="updateFile">파일선택</label>
                      <input type="text" readonly="readonly" placeholder="선택된 파일 없음" />
                      <input 
                        type={"file"} 
                        id={"updateFile"}
                        // onChange={}
                      />
                      <br /> */}
                      <button type="button" onClick={patchProductBasic}>
                        기본 상품 수정
                      </button>
                    </Modal>
                  )}
                  <br />
                  <br />
                </Fragment>
              );
            })}
          </Fragment>
        ) : (
          <>
            <div>새로운 기본 상품을 등록하여 주세요</div>
            <br />
            <form onSubmit={registProductBasic}>
                <label htmlFor="name">상품명</label>
                <input type="text" id="name" />
                <br />
                <label htmlFor="detail">디테일</label>
                <input type="text" id="detail" />
                <br />
                <label htmlFor="brand">브랜드</label>
                <input type="text" id="brand" />
                <br />
                <label htmlFor="category">카테고리</label>
                <input type="text" id="category" />
                <br />
                <label htmlFor="imgFile">이미지</label>
                <input type="file" id="imgFile" />
                <br />
                <button type="submit">기본 상품 등록하기</button>
              </form>
              <br />
            </>
        )}
      </ItemBasicSubCon>
    </ItemBasicCon>
  );
}

ItemBasicMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};

export default ItemBasicMain;
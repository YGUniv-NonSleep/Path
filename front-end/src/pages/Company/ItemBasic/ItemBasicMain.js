import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { 
  Box, Button,Typography, Modal 
} from '@mui/material';

const ItemBasicCon = styled.div`
  width: 390px;
  height: 100%;
`;

const ItemBasicSubCon = styled.div`
  margin-left: 130px;
`;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 14,
};

function ItemBasicMain() {
  const [loading, setLoading] = useState(false);
  const [basicItems, setBasicItems] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 기본 상품 생성
  function registProductBasic(e) {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      detail: e.target.detail.value,
      brand: e.target.brand.value,
      category: e.target.category.value,
    };

    const formData = new FormData();
    formData.append("picture", e.target.imgFile.files[0]);
    formData.append(
      "json",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios.post(process.env.REACT_APP_SPRING_API + "/api/product/basic", formData, {
        //withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res.data.header.statusCode);
        if(res.data.header.statusCode == 200){
          alert("성공적으로 등록되었습니다.")
          getProductBasic()
        } else return console.log("뭔가 안됨")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 기본 상품 읽기
  function getProductBasic() {
    axios.get(process.env.REACT_APP_SPRING_API + "/api/product/basic")
      .then((res) => {
        // console.log(res)
        setBasicItems(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 기본 상품 수정
  function patchProductBasic(it) {
    // console.log(it)
    // const data = {
    //     id: it.id,
    //     name: "감자칩1",
    //     detail: "맛좋은 감자칩",
    //     brand: "농싱",
    //     category: "과자"
    //   };

    const formData = new FormData();
    //   formData.append("picture", it.image);
    formData.append(
      "json",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios.patch(process.env.REACT_APP_SPRING_API + "/api/product/basic", formData, {
        //withCredentials: true,
        headers: {
        "Content-Type": `multipart/form-data`,
        },
      }).then((res) => {
            console.log(res);

            return basicItems.filter((it) => {
                console.log(it);
                // getProductBasic()
            });
      }).catch((err) => {
            console.log(err);
      });
  }

  // 기본 상품 삭제
  function deleteProductBasic(id) {
    axios.delete(process.env.REACT_APP_SPRING_API + `/api/product/basic/${id}`)
      .then((res) => {
        // console.log(res);
        if(res.data.header.statusCode == 200){
          alert("성공적으로 제거되었습니다.")
          getProductBasic()
        } else return console.log("뭔가 안됨")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    getProductBasic();
  }, []);
  
  return (
    <ItemBasicCon>
      <ItemBasicSubCon>
        { loading ? <p>기본 상품 관리 화면</p> : <h2>로드 중...</h2> }
        { basicItems.length != 0 ? (
          <Fragment>
            {/* 기본 상품 crud */}
            <form onSubmit={registProductBasic}>
              <label htmlFor="name">상품명</label>
              <input type="text" id="name" /><br/>
              <label htmlFor="detail">디테일</label>
              <input type="text" id="detail" /><br/>
              <label htmlFor="brand">브랜드</label>
              <input type="text" id="brand" /><br/>
              <label htmlFor="category">카테고리</label>
              <input type="text" id="category" /><br/>
              <label htmlFor="imgFile">이미지</label>
              <input type="file" id="imgFile" /><br/>
              <button type="submit">기본 상품 등록하기</button>
            </form>
            <br/>
            {basicItems.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div>{index+1}번 상품</div>
                  <div>{item.name}</div>
                  <div>{item.detail}</div>
                  <div>{item.brand}</div>
                  <div>{item.category}</div>
                  <div>{item.image}</div>
                  <button type="button" onClick={() => deleteProductBasic(item.id)}>기본 상품 제거</button>
                  <button onClick={handleOpen}>기본 상품 수정 창 오픈</button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                  >
                    <Box sx={modalStyle}>
                      sadasd
                    </Box>
                  </Modal>
                  <br/><br/>
                </Fragment>
              )
            })}
            
            <div>기본 상품 업데이트</div>


          </Fragment>
        ) : <div>새로운 기본 상품을 등록하여 주세요</div> }
      </ItemBasicSubCon>
    </ItemBasicCon>
  );
}

ItemBasicMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemBasicMain;

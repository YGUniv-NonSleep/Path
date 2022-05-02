import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../../../../components/Modal";

const ItemBasicCon = styled.div`
  width: 390px;
  height: 100%;
`;

const ItemBasicSubCon = styled.div`
  margin-left: 130px;
`;

function ItemBasicMain() {
  const [loading, setLoading] = useState(false);
  const [basicItems, setBasicItems] = useState([]);
  const [updateItem, setUpdateItem] = useState(null); // 수정할 데이터

  // 모달 창 제어
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setUpdateItem(basicItems[e.target.value]);
  };
  const handleClose = () => {
    if (open === true) return setOpen(false);
  };

  // 기본 상품 수정
  const handleChange = (e) => {
    if (e.target.id == "updateName")
      setUpdateItem((prev) => ({ ...prev, name: e.target.value }));
    else if (e.target.id == "updateDetail")
      setUpdateItem((prev) => ({ ...prev, detail: e.target.value }));
    else if (e.target.id == "updateBrand")
      setUpdateItem((prev) => ({ ...prev, brand: e.target.value }));
    else if (e.target.id == "updateCategory")
      setUpdateItem((prev) => ({ ...prev, category: e.target.value }));
    // 사진은 나중에 추가
  };

  // 기본 상품 생성
  async function registProductBasic(e) {
    e.preventDefault();

    let inputImageFiles = e.target.imgFile.files;

    const imageformData = new FormData();
    // FormData에 Key:Value 넣기
    for (var i = 0; i < inputImageFiles.length; i++) {
      imageformData.append("multipartFile", inputImageFiles[i]);
    }

    const images = await axios
      .post(process.env.REACT_APP_SPRING_API + `/api/image`, imageformData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    const data = {
      name: e.target.name.value,
      detail: e.target.detail.value,
      brand: e.target.brand.value,
      category: e.target.category.value,
      image: images.data
    };

    const result = await axios.post(
      process.env.REACT_APP_SPRING_API + "/api/product/basic", data
    ).catch((err) => { console.log(err) });

    if(result.data != ""){
      alert("성공적으로 등록되었습니다.");
      /* 상품 추가 폼 비우기 코드 추가 */
      getProductBasic();
    } else return console.log("뭔가 안됨");
  }

  // 기본 상품 전체 읽기
  function getProductBasic() {
    axios
      .get(process.env.REACT_APP_SPRING_API + "/api/product/basic")
      .then((res) => {
        // console.log(res)
        setBasicItems(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 기본 상품 수정
  function patchProductBasic() {
    // console.log(updateItem)

    const data = {
      id: updateItem.id,
      name: updateItem.name,
      detail: updateItem.detail,
      brand: updateItem.brand,
      category: updateItem.category,
    };

    const formData = new FormData();
    //   formData.append("picture", updateItem.image);
    formData.append(
      "json",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .patch(
        process.env.REACT_APP_SPRING_API + "/api/product/basic",
        formData,
        {
          //withCredentials: true,
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        // console.log(res);

        return basicItems.filter((it) => {
          console.log(it);
          alert("성공적으로 수정되었습니다.");
          // 수정된 상품만 재랜더링하도록 수정
          getProductBasic();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 기본 상품 삭제
  function deleteProductBasic(id) {
    axios
      .delete(process.env.REACT_APP_SPRING_API + `/api/product/basic/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.header.statusCode == 200) {
          alert("성공적으로 제거되었습니다.");
          getProductBasic();
        } else return console.log("뭔가 안됨");
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
                    src={`${process.env.REACT_APP_SPRING_API}/api/image/${item.image}`}
                    width={"100px"}
                    height={"100px"}
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
                      <label htmlFor="updateFile">파일선택</label>
                      <input type="text" readonly="readonly" placeholder="선택된 파일 없음" />
                      <input 
                        type={"file"} 
                        id={"updateFile"}
                        // onChange={}
                      />
                      <br />
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
          <div>새로운 기본 상품을 등록하여 주세요</div>
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

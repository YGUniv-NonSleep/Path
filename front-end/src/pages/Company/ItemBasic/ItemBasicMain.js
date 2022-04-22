import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

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
        console.log(res);
        // console.log(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 기본 상품 읽기
  function getProductBasic() {
    axios.get(process.env.REACT_APP_SPRING_API + "/api/product/basic")
      .then((res) => {
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
        console.log(res);
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
      </ItemBasicSubCon>
    </ItemBasicCon>
  );
}

ItemBasicMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemBasicMain;

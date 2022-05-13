import axios from "axios";
import { useEffect, useState } from "react";

function useItemBasic() {
  const [basicItems, setBasicItems] = useState([]);
  const [updateItem, setUpdateItem] = useState(null); // 수정할 데이터

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
      image: images.data,
    };

    const result = await axios
      .post(process.env.REACT_APP_SPRING_API + "/api/product/basic", data)
      .catch((err) => {
        console.log(err);
      });

    if (result.data != "") {
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
    getProductBasic();
  }, []);

  return {
    basicItems, updateItem, 
    getProductBasic, 
    handleChange, registProductBasic, patchProductBasic, deleteProductBasic 
  };
}

export default useItemBasic;
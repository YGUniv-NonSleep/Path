import axios from "axios";
import { useEffect, useState } from "react";

function useItemBasic() {
  const [basicItems, setBasicItems] = useState([]);
  const [updateItem, setUpdateItem] = useState(null); // 수정할 데이터

  //== 모달 창 제어 ==//
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
      getProductBasicList();
    } else return console.log("뭔가 안됨");
  }

  // 기본 상품 전체 읽기
  function getProductBasicList() {
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

  function getProductBasic(prodId){
    axios
      .get(process.env.REACT_APP_SPRING_API + `/api/product/basic/${prodId}`)
      .then((res) => {
        basicItems.filter((list)=>{
          if(list.id == res.data.body.id){
            let tempList = basicItems;
            // 객체 배열의 인덱스 검색 함수 findIndex()
            let idx = basicItems.findIndex(i => i.id == res.data.body.id)
            console.log(idx)
            console.log(tempList)
            tempList.splice(idx, 1)
            console.log(tempList)
            tempList.splice(idx, 0, res.data.body)
            console.log(tempList)
            setBasicItems(tempList)
          }
        }) 
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
      "json", new Blob([JSON.stringify(data)], { type: "application/json; charset=utf-8" })
    );

    axios
      .patch(
        process.env.REACT_APP_SPRING_API + "/api/product/basic",
        data,
        {
          withCredentials: true,
          headers: {
            // "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        return basicItems.filter((it) => {
          // console.log(it);
          if(it.id == res.data.body.id){
            alert("성공적으로 수정되었습니다.");
            // 수정된 상품만 재랜더링
            getProductBasic(it.id)
            handleClose();
          }
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
          getProductBasicList();
        } else return console.log("뭔가 안됨");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductBasicList();
  }, []);

  return {
    basicItems, updateItem, open, 
    getProductBasicList, handleOpen, handleClose, 
    handleChange, registProductBasic, patchProductBasic, deleteProductBasic 
  };
}

export default useItemBasic;

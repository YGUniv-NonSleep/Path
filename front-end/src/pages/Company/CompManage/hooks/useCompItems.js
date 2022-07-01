import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useCompItems() {
  const [myItems, setMyItems] = useState([]);
  const [prodForm, setProdForm] = useState(null);
  const [detailForm, setDetailForm] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [detailOptionVisible, setDetailOptionVisible] = useState([])
  const companyId = useOutletContext();

  function changeDetailForm(form){
    setDetailForm(form);
  }

  function changeDetailOptionVisible(index){
    // console.log(index)
    const arr = [...detailOptionVisible]
    arr[index] = !arr[index]
    setDetailOptionVisible(arr);
  }

  function setDetailOptionLength(length){
    var arr = new array(length)
    for (let index = 0; index < length; index++) {
      arr[index] = false;      
    }
    setDetailOptionVisible(arr);
  }

  // function getDetailForm(){
  //   return productDetail
  // }

  function openDetailForm(productId){
    console.log(productId);
    setDetailForm("detail")

    axios.get(process.env.REACT_APP_SPRING_API + "/api/product/"+productId)
    .then((res)=>{
      console.log(res.data.body)
      setProductDetail(res.data.body)
      setDetailOptionLength(null)
      setDetailOptionLength(res.data.optionList.length)

      console.log(productDetail)
    }).catch((err)=>{

    })

  }

  // 상품 입력 폼
  function productForm(e){
    e.preventDefault();

    const data = {
      price: 1500,
      exposure: false,
      discount: 0,
      stock: 10,
      picture: "blankProdImage",
      prodBasic: { // basic상품 정보를 가져와야함.
        id: 1,
      },
      optionList: [ // 옵션 리스트 만들어서 줘야함
        {
          name: "온도",
          detailOptionList: [
            {
              name: "뜨거움",
              price: 0,
            },
          ],
        },
      ],
      created: new Date(),
      company: {
        id: companyId,
      },
    };
    console.log(data)

    setProdForm(data)
  }

  // 가게 상품 생성
  function registProduct() {
    if(prodForm != null){
      axios
      .post(process.env.REACT_APP_SPRING_API + "/api/product/", prodForm)
      .then((res) => {
        console.log(res);
        // 생성하고 다시 읽어오기
        getProduct()
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    registProduct()
  }, [prodForm])

  // 가게 상품 읽기
  function getProduct() {
    axios
      .get(process.env.REACT_APP_SPRING_API + `/api/product/comp/${companyId}`)
      .then((res) => {
        console.log(res);
        // 현재 url 수정으로 자기업체가 아닌 업체의 상품을 볼 수 있음.
        // url 랜더링시 유저의 업체 번호를 조회해서 해당 사용자의 업체번호가 아닌 경우 리다이렉트
        setMyItems(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  // 가게 상품 상세 읽기
  // 한 상품의 상세 정보를 얻어서 모달창에 넘겨주기

  useEffect(() => {
    getProduct();
    return () => {
      // setMyItems([]);
    };
  }, []);

  return {
    myItems,detailForm,productDetail,detailOptionVisible,
    productForm, 
    registProduct,
    getProduct,
    changeDetailForm,
    openDetailForm,
    changeDetailOptionVisible
  };
}

export default useCompItems;

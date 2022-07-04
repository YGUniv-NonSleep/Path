import axios from "axios";
import { add } from "date-fns";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useCompItems() {
  const [myItems, setMyItems] = useState([]);
  const [prodForm, setProdForm] = useState(null);
  const [detailForm, setDetailForm] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [detailOptionVisible, setDetailOptionVisible] = useState([])
  const companyId = useOutletContext();
  const [optionList, setOptionList] = useState([]);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const [clickedDetailOption, setClickedDetailOption] = useState(null);
  const [detailOptionModalOpen, setDetailOptionModalOpen] = useState(false);
  const [thirdForm, setThirdForm] = useState(null);
  const [clickedProductBasic, setClickedProductBasic] = useState({name:"상품명", category:"카테고리", detail:"설명", image:"이미지", id:null, brand:"브랜드"});
  const [productBasic, setProductBasic] = useState([]);
  const [editFormModal, setEditFormModal] = useState(false);
  const [clickedChange, setClickedChange] = useState(null);

  
  function editFormClicked( v ){
    setClickedChange(v);
    editFormModalHandle();
  }

  function editFormModalHandle(){
    setEditFormModal(!editFormModal)
  }

  function changeProductValue(){
    const data = document.getElementsByName("change-product")[0].value;

    let product = {
      ...productDetail,
      [clickedChange] : parseInt(data)
    }

    console.log(product);

    setProductDetail(product)

    editFormModalHandle();
    
    
  }
    
  //
  function clickProductBasic(basicId){
    axios.get(process.env.REACT_APP_SPRING_API + "/api/product/basic/"+basicId)
    .then((res)=>{
      console.log(res)
      let basic = {...clickedProductBasic}
      basic.name = res.data.body.name;
      basic.id = res.data.body.id;
      basic.brand = res.data.body.brand;
      basic.detail = res.data.body.detail;
      basic.category = res.data.body.category;
      basic.image = res.data.body.image;
      setClickedProductBasic(basic);
      console.log(clickedProductBasic)
    }).catch((err)=>{
      console.log(err)
    })
  }

  function findProductBasic(){
    axios.get(process.env.REACT_APP_SPRING_API + "/api/product/basic")
    .then((res)=>{
      console.log(res)
      setProductBasic(res.data.body)
    }).catch((err)=>{
      console.log(err)
    })
    changeThirdForm("basic")
  }

  function changeThirdForm(v){
    setThirdForm(v);    
  }

  function deleteOption(index){
    const option = [...optionList];
    option.splice(index,1);
    setOptionList(option);    
  }

  function deleteDetailOption(optionIndex, detailOptionIndex){
    const option = [...optionList];    
    option[optionIndex].detailOptionList.splice(detailOptionIndex,1);
    setOptionList(option);    
    
  }

  function changeOption(e){
    // console.log(clickedOption)
    const name = document.getElementsByName("optionInput")[0].value 
    let option = [...optionList]
    // console.log(option);
    option[clickedOption].name = name;
    setOptionList(option);
    setOptionModalOpen(false)
  }

  function detailOptionModalHandle(optionIndex, detailOptionIndex){
    setDetailOptionModalOpen(!detailOptionModalOpen)
    setClickedDetailOption([optionIndex,detailOptionIndex])
    console.log(clickedDetailOption)
  }



  

  function changeDetailOption(e){
    const name = document.getElementsByName("detailOptionName")[0].value; 
    const price = document.getElementsByName("detailOptionPrice")[0].value; 
    let option = [...optionList]
    option[clickedDetailOption[0]].detailOptionList[clickedDetailOption[1]].name = name;
    option[clickedDetailOption[0]].detailOptionList[clickedDetailOption[1]].price = parseInt(price);
    setDetailOptionModalOpen(false)    
  }

  function optionModalHandle(index){ setOptionModalOpen( !optionModalOpen ); console.log(index); setClickedOption(index) }

  function addOption(){
    let option = [...optionList]

    
    option.push({name: "옵션명", detailOptionList:[] })
    console.log(option)
    setOptionList(option);    
    // console.log(optionList);
  }

  function addOptionEditForm(){
    let option = [...productDetail.optionList]  
    setOptionList(option)
    console.log(optionList);   
    addOption();
  }

  function addDetailOption( index ){
    let option = [...optionList]
    console.log(option)
    option[index].detailOptionList.push({name:"세부옵션명", price:0})
    setOptionList(option);
  }

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
      const option = [...res.data.body.optionList]    
      setOptionList(option)
      setDetailOptionLength(null)
      setDetailOptionLength(res.data.optionList.length)

      console.log(productDetail)
    }).catch((err)=>{

    })

  }

  // 상품 입력 폼
  // function productForm(e){
  //   e.preventDefault();

  //   const data = {
  //     price: 1500,
  //     exposure: false,
  //     discount: 0,
  //     stock: 10,
  //     picture: "blankProdImage",
  //     prodBasic: { // basic상품 정보를 가져와야함.
  //       id: 1,
  //     },
  //     optionList: [ // 옵션 리스트 만들어서 줘야함
  //       {
  //         name: "온도",
  //         detailOptionList: [
  //           {
  //             name: "뜨거움",
  //             price: 0,
  //           },
  //         ],
  //       },
  //     ],
  //     created: new Date(),
  //     company: {
  //       id: companyId,
  //     },
  //   };
  //   console.log(data)

  //   setProdForm(data)
  // }

  function registProduct(e){

    const data = {      
      price: parseInt(document.getElementsByName("product-price")[0].value),
      exposure: JSON.parse(document.getElementsByName("product-visible-radio-group")[0].value),
      // discount: parseInt(document.getElementsByName("product-price")[0].value),
      stock: parseInt(document.getElementsByName("product-stock")[0].value),
      prodBasic: { // basic상품 정보를 가져와야함.
        id: clickedProductBasic.id,
      },
      optionList: [ // 옵션 리스트 만들어서 줘야함
        ...optionList
      ],
      company: {
        id: companyId,
      },
    };
    console.log(data)

    axios.post(process.env.REACT_APP_SPRING_API + "/api/product/", data)
      .then((res) => {
        console.log(res);
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      })

    // setProdForm(data)
  }

  // useEffect(() => {
  //   // registProduct()
  // }, [prodForm])

  useEffect(() => {
    changeThirdForm("")
    
  }, [detailForm])

  useEffect(() => {
    changeDetailForm("")
    
  }, [myItems])

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
  function patchProduct() {
    const data = {      
      ...productDetail,
      optionList: [ // 옵션 리스트 만들어서 줘야함
        ...optionList
      ],
      company: {
        id: companyId,
      },
    };
    console.log(data)

    axios.patch(process.env.REACT_APP_SPRING_API + "/api/product/", data)
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

    console.log(productId)
    axios.delete(process.env.REACT_APP_SPRING_API + "/api/product/" + productId)
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
       setMyItems([]);
    };
  }, []);

  return {
    myItems,detailForm,productDetail,detailOptionVisible,optionList,optionModalOpen,
    detailOptionModalOpen,thirdForm,productBasic,clickedProductBasic,
    editFormClicked,clickedChange,
    optionModalHandle,editFormModalHandle,editFormModal,
    patchProduct,
    registProduct,
    getProduct,
    changeDetailForm,
    openDetailForm,
    changeDetailOptionVisible,addOption,addDetailOption,changeOption,
    detailOptionModalHandle,changeDetailOption,
    deleteProduct, deleteOption, deleteDetailOption,changeThirdForm,findProductBasic,clickProductBasic,addOptionEditForm,changeProductValue
  };
}

export default useCompItems;

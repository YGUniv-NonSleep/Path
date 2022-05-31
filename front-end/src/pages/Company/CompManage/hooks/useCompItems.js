import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useCompItems() {
  const [myItems, setMyItems] = useState([]);
  const companyId = useOutletContext();

  async function getUserSelect(){
    // 유저가 선택한 업체의 번호 반환하는 함수
  }

  // 가게 상품 생성
  async function registProduct() {
    const myStore = await getMyStore();
    // const userSelect = await getUserSelect();
    console.log(myStore)
    const data = {
      price: 1500,
      exposure: false,
      discount: 0,
      created: new Date(),
      stock: 10,
      picture: "blankProdImage",
      member: {
        id: myStore[0].member.id
      },
      company: {
        id: myStore[0].id,
        name: myStore[0].name,
        companyNumber: 21321321,
        category: myStore[0].category,
        phone: myStore[0].phone,
      },
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
    };
    console.log(data)

    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/product/", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 가게 상품 읽기
  function getProduct() {
    axios
      .get(process.env.REACT_APP_SPRING_API + `/api/product/comp/${companyId}`)
      .then((res) => {
        console.log(res);
        setMyItems(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 가게 정보 읽기
  async function getMyStore() {
    const myStore = await axios.get(
      process.env.REACT_APP_SPRING_API + "/api/company/myStore"
    ).catch((err) => { console.log(err) });
    return myStore.data.body
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
      setMyItems([]);
    };
  }, []);

  return {
    myItems,
    companyId,
    registProduct,
    getProduct,
  };
}

export default useCompItems;

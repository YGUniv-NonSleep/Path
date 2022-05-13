import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useCompItems(){
    const [myItems, setMyItems] = useState([]);
    const companyId = useOutletContext();

  // 가게 상품 생성
  function registProduct() {
    const data = {
      price: 1500,
      exposure: false,
      discount: 0,
      created: new Date(),
      stock: 10,
      company: {
        id: companyId,
      },
      prodBasic: {
        id: 1,
      },
      optionList: [
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

  // 가게 상품 상세 읽기
  // 한 상품의 상세 정보를 얻어서 모달창에 넘겨주기

  useEffect(() => {
    getProduct();
  }, []);

  return {
    myItems, companyId, 
    registProduct, getProduct 
  }
}

export default useCompItems
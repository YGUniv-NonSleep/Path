import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import {useOutletContext} from "react-router-dom"


function ItemContainer() {
  // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);

  const companyId = useOutletContext();

  useEffect(() => {
    setLoading((current) => !current);
  }, []);

  function getProductBasic() {
      axios.get(process.env.REACT_APP_SPRING_API + '/api/product/basic')
      .then((res)=>{
        setItems(res.data.body)
      })
      .catch((err)=>{console.log(err)})
  }

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
        "json", new Blob([JSON.stringify(data)], { type: "application/json" })
      );

    axios.patch(process.env.REACT_APP_SPRING_API + '/api/product/basic', formData, {
        //withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(items);
        return (
            items.filter((it) => {
                getProductBasic()
            })
        )
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function deleteProductBasic(id) {
      axios.delete(process.env.REACT_APP_SPRING_API + `/api/product/basic/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function registProduct() {
      const data = {
          price: 1500,
          exposure: false,
          discount: 0,
          created: new Date(),
          stock: 10,
          company: {
              id: companyId
          },
          prodBasic: {
              id: 1
          },
          optionList: [
              {
                name: "온도",
                detailOptionList: [
                    {
                        name: "뜨거움",
                        price: 0
                    }
                ]
              }
          ]
      }

      axios.post(process.env.REACT_APP_SPRING_API + '/api/product/', data)
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.log(err)})
  }

  function getProduct() {
    axios.get(process.env.REACT_APP_SPRING_API + `/api/product/comp/${companyId}`)
    .then((res) => {
        console.log(res);
        setMyItems(res.data.body)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getProductBasic()
  }, [])

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <Item 
        loading={loading}
        items={items}
        patchProductBasic={patchProductBasic}
        deleteProductBasic={deleteProductBasic}
        registProduct={registProduct}
        myItems={myItems}
        ></Item>
  )
}

export default ItemContainer;

import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import ItemEdit from "./ItemEdit";
import {useOutletContext} from "react-router-dom"



function ItemEditContainer() {

    const [products, setProduct] = useState([]);  
    const companyId = useOutletContext();
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    const [patchForm, setPatchForm] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    

    function getProduct() {
      axios.get(process.env.REACT_APP_SPRING_API + '/api/product/comp/'+ companyId)
      .then((res)=>{
        console.log(res)
        setProduct(res.data.body)
      })
      .catch((err)=>{console.log(err)})
     }

     function deleteProduct(productId){
        axios.delete(
          process.env.REACT_APP_SPRING_API + '/api/product/'+ productId          
        ).then((res)=>{
          console.log(res)
          getProduct()
        }).catch((err)=>{
          console.log(err)
        })
     }

     function patchProduct(prod,e){

       e.preventDefault();

       console.log("123")
       console.log(e.target)
       console.log(prod)


      axios.patch(
        process.env.REACT_APP_SPRING_API + '/api/product/', prod
      ).then((res)=>{
        console.log(res)
        getProduct()
      }).catch((err)=>{
        console.log(err)
      })

     }

     function visiblePatchForm(product){   
      console.log("visiblePatchForm(product)")   
      setPatchForm(true)
      console.log(product)
      setCurrentProduct(product)

     }

     function nuVisiblePatchForm(){
      setPatchForm(false)
    }

    // function changeValue(e, name){
      function changeValue(e){

        console.log(e.target)
        // setCurrentProduct({
        //   [e.target.name] : e.target.value
        // })

        console.log(currentProduct)

        const copiedProduct = currentProduct;

         copiedProduct.price = e.target.value

        console.log(copiedProduct);

        setCurrentProduct(copiedProduct);
        
    } 
      
      
    

    useEffect(() => {
      
  }, [currentProduct]);

      useEffect(() => {
        console.log("getProduct()")
        getProduct()      
    }, []);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    useEffect(() => {
      console.log(products)
  }, [products]);

  useEffect(() => {
    console.log(currentProduct)
}, [currentProduct]);

    function registProductBasic(e) {
        e.preventDefault();
    
        const data = {
          name: e.target.name.value,
          detail: e.target.detail.value,
          brand: e.target.brand.value,
          category: e.target.category.value
        };
    
        const formData = new FormData();
        formData.append("picture", e.target.imgFile.files[0]);
        formData.append(
          "json", new Blob([JSON.stringify(data)], { type: "application/json" })
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

    return (
        <ItemEdit
            loading={loading}
            products = {products}
            registProductBasic={registProductBasic}
            companyId = {companyId}
            deleteProduct = {deleteProduct}
            patchProduct = {patchProduct}
            patchForm = {patchForm}
            visiblePatchForm = {visiblePatchForm}
            currentProduct = {currentProduct}
            changeValue = {changeValue}      

        >
        </ItemEdit>
    )
}

export default ItemEditContainer;
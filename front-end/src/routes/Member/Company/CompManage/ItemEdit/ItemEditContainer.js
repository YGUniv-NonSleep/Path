import axios from "axios";
import { useEffect, useState } from "react";
import ItemEdit from "./ItemEdit";

function ItemEditContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
    }, []);

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
            registProductBasic={registProductBasic}
        >
        </ItemEdit>
    )
}

export default ItemEditContainer;
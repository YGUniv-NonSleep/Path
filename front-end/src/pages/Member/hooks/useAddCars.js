import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";



function useAddCars(){
    const [inputValue, setInputValue] = useState({
        carKind: '',
        carNum: '',
      });

      const handleInput = (e) => {
        setInputValue({
          ...inputValue,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = (e) => {
        // 이미지 저장 시작
        e.preventDefault();
        let formData = new FormData();
        const multipartFile = e.target.imageFile.files[0];
        formData.append('multipartFile', multipartFile);
    
        axios
          .post(process.env.REACT_APP_SPRING_API + '/api/image', formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res);
            const imageName = res.data;
            console.log(imageName);
            return imageName;
          })
          .then(async (imageName) => {
            // 차량 저장 시작
            const result = await addCars(imageName);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      const addCars = async (imageName) => {
        // 이미지경로값 가져왔으니 이것으로 차량 등록 시작
        const data = {
            carKind : inputValue.carKind,
            carNum : inputValue.carNum,
            photoName : imageName
        }
        await axios
          .post(process.env.REACT_APP_SPRING_API + '/api/cars', data, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            alert(res.data.message)
            window.location = '/member/cars';
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
 

      return{
        handleInput,addCars,handleSubmit,inputValue
      }
}
export default useAddCars;
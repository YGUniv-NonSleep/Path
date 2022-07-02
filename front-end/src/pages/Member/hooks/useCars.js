import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function useCars() {
  const navigate = useNavigate();
  const [carsview, setCarsView] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setUpdateModalOpen] = useState(false);
  const [dataModal, setModalData] = useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const updateModalOpen = () => setUpdateModalOpen(true);
  const updateModalClose = () => setUpdateModalOpen(false);
  const [inputValue, setInputValue] = useState({
    carKind: '',
    carNum: '',
  });
  let state = useSelector((state) => state);
 


  useEffect(()=>{
    var memberId = state.user.id;
    axios.get(process.env.REACT_APP_SPRING_API + `/api/cars/view?memberId=${memberId}`)
    .then((res)=>{
      console.log(res);
      setCarsView(res.data.body);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const goBackPage = () => {
    navigate(-1);
  };

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
    const data = {
      carKind : e.target.carKind.value,
      carNum : e.target.carNum.value
    }
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
        const result = await addCars(imageName,data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ModalData = (cars) =>{
    setModalData(cars);
    setUpdateModalOpen(true);
  }
  useEffect(()=>{
    
  },[dataModal])

  const addCars = async (imageName,data) => {
    // 이미지경로값 가져왔으니 이것으로 차량 등록 시작
    const addData = {
      carNum : data.carNum,
      carKind : data.carKind,
      photoName : imageName
    }
    console.log(data);
    await axios
      .post(process.env.REACT_APP_SPRING_API + '/api/cars', addData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const carsDelete = (e) =>{
    e.preventDefault();
    console.log(e.target.value);
    const carsId = e.target.value;
    axios.delete(process.env.REACT_APP_SPRING_API + `/api/cars/${carsId}`)
    .then((res)=>{
      console.log(res);
      alert(res.data.message);
      navigate(-1);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const carsUpdate = (e) =>{
    e.preventDefault();
    const data = {
      id : e.target.id.value,
      carNum : e.target.carsNum.value,
      carKind : e.target.carsKind.value
    }
    console.log(data);

    let formData = new FormData();
    const multipartFile = e.target.userfile.files[0];
    formData.append('multipartFile',multipartFile);

    axios.post(process.env.REACT_APP_SPRING_API + '/api/image',formData,{
      withCredentials : true,
      headers : {
        'Content-Type' : 'multipart/form-data',
      },
    })
    .then((res)=>{
      console.log(res);
      const imageName = res.data;
      console.log(imageName);
      return imageName;
    })
    .then(async (imageName) => {
      const result = await UpdateCars(imageName,data);
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  const UpdateCars = async(imageName,data) => {
    const UpdateData = {
      id : data.id,
      carNum : data.carNum,
      carKind : data.carKind,
      photoName : imageName
    }
    await axios.patch(process.env.REACT_APP_SPRING_API + '/api/cars/update',UpdateData,{
      withCredentials : true,
    })
    .then((res)=>{
      console.log(res.data);
      alert(res.data.message);
      window.location = '/member/cars'
    })
    .catch((err)=>{
      console.log(err);
      alert(err.data.message);
    })
  }

 
  return {
    goBackPage,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    inputValue,
    updateModal,
    handleInput,
    handleSubmit,
    setCarsView,
    carsview,
    carsDelete,
    carsUpdate,
    updateModalOpen,
    updateModalClose,
    setModalData,
    ModalData,
    dataModal
  };
}

export default useCars;

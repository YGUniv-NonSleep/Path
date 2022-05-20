import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function useCarPoolAdd() {
  
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [startLocal, setStartLocal] = useState(null);

  const [isArrivedOpen, setIsArrivedOpen] = useState(false);
  const [arriveX, setArriveX] = useState(null);
  const [arriveY, setArriveY] = useState(null);
  const [arriveLocal, setArriveLocal] = useState(null);

  const [startAddr, setStartAddr] = useState(null);
  const [arriveAddr, setArriveAddr] = useState(null);
  const [dataset, setDataSet] = useState(null);

  let navigate = useNavigate();
  let geocoder = new kakao.maps.services.Geocoder();

  function getCoords(data) {
    geocoder.addressSearch(data, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0].x);
        console.log(result[0].y);
      }
      setStartX(result[0].y);
      setStartY(result[0].x);
    });
  }

  function getArrivedCoords(data) {
    geocoder.addressSearch(data, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0].x);
        console.log(result[0].y);
        //var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      }
      setArriveX(result[0].y);
      setArriveY(result[0].x);
    });
  }

  const openStartCode = (e) => {
    setIsStartOpen(true);
    setIsArrivedOpen(false);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setStartLocal(data.sido);
    setStartAddr(fullAddress);
    getCoords(fullAddress);
  };

  const openArrivedCode = (e) => {
    setIsStartOpen(false);
    setIsArrivedOpen(true);
  };

  const handleComplete2 = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setArriveLocal(data.sido);
    setArriveAddr(fullAddress);
    getArrivedCoords(fullAddress);
  };

  const createCarPost = (e) => {
    e.preventDefault();
    var data = {
      title: e.target.title.value,
      content: e.target.content.value,
      recruit: e.target.recruit.value,
      sdate: e.target.sdate.value,
      edate: e.target.edate.value,
      stime: e.target.stime.value + ":00",
      startLatitude : startX,
      startLongitude : startY,
      arriveLatitude : arriveX,
      arriveLongitude : arriveY,
      local: arriveLocal,
      cars: {
        id: 1,
      },
    };
    console.log(typeof data.sdate)
    console.log(data);

    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios
      .post(
        process.env.REACT_APP_SPRING_API + "/api/carpost/create",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.body);
        setDataSet(res.data.body);
        alert(res.data.message);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { 
    isStartOpen, isArrivedOpen, dataset, startAddr, arriveAddr, 
    navigate, getCoords, getArrivedCoords, openStartCode, openArrivedCode, 
    handleComplete, handleComplete2, createCarPost 
  }
}

export default useCarPoolAdd;

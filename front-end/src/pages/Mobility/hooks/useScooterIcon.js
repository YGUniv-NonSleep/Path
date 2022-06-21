import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import scooter from "../../../assets/images/electric-scooter.png";

function useScooterIcon(){
  const [map, settingMap] = useState(null);
  const [modal, setModal] = useState(null);
  // const [mobilities, setMobilities] = useState([]);

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
    } catch (error) {
      console.log(error);
    }
  }

  //== 모달 창 제어 ==//
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    if (open === true) return setOpen(false);
  };

  function ScooterIcon() {
    // // 임시 고정 좌표 37.5561146977415, 126.937382888804
    // axios.get(process.env.REACT_APP_SPRING_API+"/api/mobilities",{
    //   params :{
    //     x: "128.62269785225394",
    //     y: "35.89624784236353",
    //    type: KICKBOARD, //KICKBOARD, BIKE
    // }})
    // .then((result)=>{
    //   console.log(result);
      
    // })
    // .catch((err)=>{
    //   console.error(err);
    // })

    var positions = [
      { latlng: new kakao.maps.LatLng(37.5561146977415, 126.937382888804) },
      { latlng: new kakao.maps.LatLng(37.5550163763589, 126.939094978874) },
      { latlng: new kakao.maps.LatLng(37.5565588693504, 126.939066561479) },
      { latlng: new kakao.maps.LatLng(37.5574054114823, 126.938305327396) },
      { latlng: new kakao.maps.LatLng(37.5568915849224, 126.941334328122) },
      { latlng: new kakao.maps.LatLng(37.5572093234013, 126.935548521559) },
      { latlng: new kakao.maps.LatLng(37.5558469433118, 126.942380874348) },
      { latlng: new kakao.maps.LatLng(37.5552621346521, 126.93368057964) },
      { latlng: new kakao.maps.LatLng(37.5537013413484, 126.93817257614) },
    ];

    let imageSrc = scooter
    let imageSize = new kakao.maps.Size(55, 55);

    for (var i = 0; i < positions.length; i++) {
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng,
        clickable: true, // 마커를 표시할 위치
        image: markerImage,
      });

      

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        setModal("open");
        console.log(modal);
      });
    }
    marker.setMap(map);
  }

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    ScooterIcon();
  }, [map]);

  return {
    mapLoad, ScooterIcon, handleOpen, handleClose, open, modal
  }
}

export default useScooterIcon
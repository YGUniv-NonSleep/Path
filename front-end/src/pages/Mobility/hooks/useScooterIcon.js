import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import scooter from "../../../assets/images/electric-scooter.png";

function useScooterIcon(){
  const [map, settingMap] = useState(null);
  const [modal, setModal] = useState(null);
  const [mobilities, setMobilities] = useState([]);

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap(new kakao.maps.LatLng(35.8953251, 128.62155));
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

  const getMobilities = async (type, x, y) => {
    const data = {
      x: x,
      y: y,
      type: type,
    };
    const response = await axios
      .get(process.env.REACT_APP_SPRING_API + '/api/mobilities', {
        params: data,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    return response;
  };

  async function ScooterIcon() {

    const responseMobil = await getMobilities('KICKBOARD', 128.621635, 35.89581752);
    console.log(responseMobil);
    
    let imageSrc = scooter

    const normalImage = new kakao.maps.MarkerImage(
      imageSrc,
      new kakao.maps.Size(45,45)
    );

    for (var i = 0; i < responseMobil.data.body.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(
          responseMobil.data.body[i].latitude,
          responseMobil.data.body[i].longitude
        ),
        image: normalImage,
      });
      
    }
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        setModal("open");
        console.log(open);
      });
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
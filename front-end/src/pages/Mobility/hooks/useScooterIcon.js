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

    const responseMobil = await getMobilities('KICKBOARD', 128.62155, 35.8953251);
    console.log(responseMobil);
   
    let imageSrc = scooter
    let imageSize = new kakao.maps.Size(55, 55);
    
    var positions = [
     
    ];
    for (var i = 0; i < responseMobil.data.body.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(
          responseMobil.data.body[i].latitude,
          responseMobil.data.body[i].longitude
        ),
        image: normalImage,
      });

      var infowindow = new kakao.maps.InfoWindow({
        content: `<br><div>모빌리티 : ${responseMobil.data.body[i].id}번</div>
                  <div>타입 : ${responseMobil.data.body[i].type}</div><br> `,
      });

      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow, overImage)
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(marker, infowindow, normalImage)
      );
      setMarkerMobil((prev) => [...prev, marker]);
    }

    // for (var i = 0; i < positions.length; i++) {
    //   var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    //   var marker = new kakao.maps.Marker({
    //     map: map, // 마커를 표시할 지도
    //     position: positions[i].latlng,
    //     clickable: true, // 마커를 표시할 위치
    //     image: markerImage,
    //   });

    //   // 마커에 클릭이벤트를 등록합니다
    //   kakao.maps.event.addListener(marker, "click", function () {
    //     setModal("open");
    //     console.log(modal);
    //   });
    // }
    // marker.setMap(map);
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
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import axios from 'axios'

function useBikeIcon() {
  const [map, settingMap] = useState(null);

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
    } catch (error) {
      console.log(error);
    }
  }

  function BikeIcon() {
    var positions = [
      { latlng: new kakao.maps.LatLng(37.55703156286427, 126.93506654602719) },
      { latlng: new kakao.maps.LatLng(37.5535407879132, 126.936149220986) },
      { latlng: new kakao.maps.LatLng(37.5552621346521, 126.93368057964) },
      { latlng: new kakao.maps.LatLng(37.5550163763589, 126.939094978874) },
      { latlng: new kakao.maps.LatLng(37.5568915849224, 126.941334328122) },
      { latlng: new kakao.maps.LatLng(37.556808840781706, 126.93809418123911) },
      { latlng: new kakao.maps.LatLng(37.5558469433118, 126.942380874348) },
      { latlng: new kakao.maps.LatLng(37.5539717542688, 126.940141530074) },
      { latlng: new kakao.maps.LatLng(37.5537013413484, 126.93817257614) },
    ];

    let imageSrc = "https://cdn-icons-png.flaticon.com/512/4473/4473741.png";

    let imageSize = new kakao.maps.Size(50, 55);

    for (var i = 0; i < positions.length; i++) {
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        image: markerImage,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        axios.get("/api/mobilities/reserve")
        .then((result)=>{
          console.log(result);
          
        })
        .catch((err)=>{
          console.error(err);
        })
      });

      console.log(positions[i].latlng);
    }
    marker.setMap(map);
  }

  
  const test = () => {
    //신호보내고 받음
    var res;
    res.body[0].battery;
  }

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    BikeIcon();
  }, [map]);

  return {
    mapLoad, BikeIcon
  }
}

export default useBikeIcon;

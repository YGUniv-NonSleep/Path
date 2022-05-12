import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";

function useScooterIcon(){
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

  function ScooterIcon() {
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

    let imageSrc =
      "https://cdn-icons.flaticon.com/png/512/3212/premium/3212700.png?token=exp=1652346742~hmac=f2e0f95e5995ab458d1217810dae7e07";
    let imageSize = new kakao.maps.Size(50, 55);

    for (var i = 0; i < positions.length; i++) {
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng,
        clickable: true, // 마커를 표시할 위치
        image: markerImage,
      });

      console.log(positions[i].latlng);

      let iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        
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
    mapLoad, ScooterIcon
  }
}

export default useScooterIcon
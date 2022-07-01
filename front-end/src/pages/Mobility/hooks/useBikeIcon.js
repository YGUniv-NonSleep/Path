import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import axios from 'axios'
import bike from "../../../assets/images/bicycle2(64x64).png";

function useBikeIcon() {
  const [map, settingMap] = useState(null);
  const [modal, setModal] = useState(null);
  const [mobilData, setMobilData] = useState([]);
  const [mobilMarker, setMobilMarker] = useState([]);

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap(new kakao.maps.LatLng(35.8953251, 128.62155));
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
    } catch (error) {
      console.log(error);
    }
  }

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


  async function BikeIcon() {
    const responseMobil = await getMobilities('BIKE', 128.621635, 35.89581752);
    console.log(responseMobil);
    
    let imageSrc = bike;

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
        clickable: true,
      });

      var mobilData = responseMobil.data.body[i];

      var infowindow = new kakao.maps.InfoWindow({
        content: `<br><div>모빌리티 : ${responseMobil.data.body[i].id}번</div>
                  <div>타입 : ${responseMobil.data.body[i].type}</div><br> `,
      });

      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow, normalImage)
      );

      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(marker, infowindow, normalImage)
      );

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", makeClickListener(map, marker, mobilData));
    setMobilMarker((prev) => [...prev, marker]);
  }

    marker.setMap(map);
  }

  const makeOverListener = (map, marker, infowindow, normalImage) => {
    return () => {
      infowindow.open(map, marker);
      marker.setImage(normalImage);
    };
  };

  const makeOutListener = (marker, infowindow, normalImage) => {
    return () => {
      infowindow.close();
      marker.setImage(normalImage);
    };
  };

  const makeClickListener = (map, marker, mobilData) => {
    return () => {
      setMobilData(mobilData)
      setModal("open");
    };
  };

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    BikeIcon();
  }, [map]);

  return {
    mapLoad, BikeIcon, modal, mobilData
  }
}

export default useBikeIcon;

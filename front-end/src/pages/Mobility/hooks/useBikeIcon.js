import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import axios from 'axios'
import bike from "../../../assets/images/bicycle2(64x64).png";

function useBikeIcon() {
  const [map, settingMap] = useState(null);
  const [modal, setModal] = useState(null);

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
        clickable: true,
        position: new kakao.maps.LatLng(
          responseMobil.data.body[i].latitude,
          responseMobil.data.body[i].longitude
        ),
        image: normalImage,
      });
      
    }

      kakao.maps.event.addListener(marker, "click", function () {
        setModal("open");
      });
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
    mapLoad, BikeIcon, modal
  }
}

export default useBikeIcon;

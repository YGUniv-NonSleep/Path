import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import scooter from "../../../assets/images/electric-scooter.png";
import parking from "../../../assets/images/parking.png";
import gps from "../../../assets/images/placeholder.png";

function useScooterIcon(){
  const [map, settingMap] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalRes, setModalRes] = useState(null);
  const [startMod, setStartMod] = useState('');
  const [mobilData, setMobilData] = useState([]);
  const [mobilMarker, setMobilMarker] = useState([]);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [parkData, setParkData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [send, setSend] = useState([]);  
 

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

  function reserve(e) {
    console.log(e.target.value);
    setModal(null);
    setStartMod('');
    setModalRes("openRes")
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
  
  function useStart(param, e) {
    console.log(e.target.value);
    let imageSrc = parking;
    let imageGps = gps;
    console.log(param);
    setSend(param);
    removeMarkers();
    setStartMod("open");
    setModalRes(null);
    setModal(null);

    const normalImage = new kakao.maps.MarkerImage(
      imageSrc,
      new kakao.maps.Size(45,45)
    );

    const useStayImg = new kakao.maps.MarkerImage(
      imageGps,
      new kakao.maps.Size(40,40)
    )

    var marks = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(
        35.8956224,
        128.6224266
      ),
      image: useStayImg
    });

    for (var i = 0; i < 5; i++) {
      var mk = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(
          parkData.data.body[i].latitude,
          parkData.data.body[i].longitude
        ),
        image: normalImage,
        clickable: true,
      });
    }
    mk.setMap(map);
    marks.setMap(map);
  };

  function useStop(e) {
    console.log(e.target.value); 
    setStartMod('');
    setModalRes(null);
    setModal(null);
    location.reload();
  }

  function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  async function ScooterIcon() {
    const responseMobil = await getMobilities('KICKBOARD', 128.621635, 35.89581752);
    console.log(responseMobil);
    setParkData(responseMobil);

    let imageSrc = scooter;

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

      setMarkers((current) => [...current, marker]);

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
      setMinutes(15);
      setSeconds(0);
    };
  };

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    ScooterIcon();
  }, [map]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);


  return {
    mapLoad, ScooterIcon, handleOpen, handleClose, open, modal, mobilData, reserve, modalRes, useStart,
    minutes, seconds, startMod, send, useStop
  }
}

export default useScooterIcon
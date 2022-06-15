import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { PathApi } from "../../../api/OdsayApi";
import { TmapApi } from "../../../api/TmapApi";

function useOderMain() {
  const [userLocation, setUserLocation] = useState(null);
  const [map, settingMap] = useState(null);
  const [closeToggle, setCloseToggle] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if(!closeToggle && true){
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  }, [closeToggle])

  const onCloseToggle = () => {
    setCloseToggle((prev) => !prev)
  }

  async function setUserLatLng() {
    try {
        let result = await MapApi().setCurrentLocation();
        // console.log(result)
        let locPosition = new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude);
        let createMap = await MapApi().createMap(locPosition);
        settingMap(createMap)
        setUserLocation(locPosition)
        
      } catch (error) {
        console.log(error);
      }
  }
  
  async function mapLoad() {
    try {
        let createMap = await MapApi().createMap(userLocation);
        let setController = await MapApi().setController(createMap);
        settingMap(setController);

    } catch (error) {
      console.log(error);
    }
  }

  // 처음 접속시 세팅 Effect Hook

  // 맵 띄우기 -> 위치정보 받음 -> 맵 이동
  // 맵 띄우기 -> 위치정보 안받음
  useEffect(() => {
    if (map == null) {
      mapLoad();
    }
  }, []);

  useEffect(() => {
    if(userLocation == null) {
      setUserLatLng();
    }
    // 위치 정보 제거 기능 추가하기
    // 카테고리, 키워드 검색을 통한 업체 띄우기 구현 준비
  }, []);

  return {
    map, closeToggle, animate, 
    mapLoad, onCloseToggle
  };
}

export default useOderMain;

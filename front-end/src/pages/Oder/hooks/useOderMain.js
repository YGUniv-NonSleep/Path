import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { PathApi } from "../../../api/OdsayApi";
import { TmapApi } from "../../../api/TmapApi";

function useOderMain() {
  const [closeToggle, setCloseToggle] = useState(true);
  const [subBarHide, setSubBarHide] = useState(false)
  const [animate, setAnimate] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [map, settingMap] = useState(null);
  const [searchPath, setSearchPath] = useState(null);
  const [category, setCategory] = useState('');
  const [searchData, setSearchData] = useState('');

  // 검색창 토글 버튼
  const onCloseToggle = () => {
    setCloseToggle((prev) => !prev)
  }

  const onSubBarClick = () => {
    setSubBarHide((prev) => !prev)
  }

  useEffect(() => {
    if(!closeToggle && true){
      // 메인바 닫을 때
      setAnimate(true);
      // if(subBarHide && true) setSubBarHide(false)
      setTimeout(() => setAnimate(false), 300);
    }
    console.log(subBarHide)
  }, [closeToggle, subBarHide])

  function handleChange(e) {
    if (e != undefined) {
      if(e.target.name == 'store') {
        console.log(e.target.value)
        setSearchData(e.target.value);
      } else if(e.target.name == 'category') {
        console.log(e.target.value)
        setCategory(e.target.value);
      }

    } else {
      return;
    }
  }

  useEffect(() => {
    handleChange();
  }, [searchData]);

  // 키워드 검색 & 카테고리 검색(추가 예정)
  async function submit(e){
    try {
      e.preventDefault();

      let res = await MapApi().keywordSearch(searchData);
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

  // 현재 위치정보
  async function setUserLatLng() {
    try {
        let result = await MapApi().setCurrentLocation();
        let locPosition
        if(result.coords) {
          locPosition = new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude);
        } else locPosition = result

        let createMap = await MapApi().createMap(locPosition);
        settingMap(createMap)
        setUserLocation(locPosition)
        
      } catch (error) {
        console.log(error);
      }
  }
  
  // 맵 로드
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
    map, closeToggle, subBarHide, animate, searchData, category, 
    submit, handleChange, mapLoad, onCloseToggle, onSubBarClick, 
  };
}

export default useOderMain;

import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { PathApi } from "../../../api/OdsayApi";
import { TmapApi } from "../../../api/TmapApi";
import currentLoc from '../../../assets/images/placeholder.png';

function useOderMain() {
  const [closeToggle, setCloseToggle] = useState(true);
  const [subBarHide, setSubBarHide] = useState(false)
  const [animate, setAnimate] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [map, settingMap] = useState(null);
  const [searchPath, setSearchPath] = useState(null);
  const [placeList, setPlaceList] = useState([]);
  const [place, setPlace] = useState(null);
  const [pagiObj, setPagiObj] = useState(null);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('');
  const [searchData, setSearchData] = useState(''); // 사용자 입력 값
  const [alignment, setAlignment] = useState(null);

  // 검색창 토글 버튼
  const onCloseToggle = () => {
    setCloseToggle((prev) => !prev)
  }

  const onSubBarClick = (chk) => {
    if(chk==true) {
      if(subBarHide == true) return;
      else setSubBarHide((prev) => !prev)
    }
    else {
      setSubBarHide((prev) => !prev)
    }
  }

  useEffect(() => {
    if(!closeToggle && true){
      // 메인바 닫을 때
      setAnimate(true);
      // if(subBarHide && true) setSubBarHide(false)
      setTimeout(() => setAnimate(false), 300);
    }
  }, [closeToggle, subBarHide])

  function handleChange(e) {
    if (e != undefined) {
      if(e.target.name == 'store') {
        console.log(e.target.value)
        setSearchData(e.target.value);
      }
      else if(e.target.name == 'category') {
        console.log(e.target.innerText)
        setCategory(e.target.innerText);
      }

    } else {
      return;
    }
  }

  useEffect(() => {
    handleChange();
  }, [searchData, category]);

  const handleAlignment = (e) => {
    if(e.target.value == alignment) return;
    if(userLocation == null) {
      alert("현재 위치 정보 없을 경우 거리순 조회가 제한됩니다.");
      return;
    }
    setAlignment(e.target.value);
  };

  async function sortSearch() {
    try {
      
      let data = {
        keyword: searchData,
        userLoc: null,
        category: category,
        page: 1, // 사용자 입력값
        sort: alignment
      }
  
      if(userLocation != undefined && userLocation != null) data.userLoc = userLocation
      await MapApi().keywordSearch(data, callback);
      function callback(result, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(result);
          // console.log(pagination)
          setPlaceList(result)
          setPagiObj(pagination)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if (alignment != null) {
      setTimeout(()=>{
        sortSearch()
      }, 500)
    }
  }, [alignment])

  function keywordSetting(e) {
    e.preventDefault();
    setAlignment('right')
    keywordSubmit();
    setPage(1);
  }

  // 키워드 검색 & 카테고리 검색(추가 예정)
  async function keywordSubmit(){
    try {
      
      let data = {
        keyword: searchData,
        userLoc: null,
        category: "", // 키워드 검색 후 카테고리 검색 미구현
        page: page, // 사용자 입력값
        sort: alignment
      }
  
      if(userLocation != undefined && userLocation != null) data.userLoc = userLocation
      await MapApi().keywordSearch(data, callback);
      function callback(result, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);
          // console.log(pagination)
          setPlaceList(result)
          setPagiObj(pagination)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  function pageSetting(e) {
    e.preventDefault()
    setPage(e.target.innerText)
  }
  
  useEffect(()=>{
    if(page != 0) {
      keywordSubmit()
    }
  }, [page])

  async function categorySubmit() {
    try {
      let data = {
        category: category,
        location: null,
        sort: alignment
      }

      // 사용자 위치 정보 있을 때
      if(userLocation != undefined && userLocation != null) data.location = userLocation
      await MapApi().categorySearch(data, map, callback)
      function callback(result, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result)
          setPlaceList(result)  
          setPagiObj(pagination)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(category != '') {
      setSearchData(category);
      setAlignment('right');
      setPage(1);
      setTimeout(()=>{
        categorySubmit()
      }, 500)
    }
  }, [category])

  function placeTarget(data) {
    // console.log(data)
    setPlace(data)
  }

  // 현재 위치정보
  async function setUserLatLng() {
    let result = await MapApi().setCurrentLocation()
    .catch((err)=>console.log(err.message))

    let locPosition, lat, lng
    let uLocChk = false
    if(result != undefined) {
      lat = result.coords.latitude, lng = result.coords.longitude;
      locPosition = new kakao.maps.LatLng(lat, lng);
      uLocChk = true
      setUserLocation(locPosition)

    } else {
      // 기본 중심 좌표
      lat = 37.55525165729346, lng = 126.93737555322481;
      locPosition = new kakao.maps.LatLng(lat, lng);
    }

    if(uLocChk == true) {
      let markerData = {
        posX: parseFloat(lng),
        posY: parseFloat(lat),
        image: currentLoc
      }
  
      let marker = await MapApi().currentLocMarker(markerData);
      console.log(marker)
      marker.setMap(map)
    }
    
    let data = {
      keyword: "카페",
      userLoc: locPosition,
      category: "",
      page: 1,
      sort: alignment
    }

    // if(locPosition != undefined) data.userLoc = locPosition
    await MapApi().keywordSearch(data, callback)

    function callback(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setPlaceList(result)
      }
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
  }, []);

  return {
    map, closeToggle, subBarHide, animate, searchData, category, placeList, pagiObj, page, searchPath, alignment, place, 
    pageSetting, placeTarget, sortSearch, handleAlignment, keywordSetting, keywordSubmit, categorySubmit, handleChange, mapLoad, onCloseToggle, onSubBarClick
  };
}

export default useOderMain;

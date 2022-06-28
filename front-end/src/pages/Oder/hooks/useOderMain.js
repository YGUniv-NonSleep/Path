import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import currentLoc from '../../../assets/images/placeholder.png';

function useOderMain() {
  // '업체' 회원만 오더에서 업체 조회가 되고 있다
  const [closeToggle, setCloseToggle] = useState(true);
  const [subBarHide, setSubBarHide] = useState(false)
  const [animate, setAnimate] = useState(false);
  const [showStore, setShowStore] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [map, settingMap] = useState(null);
  const [searchPath, setSearchPath] = useState(null);
  const [affiliate, setAffiliate] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [compCateList, setCompCateList] = useState(null);
  const [place, setPlace] = useState(null);
  const [pagiObj, setPagiObj] = useState(null);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('');
  const [searchData, setSearchData] = useState(''); // 사용자 입력 값
  const [alignment, setAlignment] = useState(null);

  const [uLocMarker, setULocMarker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [count, setCount] = useState(1);
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // 검색창 토글 버튼
  const onCloseToggle = () => {
    setCloseToggle((prev) => !prev)
  }

  const onSubBarClick = (chk) => {
    if(chk==true) {
      if(subBarHide == true && showStore == false) 
        return;
      else if(subBarHide == true && showStore == true)
        setShowStore(false);
      else 
        setSubBarHide((prev) => !prev);
    }
    else {
      setSubBarHide((prev) => !prev)
      setShowStore(false)
    }
  }
  
  const handleShowStore = () => {
    setShowStore((prev) => !prev)
    // console.log(showStore)
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
    setAlignment('right');
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
      setSubBarHide(false)
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
    return setPlaceList([]);
  }, [category])

  // 업체 상세 정보
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
      // 사용자 위치 받아오는 좌표가 문제임
      lat = result.coords.latitude, lng = result.coords.longitude;
      uLocChk = true

    } else {
      // 기본 중심 좌표
      lat = 37.56682420267543, lng = 126.978652258823;
    }

    locPosition = new kakao.maps.LatLng(lat, lng);
    setUserLocation(locPosition)

    if(uLocChk == true) {
      let markerData = {
        posX: parseFloat(lng),
        posY: parseFloat(lat),
        image: currentLoc
      }
  
      let marker = await MapApi().currentLocMarker(markerData);
      setULocMarker(marker) 
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
        // 현재 위치 근처의 키워드 카페인 업체들 -> api로 수집한 데이터
        // setPlaceList(result)
      }
    }

  }

  // 현재 위치 마커 찍기
  useEffect(()=>{
    if (uLocMarker != null) {
      map.panTo(userLocation)
      uLocMarker.setMap(map)
    }
  }, [uLocMarker])
  
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

  async function getCurLocComp() {
    try {
      let data = {
        locationList: {
          x: userLocation.La,
          y: userLocation.Ma
        },
        category: null
      }
      let result = await axios.get(
        `${process.env.REACT_APP_SPRING_API}/api/company/`, 
        { params: data }
      )
      // console.log(result)
      setAffiliate(result.data.body)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(userLocation != null) {
      getCurLocComp()
    }
  }, [userLocation]);

  async function getCompProd(comp) {
    try {
      // compId 파라미터로 업체 아이디 받기
      let result = await axios.get(
        `${process.env.REACT_APP_SPRING_API}/api/product/comp/${comp.id}`
      );
      // console.log(result.data.body);
      setProdList(result.data.body);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(place != null) {
      // console.log(place.member) 
      if(place.member != undefined) 
        getCompProd(place);
    }
  }, [place]);

  function categoryExtractor(place) {
    try {
      let arr = [];
      place.map((item)=>{
        arr.push(item.prodBasic.category)
      })

      let result = arr.filter((v, i) => arr.indexOf(v) === i);
      // console.log(result.sort());
      setCompCateList(result.sort());

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(prodList.length != 0) {
      categoryExtractor(prodList)
    }
  }, [prodList])

  return {
    map, closeToggle, subBarHide, animate, searchData, category, placeList, affiliate, 
    prodList, compCateList, pagiObj, page, searchPath, alignment, place, showStore, dialogOpen, count, 
    setCount, handleShowStore, handleDialogOpen, handleDialogClose, pageSetting, placeTarget, 
    sortSearch, handleAlignment, keywordSetting, keywordSubmit, categorySubmit, 
    handleChange, mapLoad, onCloseToggle, onSubBarClick, getCurLocComp, getCompProd, 
  };
}

export default useOderMain;

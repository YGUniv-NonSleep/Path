import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import MapApi from "../../../api/MapApi";
import TossPayments from "../../../api/TossPayments";
import currentLoc from '../../../assets/images/placeholder.png';
import { addCart, clearCart } from "../../../store/cart";
import { drawWalkLine, drawMarker, drawPolyLine, moveToMap } from "./pathDrawing";

function useOderMain() {
  // '업체' 회원만 오더에서 업체 조회가 되고 있다
  const cartState = useSelector((state) => state.cart); // 맴버의 아이디 0 아닌지 체크
  const member = useSelector((state) => state.user);
  const path = useSelector((state) => state.path);
  const dispatch = useDispatch();
  const [toss, setToss] = useState(false);

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
  const [prodInfo, setProdInfo] = useState(null);
  const [place, setPlace] = useState(null);
  const [pagiObj, setPagiObj] = useState(null);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('');
  const [searchData, setSearchData] = useState(''); // 사용자 입력 값
  const [alignment, setAlignment] = useState(null);

  const [uLocMarker, setULocMarker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(1);

  const [optionPrice, setOptionPrice] = useState(0);
  const [optionCalcul, setOptionCalcul] = useState([]);

  function reset() {
    setSubBarHide(false);
    setPlaceList([]);
    setPagiObj(null);
    setSearchData('');
    setProducts([]);
    getCurLocComp();
  }

  const [markers, setMarkers] = useState([]);
  const [polyLines, setPolyLines] = useState([]);
  const [firstWalkLine, setFirstWalkLine] = useState([]);
  const [lastWalkLine, setLastWalkLine] = useState([]);
  const [pathName, setPathName] = useState({
    sName: "", eName: ""
  });

  const openTossWindow = () => {
    setToss(true)
  }

  async function tossCreate() {
    await TossPayments(member, cartState);
  }

  useEffect(()=>{
    try {
      if(toss == true) {
        tossCreate()
      }
      setToss(false)

    } catch (error) {
      console.log(error)
    }
  }, [toss])

  const calculOpt = (dOpid) => {
    // console.log(dOpid) // 카트에 옵션 정보 담을거임
    let data = dOpid;
    
    if (optionCalcul.length == 0) {
      setOptionCalcul([data]);
      setOptionPrice((prev) => prev + parseInt(data.price))
    }
    else {
      let op = optionCalcul; // 이전 데이터
      let result = op.filter((v) => v.optionId != data.optionId) // 필터 후 데이터
      result.push(data);
      result.sort(function(a, b) { return a.optionId - b.optionId })
      //console.log(result)

      let sum = 0
      result.map((item)=>{
        sum += parseInt(item.price)
      })

      setOptionPrice(sum)
      setOptionCalcul(result)
    }
  }
  // console.log(optionCalcul)

  const putCart = (prodInfo, price, count) => {
    // console.log(prodInfo)
    let cartData = {
      comId: prodInfo.company.id,
      comName: prodInfo.company.name,
      total: price * count,
      orderCompositionList: {
        productId: prodInfo.id,
        quantity: count,
        price: price * count, // 갯수 곱한건가?
        name: prodInfo.prodBasic.name
      }
    }
    
    let optName = [];
    let opList = []
    optionCalcul.map((opt)=>{
      optName.push(opt.name)
      opList.push(opt.id)
    })
    cartData.orderCompositionList.OptName = optName
    opList.sort((a, b)=>{return a-b})

    let carts = cartState.orderCompositionList;
    let chk = false; // duplicate check

    carts.map((item)=>{
      if (item.productId === prodInfo.id) {
        if (item.detailOptionList.toString() === opList.toString()) {
          chk = true
          // alert("해당 상품과 같은 옵션의 상품이 장바구니에 이미 있습니다.")
        }
      }
    })

    if(chk) return alert("해당 상품과 같은 옵션의 상품이 장바구니에 이미 있습니다.")
    if(cartState.comId != 0) {
      if(cartState.comId != cartData.comId) {
        alert("다른 업체 상품이 장바구니에 등록되어있습니다")
        if(confirm("새 업체의 상품을 등록하시겠습니까?")) dispatch(clearCart())
        else return 
      }
    }

    cartData.orderCompositionList.detailOptionList = opList
    console.log(cartData)
    dispatch(addCart(cartData))
    handleDialogClose()
  }

  const handleCartOpen = () => {
    setCartOpen(true)
  };
  
  const handleCartClose = () => {
    setCartOpen(false)
  };

  const handleDialogOpen = (pInfo) => {
    // console.log(pInfo)
    setProdInfo(pInfo)
    setDialogOpen(true);
    setOptionCalcul([])
    setCount(1)
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setOptionCalcul([])
    setCount(1)
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
        // console.log(e.target.value)
        setSearchData(e.target.value);
      } else if(e.target.name == 'category') {
        // console.log(e.target.innerText)
        setCategory(e.target.innerText);
      }

    } else {
      return;
    }
  }

  function clickCategory(e) { // 다른 state 만들자
    // if(category != '') {
    //   if (category == e.target.innerText) setCategory('')
    //   else setCategory(e.target.innerText)

    // } else setCategory(e.target.innerText)
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
      // await MapApi().keywordSearch(data, callback);
      // function callback(result, status, pagination) {
      //   if (status === kakao.maps.services.Status.OK) {
      //     // console.log(result);
      //     // console.log(pagination)
      //     // setPlaceList(result)
      //     // setPagiObj(pagination)
      //   }
      // }

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

  function keywordSetting(e) { // 검색 옵션으로 상품, 장소 있어야댐
    e.preventDefault();
    setAlignment('right');
    searchProduct(searchData) // 서버 데이터 검색 -> 뭔가 이상함
    // keywordSubmit(); api 검색
    setSubBarHide(false)
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

      // await MapApi().keywordSearch(data, callback);
      // function callback(result, status, pagination) {
      //   if (status === kakao.maps.services.Status.OK) {
      //     console.log(result);
      //     // console.log(pagination)
      //     // setPlaceList(result)
      //     // setPagiObj(pagination)
      //   }
      // }

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
      let cate = "";
      if (category != '') {
        if (category == '대형마트') cate = 'MART';
        if (category == '편의점') cate = 'CONVENIENCESTORE';
        if (category == '음식점') cate = 'RESTAURANT';
        if (category == '카페') cate = 'CAFE';
        if (category == '병원') cate = 'HOSPITAL';
        if (category == '약국') cate = 'PHARMACY';
      }

      let data = {
        locationList: {
          x: userLocation.La,
          y: userLocation.Ma
        },
        category: cate
      }
      let result = await axios.get(
        `${process.env.REACT_APP_SPRING_API}/api/company/`, 
        { params: data }
      )
      console.log(result)
      setProducts([])
      setAffiliate(result.data.body)
      
      // let data = {
      //   category: category,
      //   location: null,
      //   sort: alignment
      // }

      // // 사용자 위치 정보 있을 때
      // if(userLocation != undefined && userLocation != null) data.location = userLocation
      // await MapApi().categorySearch(data, map, callback)
      // function callback(result, status, pagination) {
      //   if (status === kakao.maps.services.Status.OK) {
      //     console.log(result)
      //     // setPlaceList(result)  
      //     // setPagiObj(pagination)
      //   }
      // }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(category != '') {
      // setSearchData(category);
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
    if(data.company == undefined) {
      setPlace(data)
    } else setPlace(data.company) 
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
    // await MapApi().keywordSearch(data, callback)

    function callback(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 현재 위치 근처의 키워드 카페인 업체들 -> api로 수집한 데이터
        // setPlaceList(result)
      }
    }

  }

  const [userLocMarker, setUserLocMarker] = useState(null);
  // 현재 위치 마커 찍기
  useEffect(()=>{
    if (uLocMarker != null) {
      map.panTo(userLocation)
      uLocMarker.setMap(map)
      setUserLocMarker(uLocMarker)
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

  useEffect(()=>{
    pathDraw();
  }, [])

  async function pathDraw() {
    if(path.pathData == null) return
    else {
      try {
        if(userLocMarker != null) {
          userLocMarker.setMap(null)
          setUserLocMarker(null) 
        }
        if (markers.length != 0) removeMarkers();
        if (polyLines.length != 0) removeGraphics();
        if (firstWalkLine.length != 0) removeFirstWalkGraphics();
        if (lastWalkLine.length != 0) removeLastWalkGraphics();
        
        setPathName({sName: path.sName, eName: path.eName})

        const sp = await drawMarker(path.pathData.startPos)
        sp.setMap(map)
        setMarkers((current) => [...current, sp]);

        const ep = await drawMarker(path.pathData.endPos)
        ep.setMap(map)
        setMarkers((current) => [...current, ep]);

        const polyLine = await drawPolyLine(path.pathData)
        polyLine.polyline.setMap(map);
        setPolyLines([polyLine.polyline]);

        const boundary = await moveToMap(path.pathData, polyLine)
        map.setBounds(boundary.bounds);

        const firstWalk = await drawWalkLine(
          path.pathData.startPos.x, path.pathData.startPos.y,
          boundary.points[2].La, boundary.points[2].Ma
        );
        firstWalk.setMap(map);
        setFirstWalkLine([firstWalk]);

        const lastWalk = await drawWalkLine(
          boundary.points[boundary.points.length - 1].La, 
          boundary.points[boundary.points.length - 1].Ma,
          path.pathData.endPos.x, path.pathData.endPos.y,
        )
        lastWalk.setMap(map);      
        setLastWalkLine([lastWalk]);

      } catch (error) {
        console.log(error)
      }
    }
  }

  function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  }
  
  function removeGraphics() {
    for (let i = 0; i < polyLines.length; i++) {
      polyLines[i].setMap(null);
    }
    setPolyLines([]);
  }
  
  function removeFirstWalkGraphics() {
    for (let i = 0; i < firstWalkLine.length; i++) {
      firstWalkLine[i].setMap(null);
    }
    setFirstWalkLine([]);
  }
  
  function removeLastWalkGraphics() {
    for (let i = 0; i < lastWalkLine.length; i++) {
      lastWalkLine[i].setMap(null);
    }
    setLastWalkLine([]);
  }

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
      // 현재 위치 기반 기본 값
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

  const [products, setProducts] = useState([]);

  async function searchProduct(word) {
    try {
      if (path.pathData == null) {
        let data = {
          locationList: {
            x: userLocation.La,
            y: userLocation.Ma
          },
          name: word,
          category: null
        }
        let p = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/product/`, data
        );

        let list = []
        for(var i=0; i<p.data.body.length; i++) {
          list.push(p.data.body[i])
        }
        setAffiliate([])
        setProducts(list)

      } else {
        let sData = {
          locationList: [{
            x: path.pathData.startPos.y,
            y: path.pathData.startPos.x
          }],
          name: word,
          category: null
        }
        let eData = {
          locationList: [{
            x: path.pathData.endPos.y,
            y: path.pathData.endPos.x
          }],
          name: word,
          category: null
        }

        let sp = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/product/`, sData
        );
  
        let ep = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/product/`, eData
        );
        
        let list = []
        for(var i=0; i<sp.data.body.length; i++){
          sp.data.body[i].loc = "start"
          list.push(sp.data.body[i])
        }
  
        for(var i=0; i<ep.data.body.length; i++){
          ep.data.body[i].loc = "end"
          list.push(ep.data.body[i])
        }
  
        console.log(list)
        setAffiliate([])
        setProducts(list)
      }

    } catch (error) {
      console.log(error);
    }
  }

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
    map, closeToggle, subBarHide, animate, searchData, category, placeList, affiliate, prodInfo, optionPrice, pathName, products, 
    prodList, compCateList, pagiObj, page, searchPath, alignment, place, showStore, dialogOpen, count, cartState, cartOpen, 
    handleCartOpen, handleCartClose, openTossWindow, clickCategory, reset, pathDraw, 
    setCount, handleShowStore, handleDialogOpen, handleDialogClose, pageSetting, placeTarget, 
    sortSearch, handleAlignment, keywordSetting, keywordSubmit, categorySubmit, calculOpt, 
    handleChange, mapLoad, onCloseToggle, onSubBarClick, getCurLocComp, getCompProd, putCart, 
  };
}

export default useOderMain;

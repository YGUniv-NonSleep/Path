import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import MapApi from "../../../api/MapApi";
import TossPayments from "../../../api/TossPayments";
import currentLoc from '../../../assets/images/placeholder.png';
import { addCart, clearCart } from "../../../store/cart";
import { drawWalkLine, drawMarker, drawPolyLine, moveToMap } from "./pathDrawing";
import qs from "qs";

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

  const [userLocMarker, setUserLocMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [storeMarkers, setStoreMarkers] = useState([]);
  const [polyLines, setPolyLines] = useState([]);
  const [firstWalkLine, setFirstWalkLine] = useState([]);
  const [lastWalkLine, setLastWalkLine] = useState([]);
  const [pathName, setPathName] = useState({
    sName: "", eName: ""
  });

  const [optionPrice, setOptionPrice] = useState(0);
  const [optionCalcul, setOptionCalcul] = useState([]);

  function reset() {
    setSubBarHide(false);
    setCategory('');
    setPlaceList([]);
    setAffiliate([]);
    setProducts([]);
    setPagiObj(null);
    setSearchData('');
    // getCurLocComp();
    // removeMarkers();
    removeStoreMarkers();
  }

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

    } else {
      let op = optionCalcul; // 이전 데이터
      let result = op.filter((v) => v.optionId != data.optionId) // 필터 후 데이터
      result.push(data);
      result.sort(function(a, b) { return a.optionId - b.optionId })

      let sum = 0
      result.map((item)=>{
        sum += parseInt(item.price)
      })

      setOptionPrice(sum)
      setOptionCalcul(result)
    }
  }

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

    carts.map((item) => {
      if (item.productId === prodInfo.id) {
        if (item.detailOptionList.toString() === opList.toString()) chk = true
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
        setSearchData(e.target.value);
      } else if(e.target.name == 'category') {
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
      // page: 1 로 하고 sort: alignment(좌, 우)로 조건별 정렬

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

  async function keywordSetting(e) { // 검색 옵션으로 상품, 장소 있어야댐
    e.preventDefault();

    setAlignment('right');
    if (storeMarkers.length != 0) removeStoreMarkers();
    await searchProduct(searchData)
    setSubBarHide(false)
    setPage(1);
  }

  function pageSetting(e) {
    e.preventDefault()
    setPage(e.target.innerText)
  }
  
  useEffect(()=>{
    if(page != 0) {
      setSubBarHide(false)
      // 페이지가 바뀌면 새로운 페이지 번호를 가지고 검색하는 함수
    }
  }, [page])

  useEffect(()=>{
    if(category != '') {
      setAlignment('right');
      setPage(1);
      if(closeToggle == false) onCloseToggle()
      if (storeMarkers.length != 0) removeStoreMarkers();
      setTimeout(()=>{
        getCurLocComp()
      }, 300)
    }
  }, [category])

  // 업체 상세 정보
  function placeTarget(data) {
    // console.log(data)
    // 여기서 눌렀을 때 마커가 화면에 안올라가 백색 화면
    if(data.company == undefined) {
      map.panTo(new kakao.maps.LatLng(data.latitude, data.longitude))
      setPlace(data)
      
    } else {
      let ob = data.company
      // console.log(ob)
      ob.distance = data.distance
      ob.loc = data.loc
      map.panTo(new kakao.maps.LatLng(ob.latitude, ob.longitude))
      setPlace(ob)
    }
  }

  // 현재 위치정보
  async function setUserLatLng() {
    try {
      let result = await MapApi().setCurrentLocation()

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

    } catch (error) {
      console.log(error)
    }

  }

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
    if (userLocation == null) {
      setUserLatLng();
      setPathName({sName: path.sName, eName: path.eName})
    }
  }, []);

  // useEffect(() => {
  //   console.log("update2")
  //   if(userLocation == null) {
  //     setUserLatLng();
  //     setPathName({sName: path.sName, eName: path.eName})
  //   }
  //   // 위치 정보 제거 기능 추가하기
  // }, []);

  async function pathDraw() {
    if(path.pathData == null) return
    else {
      try {
        // if(userLocMarker != null) {
        //   userLocMarker.setMap(null)
        //   setUserLocMarker(null) 
        // }
        if (markers.length != 0) removeMarkers();
        if (polyLines.length != 0) removeGraphics();
        if (firstWalkLine.length != 0) removeFirstWalkGraphics();
        if (lastWalkLine.length != 0) removeLastWalkGraphics();
        if (storeMarkers.length != 0) removeStoreMarkers();

        const sp = await drawMarker(path.pathData.startPos, "start")
        const ep = await drawMarker(path.pathData.endPos, "end")
        const polyLine = await drawPolyLine(path.pathData)
        const boundary = await moveToMap(path.pathData, polyLine)
        let bounds = new kakao.maps.LatLngBounds();
        for (var i = 0; i < boundary.points.length; i++) {
          bounds.extend(boundary.points[i]);
        }

        const firstWalk = await drawWalkLine(
          path.pathData.startPos.x, path.pathData.startPos.y,
          boundary.points[2].La, boundary.points[2].Ma
        );
        const lastWalk = await drawWalkLine(
          boundary.points[boundary.points.length - 1].La, 
          boundary.points[boundary.points.length - 1].Ma,
          path.pathData.endPos.x, path.pathData.endPos.y,
        )

        sp.setMap(map);
        ep.setMap(map);
        polyLine.polyline.setMap(map);
        firstWalk.setMap(map);
        lastWalk.setMap(map);
        map.setBounds(bounds);
        
        setMarkers((current) => [...current, sp]);
        setMarkers((current) => [...current, ep]);
        setPolyLines([polyLine.polyline]);
        setFirstWalkLine([firstWalk]);
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

  function removeStoreMarkers() {
    console.log("remove storeMarker")
    for (var i = 0; i < storeMarkers.length; i++) {
      storeMarkers[i].setMap(null);
    }
    setStoreMarkers([]);
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

  const makeOverListener = (map, marker, infowindow) => {
    return () => {
      infowindow.open(map, marker);
    };
  };

  const makeOutListener = (infowindow) => {
    return () => {
      infowindow.close();
    };
  };

  async function getCurLocComp() {
    try {
      let cate = null;
      if (category != '') {
        if (category == '대형마트') cate = 'MART';
        if (category == '편의점') cate = 'CONVENIENCESTORE';
        if (category == '음식점') cate = 'RESTAURANT';
        if (category == '카페') cate = 'CAFE';
        if (category == '병원') cate = 'HOSPITAL';
        if (category == '약국') cate = 'PHARMACY';
      }

      let markerList = [];

      axios.defaults.paramsSerializer = params => {
        return qs.stringify(params, {arrayFormat: 'comma'});
      }

      if(path.pathData == null) {
        let locationDto = {
          // 유저 위치
          x: [userLocation.La],
          y: [userLocation.Ma], 
          category: cate
        }

        let result = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/company/search`, { 
            params: locationDto 
          })

        let list = []
        for(var i=0; i<result.data.body.length; i++){
          if(i>=15) break;
          if (cate != null) {
            if(result.data.body[i].category !== cate) continue;
          }
          let coordList = []
          coordList.push(new kakao.maps.LatLng(
            locationDto.x[0], locationDto.y[0]
          ))

          let storeMarkerPosition;
          storeMarkerPosition = new kakao.maps.LatLng(
            result.data.body[i].longitude, result.data.body[i].latitude
          )
          coordList.push(storeMarkerPosition)

          let length = await MapApi().getCoordLength(coordList);
          if(length >= 1500) continue;
          markerList.push(storeMarkerPosition)

          result.data.body[i].distance = length;
          list.push(result.data.body[i])
        }

        if(list.length == 0) {
          return alert("검색 결과가 존재하지 않습니다.")
        }

        let ml = [];
        for (var i = 0; i < markerList.length; i++) {
          let data = {
            x: markerList[i].Ma,
            y: markerList[i].La,
          }

          let marker = await drawMarker(data, "")
          let infowindow = new kakao.maps.InfoWindow({
            content: `<div>&nbsp;${list[i].name}(${list[i].category})</div>`, // 인포윈도우에 표시할 내용
          });

          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          ml.push(marker)
        }

        setProducts([])
        // if(affiliate.length != 0) {
        //   setAffiliate([])
        // }
        setAffiliate(list)
        setStoreMarkers(ml)

      } else {
        let locationDto = {
          // 마커 x(126), y(37) 리스트
          x: [path.pathData.startPos.x],
          y: [path.pathData.startPos.y],
          category: cate
        }

        let result = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/company/search`, {
            params: locationDto
          }
        );
          console.log(userLocation)
        let list = []
        for(var i=0; i<result.data.body.length; i++){
          if(i>=15) break;
          if (cate != null) {
            // 카테고리 내용이 같은지 판별
            if(result.data.body[i].category !== cate) continue;
          }
          let coordList = []
          // 얻어온 출발지 도착지 x, y 좌표 값 넣기
          
          let se = "";
          coordList.push(new kakao.maps.LatLng(
            userLocation.La, userLocation.Ma
          ))
          se = "store";
          // if(i < result.data.body.length/2) {
          //   coordList.push(new kakao.maps.LatLng(
          //     locationDto.x[0], locationDto.y[0]
          //   ))
          //   se = "start";

          // } else {
          //   coordList.push(new kakao.maps.LatLng(
          //     locationDto.x[1], locationDto.y[1]
          //   ))
          //   se = "end";
          // }

          let storeMarkerPosition; // 시작지점, 마지막 지점을 포함한 좌표들
          storeMarkerPosition = new kakao.maps.LatLng(
            result.data.body[i].longitude, result.data.body[i].latitude
          )
          coordList.push(storeMarkerPosition)

          let length = await MapApi().getCoordLength(coordList);
          if(length >= 3000) continue;

          markerList.push(storeMarkerPosition)

          if(se == "start") 
            result.data.body[i].loc = "start";
          else if(se == "end") 
            result.data.body[i].loc = "end";
          else 
            result.data.body[i].loc = "store";

          result.data.body[i].distance = length;
          list.push(result.data.body[i])
        }

        if(list.length == 0) {
          return alert("검색 결과가 존재하지 않습니다.")
        }

        let ml = [];
        for (var i = 0; i < markerList.length; i++) {
          let data = {
            x: markerList[i].Ma,
            y: markerList[i].La,
          }

          // let marker = await drawMarker(data, list[i].loc)
          let marker = await drawMarker(data, "")
          let infowindow = new kakao.maps.InfoWindow({
            content: `<div>&nbsp;${list[i].name}(${list[i].category})</div>`, // 인포윈도우에 표시할 내용
          });

          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          ml.push(marker)
        }

        setProducts([])
        // if(affiliate.length != 0) {
        //   setAffiliate([])
        // }
        setAffiliate(list)
        setStoreMarkers(ml)

      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(userLocation != null && userLocMarker != null) {
      // 현재 위치 기반 기본 값
      if (storeMarkers.length != 0) removeStoreMarkers();
      setTimeout(()=>{
        getCurLocComp()
      }, 300)
    }
  }, [userLocation]);

  async function getCompProd(comp) {
    try {
      // compId 파라미터로 업체 아이디 받기
      let result = await axios.get(
        `${process.env.REACT_APP_SPRING_API}/api/product/comp/${comp.id}`
      );
      setProdList(result.data.body);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(place != null) {
      if(place.member != undefined) {
        getCompProd(place);
      }
    }
  }, [place]);

  const [products, setProducts] = useState([]);

  async function searchProduct(word) {
    try {
      if (!word.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return;
      }

      let markerList = []

      axios.defaults.paramsSerializer = params => {
        return qs.stringify(params, {arrayFormat: 'comma'});
      }
      
      if (path.pathData == null) {
        let data = {
          // 유저 위치
          x: [userLocation.La],
          y: [userLocation.Ma],
          name: word
        }

        let p = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/product/search`, {
            params: data
          },
        );

        let list = []
        for(var i=0; i<p.data.body.length; i++) {
          if(i>=10) break;
          // 이름에 word 입력값이 포함되어있는지 확인
          if(!p.data.body[i].prodBasic.name.includes(word)) continue;
          else {
            let coordList = []
            coordList.push(new kakao.maps.LatLng(
              data.x[0], data.y[0]
            ))

            let storeMarkerPosition;
            storeMarkerPosition = new kakao.maps.LatLng(
              p.data.body[i].company.longitude, p.data.body[i].company.latitude
            )
            coordList.push(storeMarkerPosition)

            let length = await MapApi().getCoordLength(coordList);
            if(length >= 1500) continue;

            markerList.push(storeMarkerPosition)
            
            p.data.body[i].distance = length;
            list.push(p.data.body[i])

          }
        }

        if(list.length == 0) {
          alert("검색 결과가 존재하지 않습니다.")
          return reset()
        }

        let ml = [];
        for (var i = 0; i < markerList.length; i++) {
          let data = {
            x: markerList[i].Ma,
            y: markerList[i].La,
          }
          
          let marker = await drawMarker(data, "")
          let infowindow = new kakao.maps.InfoWindow({
            content: `<div>&nbsp;${list[i].company.name}(${list[i].company.category})</div>`, // 인포윈도우에 표시할 내용
          });

          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          ml.push(marker)
        }

        setStoreMarkers(ml)
        setAffiliate([])
        // if(products.length != 0) {
        //   setProducts([])
        // }
        setProducts(list)

      } else {
        let locationDto = {
          // 마커 x(126), y(37) 리스트
          // 얻어온 출발지 도착지 x, y 좌표 값 넣기
          x: [path.pathData.startPos.x, path.pathData.endPos.x],
          y: [path.pathData.startPos.y, path.pathData.endPos.y],
          name: word,
          // category: null
        }

        let result = await axios.get(
          `${process.env.REACT_APP_SPRING_API}/api/product/search`, {
            params: locationDto
          });

        let list = []
        for(var i=0; i<result.data.body.length; i++){
          if(i>=15) break;
	        // 이름에 word 입력값이 포함되어있는지 확인
          if(!result.data.body[i].prodBasic.name.includes(word)) continue;
          let coordList = []
          
          let se = "";
          coordList.push(new kakao.maps.LatLng(
            userLocation.La, userLocation.Ma
          ))
          se = "store";
          // if(i < result.data.body.length/2) {
          //   coordList.push(new kakao.maps.LatLng(
          //     locationDto.x[0], locationDto.y[0]
          //   ))
          //   se = "start";

          // } else {
          //   coordList.push(new kakao.maps.LatLng(
          //     locationDto.x[1], locationDto.y[1]
          //   ))
          //   se = "end";
          // }

          let storeMarkerPosition; // 시작지점, 마지막 지점을 포함한 좌표들
          storeMarkerPosition = new kakao.maps.LatLng(
            result.data.body[i].company.longitude, result.data.body[i].company.latitude
          )
          coordList.push(storeMarkerPosition)

          let length = await MapApi().getCoordLength(coordList);
          if(length >= 3000) continue;
          markerList.push(storeMarkerPosition)

          if(se == "start") 
            result.data.body[i].loc = "start";
          else if(se == "end") 
            result.data.body[i].loc = "end";
          else 
            result.data.body[i].loc = "store";

          result.data.body[i].distance = length;
          list.push(result.data.body[i])
        }

        if(list.length == 0) {
	        alert("검색 결과가 존재하지 않습니다.")
          return reset()
        }

        let ml = [];
        for (var i = 0; i < markerList.length; i++) {
          let data = {
            x: markerList[i].Ma,
            y: markerList[i].La,
          }

          //let marker = await drawMarker(data, list[i].loc)
          let marker = await drawMarker(data, "")
          let infowindow = new kakao.maps.InfoWindow({
            content: `<div>&nbsp;${list[i].company.name}(${list[i].company.category})</div>`, // 인포윈도우에 표시할 내용
          });

          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

          marker.setMap(map)
          ml.push(marker)
        }

        setStoreMarkers(ml)
        setAffiliate([])
        // if(products.length != 0) {
        //   setProducts([])
        // }
        setProducts(list)

      }

    } catch (error) {
      console.log(error);
    }
  }

  function denoteStoreMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  useEffect(()=>{
    if (storeMarkers.length != 0) {
      denoteStoreMarkers(storeMarkers)
    }
  }, [storeMarkers])

  // function categoryExtractor(place) {
  //   try {
  //     let arr = [];
  //     place.map((item)=>{
  //       arr.push(item.prodBasic.category)
  //     })

  //     let result = arr.filter((v, i) => arr.indexOf(v) === i);
  //     // console.log(result.sort());
  //     setCompCateList(result.sort());

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(()=>{
  //   if(prodList.length != 0) {
  //     categoryExtractor(prodList)
  //   }
  // }, [prodList])

  return {
    map, closeToggle, subBarHide, animate, searchData, category, placeList, affiliate, prodInfo, optionPrice, pathName, products, 
    prodList, compCateList, pagiObj, page, searchPath, alignment, place, showStore, dialogOpen, count, cartState, cartOpen, 
    handleCartOpen, handleCartClose, openTossWindow, reset, pathDraw, denoteStoreMarkers,
    setCount, handleShowStore, handleDialogOpen, handleDialogClose, pageSetting, placeTarget, 
    sortSearch, handleAlignment, keywordSetting, calculOpt, setCount,
    handleChange, mapLoad, onCloseToggle, onSubBarClick, getCurLocComp, getCompProd, putCart, 
  };
}

export default useOderMain;

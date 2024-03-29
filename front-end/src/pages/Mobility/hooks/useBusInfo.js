import { CollectionsBookmarkOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { MobilityApi } from "../../../api/OdsayApi";

function useBusInfo(){
    const [map, settingMap] = useState(null);
    const [busNo, setBusNo] = useState("");
    const [markers, setMarkers] = useState([]);
    const [stayMarker, setStayMarker] = useState([]);
    const [poly, setPoly] = useState("");
    const [busList, setBusList] = useState([]);
    const [busStop, setBusStop] = useState([]);
    const [toggleValue, setToggleValue] = useState("bus");
    const [searchValue, setSearchValue] = useState("");
    const [busStopValue, setBusStopValue] = useState(null);
    const [busValue, setBusValue] = useState("");
    const [busStopInfo, setBusStopInfo] = useState("");
    const [busStopClickList, setBusStopClickList] = useState("");
    const [busLineDetail, setBusLineDetail] = useState("");
  
    async function mapLoad() {
      try {
        let createMap = await MapApi().createMap(new kakao.maps.LatLng(35.8953251, 128.62155));
        let setController = await MapApi().setController(createMap);
        settingMap(setController);
      } catch (error) {
        console.log(error);
      }
    }
  
  
    function onChanged(e) {
      if (e != undefined) {
        console.log(e.target.value);
        setBusNo(e.target.value);
      } else {
        return 0;
      }
    }
  
    useEffect(() => {
      onChanged();
    }, [busNo]);

    function onToggle(e){
      console.log(e.target.value)
      if(e.target.value != "busStop"){
        setToggleValue("bus")
        setBusNo("")
        setBusStop([])
      } else {
        setToggleValue("busStop")
        setBusNo("")
        setBusList([])
      }
    }

    async function busClickValue(data, e) { 
      e.preventDefault();
      console.log(data);
      if(e.target.value != undefined){
        let stopID = data;
        let busStopID = await MobilityApi.getBusStationBus(stopID).catch((error) => console.log(error));
        setBusValue(busStopID);
      }else {
        return 0;
      }
    }

    async function busStopClick(params, e){
      e.preventDefault();
      console.log(params);
      if(e.target.value != undefined){
        let stopID = params;
        let busStopID = await MobilityApi.getBusStationInfo(stopID).catch((error) => console.log(error));
        console.log(busStopID);
        setBusStopInfo(busStopID);
        setBusStopValue("busStopClick");

      } else {
        return 0;
      }
    }

    async function busStopList(params, e){ 
      e.preventDefault();
      console.log(params);
      if(e.target.value != undefined){
      let busID = params;
      let busLineDetail = await MobilityApi.getBusDetailLine(busID).catch((error) => console.log(error));
      setBusLineDetail(busLineDetail);
      setBusStopClickList("busStopList");
      }
    }

    function backClick() {
      setBusStopValue(null);
    }

    function clickBack(){
      setBusStopClickList("");
    }
  
    function submit(e) {
      e.preventDefault();
      console.log(busNo);
      busInfo(busNo);
      setSearchValue(busNo);
    }
    
    async function busInfo(data) {
      removeMarkers();
      removeStayMarkers();
      if (poly != "") {
        removeGraphics();
      }

      let busNo = data;
      //정류장
      let busStay = await MobilityApi.getBusStay(busNo).catch((error) =>console.log(error));
      console.log(busStay);
      setBusStop(busStay);

      const array1 = busStay;
      //console.log(array1);
  
  
      if (busStay != null) {
        var bound = new kakao.maps.LatLngBounds();
        for (var i = 0; i < array1.length; i++) {
          let busStayMark = new kakao.maps.LatLng(array1[i].y, array1[i].x);
          //console.log(busStayMark);
  
          const mark = new kakao.maps.Marker({
            position: busStayMark,
          });
          mark.setMap(map);
          setStayMarker((current) => [...current, mark]);
          bound.extend(busStayMark);
        }
        map.setBounds(bound);
      }
  
      //버스 번호
      let busInfo = await MobilityApi.getBusId(busNo).catch((error) =>console.log(error));
      let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch((error) => console.log(error));
      let busStayDetail = await MobilityApi.getBusStayDetail(busInfo).catch((error) => console.log(error));
      console.log(busStayDetail);
   
  
      const array = busDetailInfo.result.station;
      console.log(array)
      setBusList(busStayDetail)
  
      const bPoly = await MapApi().drawKakaoBusPolyLine(
        busDetailInfo.result.station
      );
      bPoly.setMap(map);
      setPoly(bPoly);
  
      if (busInfo != null) {
        var bounds = new kakao.maps.LatLngBounds();
  
        for (var i = 0; i < array.length; i++) {
          let markerPosition = new kakao.maps.LatLng(array[i].y, array[i].x);
          const mk = new kakao.maps.Marker({
            position: markerPosition,
            clickable: true,
          });
          mk.setMap(map);
          setMarkers((current) => [...current, mk]);
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(markerPosition);
        }
  
        map.setBounds(bounds);
      }
  
      function removeMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        setMarkers([]);
      }
  
      function removeStayMarkers() {
        for (var i = 0; i < stayMarker.length; i++) {
          stayMarker[i].setMap(null);
        }
        setStayMarker([]);
      }
  
      function removeGraphics() {
        // console.log(poly);
        poly.setMap(null);
        setPoly("");
      }
    }
  
    useEffect(() => {
      mapLoad();
    }, []);
  
    // useEffect(() => {
    //   //busInfo()
    // }, [map]);

    return {
        busNo, busList, busStop, toggleValue, 
        mapLoad, onChanged, submit, busInfo, onToggle, 
        busStopClick, busStopValue, searchValue, busClickValue, busValue, backClick, clickBack,
        busStopInfo, busStopList, busStopClickList, busLineDetail
    }
}

export default useBusInfo
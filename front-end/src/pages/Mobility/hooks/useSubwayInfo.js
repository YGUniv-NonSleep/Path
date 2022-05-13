import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { SubwayApi } from "../../../api/OdsayApi";

function useSubwayInfo() {
  const [map, settingMap] = useState(null);
  const [subName, setSubName] = useState("");
  const [markers, setMarkers] = useState([]);
  const [staInfo, setStaInfo] = useState([]);
  const [subTime, setSubTime] =useState([]);
  const [toggleValue, setToggleValue] = useState(null);

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
    } catch (error) {
      console.log(error);
    }
  }

  function onChanged(e) {
    if (e != undefined) {
     //검색한 지하철역 이름 console.log(e.target.value);
      setSubName(e.target.value);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    onChanged();
  }, [subName]);
  // [subName]이 실행될 때마다 useEffect 안에 있는 onChanged()를 실행하는 것

  function onToggle(e){
    if(e.target.value != "time"){
      setToggleValue("exit")
    } else{
      setToggleValue("time")
    }
  }

  function submit(e) {
    e.preventDefault();
    // 검색한 지하철역 이름  console.log(subName);
    subInfo(subName);
  }

  async function subInfo(data) {
    removeMarkers();

    let subName = data;

    let stationInfo = await SubwayApi.getSubName(subName).catch((error) => console.log(error));
    //console.log(stationInfo)

    let subInfo = await SubwayApi.getSubInfo(stationInfo.stationID).catch((error) => console.log(error));
    console.log(subInfo)

    setStaInfo(subInfo)

    let subTime = await SubwayApi.getSubTime(stationInfo.stationID);
    console.log(subTime)

    //setSubTime(subTime)

    let points = [new kakao.maps.LatLng(stationInfo.y, stationInfo.x)];
    let bounds = new kakao.maps.LatLngBounds();

    let i, marker;
    for (i = 0; i < points.length; i++) {
      // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
      marker = new kakao.maps.Marker({ position: points[i], clickable: true });
      marker.setMap(map);
      setMarkers((current) => [...current, marker]);

      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(points[i]);

      var iwContent = stationInfo.stationName + "<br>" + stationInfo.laneName, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
      });
    }
    map.setBounds(bounds);

    function removeMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }
  }

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    subInfo();
  }, [map]);

  return {
    map, subName, markers, staInfo, subTime, toggleValue, 
    mapLoad, subInfo, submit, onChanged, onToggle
  }
}

export default useSubwayInfo;

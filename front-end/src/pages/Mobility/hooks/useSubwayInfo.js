import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { SubwayApi, SubwayTime } from "../../../api/OdsayApi";

function useSubwayInfo() {
  const [map, settingMap] = useState(null);
  const [subName, setSubName] = useState("");
  const [markers, setMarkers] = useState([]);

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
      console.log(e.target.value);
      setSubName(e.target.value);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    onChanged();
  }, [subName]);

  function submit(e) {
    e.preventDefault();
    console.log(subName);
    subInfo(subName);
  }

  async function subInfo(data) {
    removeMarkers();

    let subName = data;

    let stationInfo = await SubwayApi.getSubName(subName).catch((error) =>
      console.log(error)
    );
    // console.log(stationInfo)
    let subTime = await SubwayTime.getSubTime(stationInfo.stationID);

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

    function displayPlaces() {
      var listTime = subTime;

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        marker, places[i].place_name;

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listTime.appendChild(fragment);
    }
    displayPlaces.setMap(map);

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
    map, subName, markers, 
    mapLoad, subInfo, submit, onChanged
  }
}

export default useSubwayInfo;

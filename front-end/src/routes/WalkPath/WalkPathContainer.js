import { DoubleArrowOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WalkPathPresenter from './WalkPathPresenter';

function WalkPathContainer() {
  let map;
  let marker_s, marker_e, marker_p;
  let totalMarkerArr = [];
  let drawInfoArr = [];
  let resultdrawArr = [];

  const startSymbol = (startY, startX) => {
    marker_s = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(startY, startX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });
  };

  const endSymbol = (endY, endX) => {
    marker_e = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(endY, endX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });
  };

  const pedestrianPathSearch = async () => {
    try {
      const result = await axios.post(
        'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&appKey=' +
          process.env.REACT_APP_TMAP_API,
        {
          startX: '126.97871544',
          startY: '37.56689860',
          endX: '127.00160213',
          endY: '37.57081522',
          reqCoordType: 'WGS84GEO', // 기본값 좌표계 유형
          resCoordType: 'WGS84GEO', // 받고자 하는 응답 좌표계 유형, EPSG3857, WGS84GEO, KATECH
          startName: '출발지', // 출발지 명칭
          endName: '도착지', // 목적지 명칭
        }
      );
      return result.data;
    } catch (err) {
      const error = err.response.data.error;
      console.log(
        'code : ' +
          error.code +
          '\n' +
          'id : ' +
          error.id +
          '\n' +
          'message : ' +
          error.message
      );
      return error;
    }
  };

  const drawLine = (arrPoint) => {
    let polyline_;

    polyline_ = new Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: '#DD0000', // 라인 색상
      strokeWeight: 6, // 라인 두께
      strokeStyle: 'dash', // 선의 종류
      map: map, // 지도 객체
    });
    resultdrawArr.push(polyline_);
  };

  // 기존 그려진 라인 & 마커가 있다면 초기화
  const initMap = () => {
    if (resultdrawArr.length > 0) {
      for (var i in resultdrawArr) {
        resultdrawArr[i].setMap(null);
      }
      resultdrawArr = [];
    }
    drawInfoArr = [];
  };

  const drawMap = (path) => {
    let resultData = path.features;
    initMap();
    for (var i in resultData) {
      let geometry = resultData[i].geometry;
      let properties = resultData[i].properties;
      let polyline_;

      if (geometry.type == 'LineString') {
        for (var j in geometry.coordinates) {
          //
          let latlng = new Tmapv2.LatLng(
            geometry.coordinates[j][1],
            geometry.coordinates[j][0]
          );
          // 배열에 담기
          drawInfoArr.push(latlng);
        }
      } else {
        let markerImg = '';
        let pType = '';
        let size;

        if (properties.pointType == 'S') {
          // 출발지 마커
          markerImg =
            'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
          pType = 'S';
          size = new Tmapv2.Size(24, 38);
        } else if (properties.pointType == 'E') {
          // 도착지 마커
          markerImg =
            'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
          pType = 'E';
          size = new Tmapv2.Size(24, 38);
        } else {
          // 각 포인트 마커
          markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
          pType = 'P';
          size = new Tmapv2.Size(8, 8);
        }

        //Marker 추가
        marker_p = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(
            geometry.coordinates[0],
            geometry.coordinates[1]
          ),
          icon: markerImg,
          iconSize: size,
          map: map,
        });
      }
      drawLine(drawInfoArr);
    }
  };

  const findPath = async () => {
    // 시작, 도착 심볼찍기
    startSymbol(37.5668986, 126.97871544);
    endSymbol(37.57081522, 127.00160213);

    // 경로탐색 API 요청
    const path = await pedestrianPathSearch();
    if (path.id != undefined) return;
    console.log(path);

    // 받은 경로로 지도 그리기
    drawMap(path);
  };

  // 지도 띄우기
  const initTmap = () => {
    map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(37.570028, 126.989072),
      width: '100%',
      height: '400px',
      zoom: 15,
      zoomControl: true,
      scrollwheel: true,
    });
  };

  useEffect(() => {
    initTmap();
  }, []);

  return <WalkPathPresenter findPath={findPath}></WalkPathPresenter>;
}

export default WalkPathContainer;

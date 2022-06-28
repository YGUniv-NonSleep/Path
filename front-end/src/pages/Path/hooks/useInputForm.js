import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PathApi } from '../../../api/OdsayApi';
import MapApi from '../../../api/MapApi';
import { TmapApi } from '../../../api/TmapApi';
import useLoading from '../../../hooks/useLoading';
import axios from 'axios';
import scooter from '../../../assets/images/electric-scooter.png';
import clickScooter from '../../../assets/images/electric-scooter2.png';

function useInputForm() {
  const { loading } = useLoading();
  const userInfo = useSelector((state) => state.user);
  const [map, settingMap] = useState(null);

  const [jusoValue, setJusoValue] = useState([]); // 가져온 주소 받아서 띄워줄 배열 state
  const [way, setWay] = useState([]); // input 입력으로 찾은 경로

  const [SPoint, setSPoint] = useState(''); // 출발지 주소창
  const [APoint, setAPoint] = useState(''); // 도착지 주소창
  const [insertPoint, setInsertPoint] = useState(''); // 입력에 반응하는 창 state

  const [pathList, setPathList] = useState([]); // 검색된 경로 정보들
  const [historyList, setHistoryList] = useState([]); // 최근 검색 기록
  const [polyLineData, setPolyLineData] = useState([]); // 이동수단 경로 그래픽 데이터
  const [firstWalkLineData, setFirstWalkLineData] = useState([]); // 처음 도보 경로 그래픽 데이터
  const [firstMobilLineData, setFirstMobilLineData] = useState([]); // 처음 모빌리티 경로 그래픽 데이터
  const [lastWalkLineData, setLastWalkLineData] = useState([]); // 도보 경로 그래픽 데이터
  const [markerData, setMarkerData] = useState([]); // 마커 그래픽 데이터
  const [currentListNum, setCurrentListNum] = useState(''); // 현재 경로 리스트 중 선택한 번호
  const [markerMobil, setMarkerMobil] = useState([]);
  const [mobilOpen, setMobilOpen] = useState({
    firstMobilOpen: false,
    lastMobilOpen: false,
  });
  const [timer, setTimer] = useState(null); // 사용자 입력후 시간을 주기위한 타이머
  const { firstMobilOpen, lastMobilOpen } = mobilOpen;
  const [firstMobilClick, setFirstMobilClick] = useState({
    click: false,
    marker: null,
  }); // 퍼스널 모빌리티를 클릭했는가?

  // 카카오 지도를 불러오는 함수
  // MapApi 기능들 전부 함수화 시키기 호출할 때마다 필요 없는 것도 많이 호출 함.
  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap(
        new kakao.maps.LatLng(35.8953251, 128.62155)
      );
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
    } catch (error) {
      console.log(error);
    }
  }

  // 출발지를 저장하는 함수
  const onchangeSP = (e, sp) => {
    setInsertPoint(sp);
    setSPoint(sp);
  };

  // 도착지를 저장하는 함수
  const onchangeAP = (e, ap) => {
    setInsertPoint(ap);
    setAPoint(ap);
  };

  // 다시입력을 수행하는 함수
  const refreshPoints = (e) => {
    setInsertPoint('');
    setSPoint('');
    setAPoint('');
    setWay([]);
    setPathList([]);
    removeMarkers();
    removeGraphics();
    removeFirstWalkGraphics();
    removeLastWalkGraphics();
    getPathFindingHistory();
  };

  // 출발지 도착지 전환하는 함수
  const switchPoints = () => {
    console.log('switch');
    let temp = SPoint;
    setSPoint(APoint);
    setAPoint(temp);
  };

  // 키워드로 장소 검색
  function placeSearch() {
    if (insertPoint != '') {
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(insertPoint, function (result, status, pagination) {
        console.log(result);
        if (status === daum.maps.services.Status.OK) {
          let k = result.map((item) => {
            const data = {
              pN: item.place_name,
              aN: item.address_name,
            };
            return data;
          });
          setJusoValue([...k]);
        } else if (status == kakao.maps.services.Status.ZERO_RESULT) {
          console.log('검색 결과가 존재하지 않습니다.');
          return;
        } else if (status == kakao.maps.services.Status.ERROR) {
          console.log('검색 결과 중 오류가 발생했습니다.');
          return;
        }
      });
    } else return;
  }

  // 길찾기 버튼 누를 때 실행하는 함수
  function wayFind() {
    try {
      // input창 검색 데이터 초기화
      setWay([]);
      // 출발지, 도착지의 위도, 경도 얻음
      getKeywordLatLng([SPoint, APoint]); // 이친구들의 콜백이 끝나야 X, Y 좌표를 얻을 수 있음
    } catch (error) {
      console.log(error);
    }
  }

  // 사용자가 입력한 출발지와 도착지를 검색해서 way에 넣음
  async function getKeywordLatLng(data) {
    const ps = new kakao.maps.services.Places();

    for (var i = 0; i < data.length; i++) {
      let idx = data[i].indexOf('(');
      let string = data[i].substr(0, idx - 1);

      await ps.keywordSearch(string, function (result, status, pagination) {
        if (status === daum.maps.services.Status.OK) {
          let k = result.filter((item) => {
            return item.place_name === string;
          });
          setWay((cur) => [...cur, k[0]]);
        } else return console.log('몬가... 몬가... 잘못됨..');
      });
    }
  }

  function historyFind(histInfo) {
    try {
      // input창 검색 데이터 초기화
      setWay([]);

      // 출발지, 도착지의 위도, 경도 얻음
      historyKeywordLatLng(histInfo); // 이친구들의 콜백이 끝나야 X, Y 좌표를 얻을 수 있음
    } catch (error) {
      console.log(error);
    }
  }

  async function historyKeywordLatLng(data) {
    setWay((cur) => [
      ...cur,
      {
        x: data.startLng,
        y: data.startLat,
        id: data.startId,
        place_name: data.startName,
      },
    ]);
    setWay((cur) => [
      ...cur,
      {
        x: data.goalLng,
        y: data.goalLat,
        id: data.goalId,
        place_name: data.goalName,
      },
    ]);
    setSPoint(data.startName);
    setAPoint(data.goalName);
  }

  // 경로 검색
  async function pathSearch() {
    // === 서버에서 출발지와 도착지를 요청하고 노선 그래프 경로 가져오기 === //
    let searchType = 0;

    const pathData = await PathApi.getTransPath({
      sx: way[0].x,
      sy: way[0].y,
      ex: way[1].x,
      ey: way[1].y,
      searchPathType: searchType,
      // 0(지하철+버스), 1(지하철), 2(버스)
      // 나중에 정보 받을 예정
    }).catch((err) => {
      console.log(err);
      return;
    });

    console.log(pathData);

    let data = {
      start: way[0],
      end: way[1],
      type: searchType, // 나중에 유동이게 받음
    };
    savePathFindingHistory(data);

    // 여기서부터 화면 구성
    setPathList(pathData);
  }

  // SearchHistoryList -> 특정 장소 검색 키워드을 LocalStorage에 저장
  // SUBWAY_STATION(type) -> address, type, name, latitude: 37.~, longitude: 127.~
  // BUS(type) -> cityName, type, name

  // PathFindingHistoryList -> 검색한 경로 키워드를 LocalStorage에 저장
  // type -> ROUTE_TRANSIT, ROUTE_CAR, ROUTE_WALK, ROUTE_BICYCLE
  // goalLat, goalLng, goalName, startLat, startLng, startName, type

  function savePathFindingHistory(data) {
    let history = getPathFindingHistory();

    let info = {
      type: data.type,
      startId: data.start.id,
      startLat: data.start.y,
      startLng: data.start.x,
      startName: data.start.place_name,
      goalId: data.end.id,
      goalLat: data.end.y,
      goalLng: data.end.x,
      goalName: data.end.place_name,
    };

    // info 정보와 localHistory의 정보 중 type, startName, goalName 일치하면 제거하고 다시 저장
    for (let i = 0; i < history.length; i++) {
      if (
        history[i].type == info.type &&
        history[i].startId == info.startId &&
        history[i].goalId == info.goalId
      ) {
        // console.log('duplicated history');
        deletePathFindingHistory(info.type, info.startId, info.goalId);

        // delete가 실행되었을 때 history 갱신이 필요.
        history = getPathFindingHistory();
        break;
      }
    }

    history.push(info);
    localStorage.setItem('PathFindingHistoryList', JSON.stringify(history));
    getPathFindingHistory();
  }

  // 서버에서 받은 경로 그리기
  async function pathDrawing(idx) {
    setCurrentListNum(idx);
    if (idx == undefined) idx = 0;
    if (markerData.length != 0) removeMarkers();
    if (polyLineData != '') removeGraphics();
    if (firstWalkLineData.length != 0) removeFirstWalkGraphics();
    if (lastWalkLineData.length != 0) removeLastWalkGraphics();
    if (markerMobil.length != 0) removeMarkerMobil();

    // 나중에 pathList에서 출발지, 도착지 x, y 좌표 받아서 쓰기
    const sp = await MapApi().drawKakaoMarker(
      pathList[idx].startPos.x,
      pathList[idx].startPos.y
    );

    sp.setMap(map);
    setMarkerData((current) => [...current, sp]);

    const ap = await MapApi().drawKakaoMarker(
      pathList[idx].endPos.x,
      pathList[idx].endPos.y
    );
    ap.setMap(map);
    setMarkerData((current) => [...current, ap]);

    // pathList 얻어와서 polyline을 그리는 단계
    // 사용자의 입력(idx)에 따라 다른 polyline 드로잉
    const dkpl = MapApi().drawKakaoPolyLine(
      pathList[idx].routeGraphic.result.lane
    );
    // console.log(dkpl);

    dkpl.polyline.setMap(map);
    setPolyLineData(dkpl.polyline);

    // console.log(pathList[0].boundary) // 사용자의 입력(idx)에 따른 boundary 변화
    if (pathList[idx].routeGraphic.result.boundary) {
      let points = [
        new kakao.maps.LatLng(
          pathList[idx].startPos.y,
          pathList[idx].startPos.x
        ),
        new kakao.maps.LatLng(pathList[idx].endPos.y, pathList[idx].endPos.x),
      ];
      // points 실행순서 수정 필요

      for (var i = 0; i < dkpl.lineArray.length; i++) {
        points.push(
          new kakao.maps.LatLng(dkpl.lineArray[i].Ma, dkpl.lineArray[i].La)
        );
      }

      // 보행자 경로 생성 및 그리기
      createWalkPath(
        'first',
        pathList[idx].startPos.x,
        pathList[idx].startPos.y,
        points[2].La,
        points[2].Ma
      );

      createWalkPath(
        'last',
        points[points.length - 1].La,
        points[points.length - 1].Ma,
        pathList[idx].endPos.x,
        pathList[idx].endPos.y
      );

      // 사용자 지도 위치 영역에 맞추기
      let bounds = new kakao.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      map.setBounds(bounds);
    }
  }

  function removeMarkers() {
    for (var i = 0; i < markerData.length; i++) {
      markerData[i].setMap(null);
    }
    setMarkerData([]);
  }

  function removeGraphics() {
    polyLineData.setMap(null);
    setPolyLineData([]);
  }

  function removeFirstWalkGraphics() {
    for (let i = 0; i < firstWalkLineData.length; i++) {
      firstWalkLineData[i].setMap(null);
    }
    for (let i = 0; i < firstMobilLineData.length; i++) {
      firstMobilLineData[i].setMap(null);
    }
    setFirstWalkLineData([]);
    setFirstMobilLineData([]);
    console.log('============');
    console.log(firstWalkLineData);
  }

  function removeLastWalkGraphics() {
    lastWalkLineData[0].setMap(null);
    setLastWalkLineData([]);
    console.log('=======라스트워크====');
    console.log(lastWalkLineData);
  }

  // 보행자 경로 검색해서 지도에 그리기
  const createWalkPath = async (select, startX, startY, endX, endY) => {
    let walkCoordinate = [];

    let startPedestrianPath = await TmapApi.getPedestrianPath(
      startX,
      startY,
      endX,
      endY
    );

    for (var i in startPedestrianPath.features) {
      let geometry = startPedestrianPath.features[i].geometry;
      if (geometry.type == 'LineString') {
        for (var j in geometry.coordinates) {
          let latlng = new kakao.maps.LatLng(
            geometry.coordinates[j][1],
            geometry.coordinates[j][0]
          );
          walkCoordinate.push(latlng);
        }
      } else {
        walkCoordinate.push(
          new kakao.maps.LatLng(
            geometry.coordinates[1],
            geometry.coordinates[0]
          )
        );
      }
    }

    // 보행자 경로 그리기
    const walkResult = await MapApi().drawKakaoWalkPolyLine(walkCoordinate);
    walkResult.setMap(map);
    if (select == 'first') setFirstWalkLineData([walkResult]);
    else setLastWalkLineData([walkResult]);
  };

  let jusoOption = jusoValue.map((it) => {
    // console.log(it)
    return `${it.pN} (${it.aN})`;
  });

  function deletePathFindingHistory(type, startId, goalId) {
    if (localStorage.PathFindingHistoryList == undefined) return;
    let history = getPathFindingHistory();

    for (let i = 0; i < history.length; i++) {
      // type, startId, goalId 비교
      if (
        history[i].type == type &&
        history[i].startId == startId &&
        history[i].goalId == goalId
      ) {
        let idx = history.indexOf(history[i]);
        history.splice(idx, 1); // 1개만 제거 넣어야했네
      }
    }

    localStorage.setItem('PathFindingHistoryList', JSON.stringify(history));
    getPathFindingHistory();
  }

  function getPathFindingHistory() {
    const history = localStorage.getItem('PathFindingHistoryList'); // 읽기(key 정보)

    if (history == null) {
      return [];
    } else {
      setHistoryList(JSON.parse(history));
      return JSON.parse(history);
    }
  }

  const handleMobilOpen = (select) => {
    if (select == 'first')
      setMobilOpen({ ...mobilOpen, firstMobilOpen: !firstMobilOpen });
    else setMobilOpen({ ...mobilOpen, lastMobilOpen: !lastMobilOpen });
  };

  const removeMarkerMobil = async (marker) => {
    markerMobil.map((m) => {
      if (marker !== m) {
        m.setMap(null);
      }
    });
  };

  const firstPersonalMobility = async () => {
    if (currentListNum == '') setCurrentListNum('0');
    console.log(markerMobil);
    removeFirstWalkGraphics();
    handleMobilOpen('first');

    // 출발지점에서 500m내 퍼스널 모빌리티 위치 찾기
    const x = pathList[currentListNum].startPos.x; // 출발지점
    const y = pathList[currentListNum].startPos.y; // 출발지점
    const responseMobil = await getMobilities('ALL', x, y);

    console.log(responseMobil.data.body);
    const overImage = new kakao.maps.MarkerImage(
      scooter,
      new kakao.maps.Size(29, 40)
    );
    const normalImage = new kakao.maps.MarkerImage(
      scooter,
      new kakao.maps.Size(24, 35)
    );
    const clickImage = new kakao.maps.MarkerImage(
      clickScooter,
      new kakao.maps.Size(29, 40)
    );

    for (var i = 0; i < responseMobil.data.body.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(
          responseMobil.data.body[i].latitude,
          responseMobil.data.body[i].longitude
        ),
        image: normalImage,
      });
      var infowindow = new kakao.maps.InfoWindow({
        content: `<br><div>모빌리티 : ${responseMobil.data.body[i].id}번</div>
                  <div>타입 : ${responseMobil.data.body[i].type}</div><br> `,
      });

      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow, overImage)
      );

      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(marker, infowindow, normalImage)
      );

      kakao.maps.event.addListener(
        marker,
        'click',
        makeClickListener(
          responseMobil.data.body[i].id,
          marker,
          normalImage,
          clickImage
        )
      );
      setMarkerMobil((prev) => [...prev, marker]);
    }
  };

  const makeOverListener = (map, marker, infowindow, overImage) => {
    return () => {
      infowindow.open(map, marker);
      marker.setImage(overImage);
    };
  };

  const makeOutListener = (marker, infowindow, normalImage) => {
    return () => {
      infowindow.close();
      marker.setImage(normalImage);
    };
  };

  const makeClickListener = (id, marker, normalImage, clickImage) => {
    return () => {
      setFirstMobilClick({ click: true, marker: marker });
      marker.setImage(clickImage);
      usePersonalMobility(id, 'first');
    };
  };

  // 퍼스널 모빌리티 경로 조회 및 그리기
  const usePersonalMobility = (id, select) => {
    if (select == 'first') {
      // 처음에 타기
      createWalkMobilPath(
        'first',
        pathList[currentListNum].startPos.x,
        pathList[currentListNum].startPos.y,
        pathList[currentListNum].startStation.x,
        pathList[currentListNum].startStation.y,
        id
      );
    } else if (select == 'last') {
      // 마지막에만 타기
    }
  };

  const [mobilities, setMobilities] = useState([]);
  // 도보를 퍼스널모빌리티 타는 경로 조회 및 그리기
  const createWalkMobilPath = async (
    select,
    startX,
    startY,
    endX,
    endY,
    mobilId
  ) => {
    let walkCoordinate = [];
    let mobilityCoordinate = [];

    const mobilityPath = await TmapApi.getMobilityPath(
      startX,
      startY,
      endX,
      endY,
      mobilId
    );
    console.log(mobilityPath);

    // mobilityPath.firstPath : 도보 경로
    // mobilityPath.lastPath : 퍼스널 모빌리티 경로
    for (let i = 0; i < mobilityPath.firstPath.graphPos.length; i++) {
      let latlng = new kakao.maps.LatLng(
        mobilityPath.firstPath.graphPos[i][1],
        mobilityPath.firstPath.graphPos[i][0]
      );
      walkCoordinate.push(latlng);
    }

    for (let i = 0; i < mobilityPath.lastPath.graphPos.length; i++) {
      let latlng = new kakao.maps.LatLng(
        mobilityPath.lastPath.graphPos[i][1],
        mobilityPath.lastPath.graphPos[i][0]
      );
      mobilityCoordinate.push(latlng);
    }

    console.log(walkCoordinate);
    console.log('보행자 경로 좌표 생성 완료');
    console.log(mobilityCoordinate);
    console.log('모빌리티 경로 좌표 생성 완료');

    const walkResult = await MapApi().drawKakaoWalkPolyLine(walkCoordinate);
    walkResult.setMap(map);
    const mobilResult = await MapApi().drawKakaoMobilPolyLine(
      mobilityCoordinate
    );
    mobilResult.setMap(map);
    if (select === 'first') {
      console.log('first 에 저장시작함');
      setFirstWalkLineData([walkResult]);
      setFirstMobilLineData([mobilResult]);
    } else setLastWalkLineData([walkResult, mobilResult]);
  };
  console.log(firstWalkLineData);
  console.log(lastWalkLineData);

  // x,y 좌표값 약 500m 내 퍼스널 모빌리티 조회
  const getMobilities = async (type, x, y) => {
    const data = {
      x: x,
      y: y,
      type: type,
    };
    const response = await axios
      .get(process.env.REACT_APP_SPRING_API + '/api/mobilities', {
        params: data,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    return response;
  };

  // 처음 접속시 세팅 Effect Hook
  useEffect(() => {
    if (map == null) {
      mapLoad();
      getPathFindingHistory();
    }
  }, []);

  // 장소 검색 로직
  useEffect(() => {
    try {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          placeSearch();
        }, 500)
      );
    } catch (error) {
      console.log(error);
    }
  }, [insertPoint]);

  // 사용자가 길찾기 버튼을 누르고 way에 출발지와 도착지 값이 담겼을 때 길찾기 함수 실행
  useEffect(() => {
    if (way.length == 2) {
      // 출발지, 도착지의 위도, 경도를 통한 경로 검색
      pathSearch().catch(
        (err) => console.log('경로 검색에 문제가 발생하였습니다.\n') + err
      );
    } else return;
  }, [way]);

  // 서버에서 경로를 받아왔을 때 실행
  useEffect(() => {
    if (pathList.length != 0) {
      // 검색된 경로 리스트를 토대로 경로를 드로잉
      pathDrawing().catch((err) =>
        console.log('경로 리스트를 받아오는데 문제가 발생하였습니다.\n' + err)
      );
    } else return;
  }, [pathList]);

  // 퍼스널 모빌리티를 클릭했다면 나머지 마커 삭제
  useEffect(() => {
    if (firstMobilClick.click == true) {
      removeMarkerMobil(firstMobilClick.marker);
    }
  }, [firstMobilClick]);

  return {
    map,
    way,
    polyLineData,
    markerData,
    loading,
    jusoValue,
    SPoint,
    APoint,
    insertPoint,
    jusoOption,
    pathList,
    historyList,
    userInfo,
    mapLoad,
    onchangeSP,
    onchangeAP,
    refreshPoints,
    switchPoints,
    placeSearch,
    getKeywordLatLng,
    wayFind,
    pathSearch,
    pathDrawing,
    createWalkPath,
    removeMarkers,
    removeGraphics,
    removeFirstWalkGraphics,
    removeLastWalkGraphics,
    savePathFindingHistory,
    getPathFindingHistory,
    deletePathFindingHistory,
    historyFind,
    historyKeywordLatLng,
    mobilOpen,
    handleMobilOpen,
    firstPersonalMobility,
  };
}

export default useInputForm;

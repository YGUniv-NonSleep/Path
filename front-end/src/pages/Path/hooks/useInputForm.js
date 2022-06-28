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

    // const pathData = await PathApi.getTransPath({
    //   sx: way[0].x,
    //   sy: way[0].y,
    //   ex: way[1].x,
    //   ey: way[1].y,
    //   searchPathType: searchType,
    //   // 0(지하철+버스), 1(지하철), 2(버스)
    //   // 나중에 정보 받을 예정
    // }).catch((err) => {
    //   console.log(err);
    //   return;
    // });

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

var pathData = [
  {
    pathType: 2,
    totalTime: 18,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.626964,
      y: 35.879132,
    },
    endStation: {
      lastEndStation: '영진고등학교앞',
      x: 128.621413,
      y: 35.892906,
    },
    stationNames: [
      [
        '동대구역',
        '파티마병원건너2',
        '신암보성아파트건너',
        '복현네거리',
        '영진고등학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 0,
    routeSection: [
      { type: 3, sectionTime: 2 },
      { type: 2, sectionTime: 10, busNo: ['413'] },
      { type: 3, sectionTime: 6 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 11,
            section: [
              {
                graphPos: [
                  { x: 128.62696436881345, y: 35.87913154167874 },
                  { x: 128.6270001548305, y: 35.87945582949357 },
                  { x: 128.6270801680778, y: 35.8797708726951 },
                  { x: 128.6270158565984, y: 35.880041604977045 },
                  { x: 128.62691846324458, y: 35.8803305366475 },
                  { x: 128.6267984217378, y: 35.880556494322555 },
                  { x: 128.6266449420997, y: 35.88075558712819 },
                  { x: 128.62646917004994, y: 35.88093676987388 },
                  { x: 128.62616156704215, y: 35.881253839066076 },
                  { x: 128.62601851951712, y: 35.881371757828866 },
                  { x: 128.6260087241961, y: 35.88153404645248 },
                  { x: 128.62597670816783, y: 35.88168743793887 },
                  { x: 128.62504258944193, y: 35.88261165871519 },
                  { x: 128.62504258944193, y: 35.88261165871519 },
                  { x: 128.62473504525687, y: 35.882937737108016 },
                  { x: 128.6246583716101, y: 35.88304629504711 },
                  { x: 128.62463693091718, y: 35.88313653870054 },
                  { x: 128.6246266361185, y: 35.883235737449716 },
                  { x: 128.6246607832747, y: 35.88335273094959 },
                  { x: 128.62472787191703, y: 35.883433499969094 },
                  { x: 128.62490599506924, y: 35.88354974281001 },
                  { x: 128.62572974146437, y: 35.884077222996645 },
                  { x: 128.62678714561787, y: 35.884738673468625 },
                  { x: 128.6268988232712, y: 35.884855260784384 },
                  { x: 128.62694390735305, y: 35.88495417000187 },
                  { x: 128.62694461930144, y: 35.88504429814188 },
                  { x: 128.62692310951124, y: 35.88512552933893 },
                  { x: 128.6268683026377, y: 35.88519792151271 },
                  { x: 128.62676969272104, y: 35.8853336350511 },
                  { x: 128.6261325868417, y: 35.886003941030296 },
                  { x: 128.62592407350533, y: 35.88624838623058 },
                  { x: 128.62573749663954, y: 35.88646567697687 },
                  { x: 128.6255952207306, y: 35.88668273618456 },
                  { x: 128.62523377678392, y: 35.88719837391646 },
                  { x: 128.6251028577769, y: 35.887451426011864 },
                  { x: 128.6251028577769, y: 35.887451426011864 },
                  { x: 128.62499458608687, y: 35.887767452135215 },
                  { x: 128.62492010841055, y: 35.88815540739632 },
                  { x: 128.62461217894634, y: 35.889842477691154 },
                  { x: 128.62434577585975, y: 35.89117781648815 },
                  { x: 128.62431403666943, y: 35.89136725859101 },
                  { x: 128.6242707957067, y: 35.89150268152857 },
                  { x: 128.6242051895231, y: 35.891611181411946 },
                  { x: 128.62410621278855, y: 35.89170182869985 },
                  { x: 128.62390769169465, y: 35.8918110205626 },
                  { x: 128.62390769169465, y: 35.8918110205626 },
                  { x: 128.6224616572067, y: 35.892449462848504 },
                  { x: 128.62181034491812, y: 35.89273225271843 },
                  { x: 128.62141293771808, y: 35.89290556454816 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.62141293771808,
          top: 35.89290556454816,
          right: 128.6270801680778,
          bottom: 35.87913154167874,
        },
      },
    },
  },
  {
    pathType: 2,
    totalTime: 23,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.626964,
      y: 35.879132,
    },
    endStation: {
      lastEndStation: '영진고등학교앞',
      x: 128.621413,
      y: 35.892906,
    },
    stationNames: [
      [
        '동대구역',
        '동대구맨션',
        '평화시장(닭똥집골목)앞',
        '공고네거리1',
        '신암초등학교건너',
        '경북대학교정문건너',
        '경북대학교경상대학건너',
        '경진초등학교건너',
        '영진고등학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 0,
    routeSection: [
      { type: 3, sectionTime: 2 },
      { type: 2, sectionTime: 15, busNo: ['937'] },
      { type: 3, sectionTime: 6 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 11,
            section: [
              {
                graphPos: [
                  { x: 128.62696436881345, y: 35.87913154167874 },
                  { x: 128.62700065313825, y: 35.87951891924925 },
                  { x: 128.62704787000462, y: 35.879888213198285 },
                  { x: 128.62701614135872, y: 35.88007765626243 },
                  { x: 128.62696183626818, y: 35.88021313825272 },
                  { x: 128.6268748765701, y: 35.880420896562555 },
                  { x: 128.62671082083395, y: 35.880683137122425 },
                  { x: 128.62620551047863, y: 35.88120854351494 },
                  { x: 128.62602973643325, y: 35.881389725623954 },
                  { x: 128.62575684642215, y: 35.88189588947704 },
                  { x: 128.62575684642215, y: 35.88189588947704 },
                  { x: 128.62462528849838, y: 35.88306449385465 },
                  { x: 128.6244713022652, y: 35.8832004941564 },
                  { x: 128.6242619403573, y: 35.88333678271204 },
                  { x: 128.62404100664742, y: 35.88341003882496 },
                  { x: 128.62377534732974, y: 35.88342944818269 },
                  { x: 128.62334264198998, y: 35.88333255441605 },
                  { x: 128.62238821031576, y: 35.883085145369144 },
                  { x: 128.62140048901574, y: 35.882828888115476 },
                  { x: 128.62140048901574, y: 35.882828888115476 },
                  { x: 128.62004638592032, y: 35.882457347259596 },
                  { x: 128.61946957579337, y: 35.88234315854495 },
                  { x: 128.61914791150107, y: 35.8822817283739 },
                  { x: 128.6187153583225, y: 35.882202843466224 },
                  { x: 128.61828266556753, y: 35.88210593132495 },
                  { x: 128.6170071635309, y: 35.88186914846177 },
                  { x: 128.61611963704314, y: 35.881675424085294 },
                  { x: 128.61611963704314, y: 35.881675424085294 },
                  { x: 128.61492167152147, y: 35.881438220365595 },
                  { x: 128.61436709509704, y: 35.881332906176304 },
                  { x: 128.61424520286042, y: 35.88132451776859 },
                  { x: 128.61409029552553, y: 35.88134333800632 },
                  { x: 128.61392452246923, y: 35.88138925330219 },
                  { x: 128.61299632897476, y: 35.881664400445196 },
                  { x: 128.61222262086426, y: 35.88186664575898 },
                  { x: 128.612145444462, y: 35.88191210598107 },
                  { x: 128.61213478666002, y: 35.88196623961229 },
                  { x: 128.61214627858806, y: 35.88202026010727 },
                  { x: 128.61222477596644, y: 35.88214604391242 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61384945520075, y: 35.8845712961745 },
                  { x: 128.61407214516873, y: 35.8847233796121 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61513969961766, y: 35.88527672265605 },
                  { x: 128.61522879124703, y: 35.88533935766737 },
                  { x: 128.61535145843715, y: 35.88544688617553 },
                  { x: 128.61539617913212, y: 35.885500735691096 },
                  { x: 128.61546346997557, y: 35.885608548429445 },
                  { x: 128.61555368073056, y: 35.885815388509 },
                  { x: 128.6156216712034, y: 35.88601332946794 },
                  { x: 128.61575772311554, y: 35.88641822407178 },
                  { x: 128.61589391633623, y: 35.88684114414085 },
                  { x: 128.61601868562857, y: 35.88721905679798 },
                  { x: 128.61615390196107, y: 35.88751579688736 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.6165697224841, y: 35.88828879236268 },
                  { x: 128.616961087055, y: 35.88876447703431 },
                  { x: 128.61732981378327, y: 35.88917718469258 },
                  { x: 128.61753037157996, y: 35.88932937551985 },
                  { x: 128.61779759604804, y: 35.88950826188987 },
                  { x: 128.61852118278904, y: 35.88997321495803 },
                  { x: 128.61863292617227, y: 35.89009882272532 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.62203941518146, y: 35.89228040498178 },
                  { x: 128.62211793847752, y: 35.89240618185098 },
                  { x: 128.62210792217306, y: 35.89254143151782 },
                  { x: 128.62198700118117, y: 35.89265923051415 },
                  { x: 128.62141293771808, y: 35.89290556454816 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.61213478666002,
          top: 35.89290556454816,
          right: 128.62704787000462,
          bottom: 35.87913154167874,
        },
      },
    },
  },
  {
    pathType: 2,
    totalTime: 28,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '전기안전공사건너',
      x: 128.634933,
      y: 35.883975,
    },
    endStation: {
      lastEndStation: '영진고등학교앞',
      x: 128.621413,
      y: 35.892906,
    },
    stationNames: [
      [
        '전기안전공사건너',
        '큰고개오거리1',
        '국립신암선열공원앞',
        '복현푸르지오아파트앞',
        '복현네거리',
        '영진고등학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 0,
    routeSection: [
      { type: 3, sectionTime: 12 },
      { type: 2, sectionTime: 10, busNo: ['순환3-1'] },
      { type: 3, sectionTime: 6 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 13,
            section: [
              {
                graphPos: [
                  { x: 128.63493273081812, y: 35.88397474222963 },
                  { x: 128.63382307055392, y: 35.88509825043064 },
                  { x: 128.63338322503841, y: 35.88549715576676 },
                  { x: 128.632128392066, y: 35.88647720447105 },
                  { x: 128.63227158309326, y: 35.88637730413653 },
                  { x: 128.62896873694123, y: 35.88889133458079 },
                  { x: 128.62896873694123, y: 35.88889133458079 },
                  { x: 128.6279338168886, y: 35.889680908293684 },
                  { x: 128.6273284896006, y: 35.8901707901698 },
                  { x: 128.62705329951996, y: 35.890388546676974 },
                  { x: 128.6267335902281, y: 35.89057949585218 },
                  { x: 128.6267335902281, y: 35.89057949585218 },
                  { x: 128.6265018474394, y: 35.89068886573046 },
                  { x: 128.62615955672555, y: 35.89082585236198 },
                  { x: 128.62568499136842, y: 35.8910446473114 },
                  { x: 128.62390769169465, y: 35.8918110205626 },
                  { x: 128.62390769169465, y: 35.8918110205626 },
                  { x: 128.6224616572067, y: 35.892449462848504 },
                  { x: 128.62181034491812, y: 35.89273225271843 },
                  { x: 128.62141293771808, y: 35.89290556454816 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.62141293771808,
          top: 35.89290556454816,
          right: 128.63493273081812,
          bottom: 35.88397474222963,
        },
      },
    },
  },
  {
    pathType: 2,
    totalTime: 28,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '큰고개오거리1',
      x: 128.632272,
      y: 35.886377,
    },
    endStation: {
      lastEndStation: '영진고등학교앞',
      x: 128.621413,
      y: 35.892906,
    },
    stationNames: [
      [
        '큰고개오거리1',
        '국립신암선열공원앞',
        '복현푸르지오아파트앞',
        '복현네거리',
        '영진고등학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 0,
    routeSection: [
      { type: 3, sectionTime: 13 },
      { type: 2, sectionTime: 9, busNo: ['836', '323-1'] },
      { type: 3, sectionTime: 6 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 11,
            section: [
              {
                graphPos: [
                  { x: 128.63227158309326, y: 35.88637730413653 },
                  { x: 128.62896873694123, y: 35.88889133458079 },
                  { x: 128.62896873694123, y: 35.88889133458079 },
                  { x: 128.6279338168886, y: 35.889680908293684 },
                  { x: 128.6273284896006, y: 35.8901707901698 },
                  { x: 128.62705329951996, y: 35.890388546676974 },
                  { x: 128.6267335902281, y: 35.89057949585218 },
                  { x: 128.6267335902281, y: 35.89057949585218 },
                  { x: 128.6265018474394, y: 35.89068886573046 },
                  { x: 128.62615955672555, y: 35.89082585236198 },
                  { x: 128.62568499136842, y: 35.8910446473114 },
                  { x: 128.62390769169465, y: 35.8918110205626 },
                  { x: 128.62390769169465, y: 35.8918110205626 },
                  { x: 128.6224616572067, y: 35.892449462848504 },
                  { x: 128.62181034491812, y: 35.89273225271843 },
                  { x: 128.62141293771808, y: 35.89290556454816 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.62141293771808,
          top: 35.89290556454816,
          right: 128.63227158309326,
          bottom: 35.88637730413653,
        },
      },
    },
  },
  {
    pathType: 3,
    totalTime: 33,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.627482,
      y: 35.877407,
    },
    endStation: {
      lastEndStation: '영진고등학교앞',
      x: 128.621413,
      y: 35.892906,
    },
    stationNames: [
      ['동대구역', '신천'],
      [
        '신천역(5번출구)',
        '동신초등학교건너',
        '신암초등학교건너',
        '경북대학교정문건너',
        '경북대학교경상대학건너',
        '경진초등학교건너',
        '영진고등학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 1,
    routeSection: [
      { type: 3, sectionTime: 3 },
      { type: 1, sectionTime: 9, subwayName: ['대구 1호선'] },
      { type: 3, sectionTime: 2 },
      { type: 2, sectionTime: 13, busNo: ['410-1'] },
      { type: 3, sectionTime: 6 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 41,
            section: [
              {
                graphPos: [
                  { x: 128.62748240642588, y: 35.87741632342043 },
                  { x: 128.6269586449293, y: 35.87700445717928 },
                  { x: 128.62671351968, y: 35.876816461969746 },
                  { x: 128.6265466966362, y: 35.87672720214763 },
                  { x: 128.62633550648854, y: 35.87662916074593 },
                  { x: 128.62616896859666, y: 35.8765759517003 },
                  { x: 128.62288531040585, y: 35.875862992116055 },
                  { x: 128.6192465014192, y: 35.87504361936133 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                ],
              },
            ],
            class: 2,
          },
          {
            type: 11,
            section: [
              {
                graphPos: [
                  { x: 128.61820715579898, y: 35.87383220173777 },
                  { x: 128.61789057707037, y: 35.874419692662975 },
                  { x: 128.61717000508764, y: 35.8757483465537 },
                  { x: 128.6160781331415, y: 35.87775489536911 },
                  { x: 128.61545577390496, y: 35.87890276960294 },
                  { x: 128.61545577390496, y: 35.87890276960294 },
                  { x: 128.61435322997966, y: 35.88097244929414 },
                  { x: 128.61426595742407, y: 35.88114414741696 },
                  { x: 128.61414525098127, y: 35.881288977210836 },
                  { x: 128.61403499137973, y: 35.88135263456914 },
                  { x: 128.61384720811103, y: 35.8814166889237 },
                  { x: 128.61239947077183, y: 35.88182067620509 },
                  { x: 128.6121564498073, y: 35.881903036568374 },
                  { x: 128.61213478666002, y: 35.88196623961229 },
                  { x: 128.61214634809875, y: 35.882029272951044 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61384945520075, y: 35.8845712961745 },
                  { x: 128.61407214516873, y: 35.8847233796121 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61513969961766, y: 35.88527672265605 },
                  { x: 128.61522879124703, y: 35.88533935766737 },
                  { x: 128.61535145843715, y: 35.88544688617553 },
                  { x: 128.61539617913212, y: 35.885500735691096 },
                  { x: 128.61546346997557, y: 35.885608548429445 },
                  { x: 128.61555368073056, y: 35.885815388509 },
                  { x: 128.6156216712034, y: 35.88601332946794 },
                  { x: 128.61575772311554, y: 35.88641822407178 },
                  { x: 128.61589391633623, y: 35.88684114414085 },
                  { x: 128.61601868562857, y: 35.88721905679798 },
                  { x: 128.61615390196107, y: 35.88751579688736 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.6165697224841, y: 35.88828879236268 },
                  { x: 128.616961087055, y: 35.88876447703431 },
                  { x: 128.61732981378327, y: 35.88917718469258 },
                  { x: 128.61753037157996, y: 35.88932937551985 },
                  { x: 128.61779759604804, y: 35.88950826188987 },
                  { x: 128.61852118278904, y: 35.88997321495803 },
                  { x: 128.61863292617227, y: 35.89009882272532 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.62203941518146, y: 35.89228040498178 },
                  { x: 128.62211793847752, y: 35.89240618185098 },
                  { x: 128.62210792217306, y: 35.89254143151782 },
                  { x: 128.62198700118117, y: 35.89265923051415 },
                  { x: 128.62141293771808, y: 35.89290556454816 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.61213478666002,
          top: 35.89290556454816,
          right: 128.62748240642588,
          bottom: 35.87383220173777,
        },
      },
    },
  },
  {
    pathType: 3,
    totalTime: 35,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.627482,
      y: 35.877407,
    },
    endStation: {
      lastEndStation: '영진고등학교앞',
      x: 128.621413,
      y: 35.892906,
    },
    stationNames: [
      ['동대구역', '신천', '칠성시장'],
      [
        '칠성시장역(서문프라자앞)',
        '신암2동우체국',
        '강남약국앞1',
        '신암초등학교건너',
        '경북대학교정문건너',
        '경북대학교경상대학건너',
        '경진초등학교건너',
        '영진고등학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 1,
    routeSection: [
      { type: 3, sectionTime: 3 },
      { type: 1, sectionTime: 11, subwayName: ['대구 1호선'] },
      { type: 3, sectionTime: 1 },
      { type: 2, sectionTime: 14, busNo: ['북구2'] },
      { type: 3, sectionTime: 6 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 41,
            section: [
              {
                graphPos: [
                  { x: 128.62748240642588, y: 35.87741632342043 },
                  { x: 128.6269586449293, y: 35.87700445717928 },
                  { x: 128.62671351968, y: 35.876816461969746 },
                  { x: 128.6265466966362, y: 35.87672720214763 },
                  { x: 128.62633550648854, y: 35.87662916074593 },
                  { x: 128.62616896859666, y: 35.8765759517003 },
                  { x: 128.62288531040585, y: 35.875862992116055 },
                  { x: 128.6192465014192, y: 35.87504361936133 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                  { x: 128.6161283733491, y: 35.87423948688319 },
                  { x: 128.61568458339576, y: 35.8741336088719 },
                  { x: 128.61534094734344, y: 35.87409030753287 },
                  { x: 128.61433232831183, y: 35.8739783097824 },
                  { x: 128.61367869846163, y: 35.87394560538026 },
                  { x: 128.61274808642585, y: 35.873896287350576 },
                  { x: 128.61207272718957, y: 35.873917764555635 },
                  { x: 128.6113646320977, y: 35.87400249742924 },
                  { x: 128.6108226419982, y: 35.874086379721014 },
                  { x: 128.61035858293323, y: 35.874223942002764 },
                  { x: 128.609562930695, y: 35.8744443082992 },
                  { x: 128.60905484849704, y: 35.87461814229082 },
                  { x: 128.60808380135052, y: 35.875073733481734 },
                  { x: 128.60691423820268, y: 35.875638480802074 },
                  { x: 128.60638433863977, y: 35.87585748006061 },
                  { x: 128.6061522657987, y: 35.875921746486945 },
                  { x: 128.60512396046562, y: 35.87613424667752 },
                ],
              },
            ],
            class: 2,
          },
          {
            type: 12,
            section: [
              {
                graphPos: [
                  { x: 128.6050563482883, y: 35.87598136343905 },
                  { x: 128.60556499812574, y: 35.87587964914266 },
                  { x: 128.60587486462322, y: 35.87585104345265 },
                  { x: 128.60611842438058, y: 35.87584079873703 },
                  { x: 128.60627373603728, y: 35.87587606602578 },
                  { x: 128.60638502706536, y: 35.87594760868752 },
                  { x: 128.6065082186246, y: 35.87612724955006 },
                  { x: 128.60688000149065, y: 35.876954582850786 },
                  { x: 128.6069585543889, y: 35.87708938319305 },
                  { x: 128.6072041859199, y: 35.87734952202715 },
                  { x: 128.60737119585147, y: 35.877465847477204 },
                  { x: 128.60801598731226, y: 35.87778705354004 },
                  { x: 128.60801598731226, y: 35.87778705354004 },
                  { x: 128.6095610577392, y: 35.878527301256604 },
                  { x: 128.6098504459772, y: 35.87871510635808 },
                  { x: 128.61008446336635, y: 35.87890319262699 },
                  { x: 128.6104755345229, y: 35.8793518614525 },
                  { x: 128.6104755345229, y: 35.8793518614525 },
                  { x: 128.6110566122643, y: 35.88002489039265 },
                  { x: 128.6112795617463, y: 35.880213030691905 },
                  { x: 128.61150216511538, y: 35.880356106324456 },
                  { x: 128.6117244219879, y: 35.880454117299195 },
                  { x: 128.6120574955789, y: 35.88056057516974 },
                  { x: 128.61387666840668, y: 35.88092982527098 },
                  { x: 128.61405449138485, y: 35.881010033094846 },
                  { x: 128.61409997569655, y: 35.88116302442647 },
                  { x: 128.61404564781014, y: 35.881298500777255 },
                  { x: 128.6138692879754, y: 35.8814075626309 },
                  { x: 128.61278639445362, y: 35.881728566444366 },
                  { x: 128.61215631078426, y: 35.88188501088049 },
                  { x: 128.61214627858806, y: 35.88202026010727 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61384945520075, y: 35.8845712961745 },
                  { x: 128.61407214516873, y: 35.8847233796121 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61513969961766, y: 35.88527672265605 },
                  { x: 128.61522879124703, y: 35.88533935766737 },
                  { x: 128.61535145843715, y: 35.88544688617553 },
                  { x: 128.61539617913212, y: 35.885500735691096 },
                  { x: 128.61546346997557, y: 35.885608548429445 },
                  { x: 128.61555368073056, y: 35.885815388509 },
                  { x: 128.6156216712034, y: 35.88601332946794 },
                  { x: 128.61575772311554, y: 35.88641822407178 },
                  { x: 128.61589391633623, y: 35.88684114414085 },
                  { x: 128.61601868562857, y: 35.88721905679798 },
                  { x: 128.61615390196107, y: 35.88751579688736 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.6165697224841, y: 35.88828879236268 },
                  { x: 128.616961087055, y: 35.88876447703431 },
                  { x: 128.61732981378327, y: 35.88917718469258 },
                  { x: 128.61753037157996, y: 35.88932937551985 },
                  { x: 128.61779759604804, y: 35.88950826188987 },
                  { x: 128.61852118278904, y: 35.88997321495803 },
                  { x: 128.61863292617227, y: 35.89009882272532 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.62203941518146, y: 35.89228040498178 },
                  { x: 128.62211793847752, y: 35.89240618185098 },
                  { x: 128.62210792217306, y: 35.89254143151782 },
                  { x: 128.62198700118117, y: 35.89265923051415 },
                  { x: 128.62141293771808, y: 35.89290556454816 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.6050563482883,
          top: 35.89290556454816,
          right: 128.62748240642588,
          bottom: 35.873896287350576,
        },
      },
    },
  },
  {
    pathType: 3,
    totalTime: 35,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.627482,
      y: 35.877407,
    },
    endStation: {
      lastEndStation: '영진전문대학교정문건너',
      x: 128.623826,
      y: 35.894074,
    },
    stationNames: [
      ['동대구역', '신천', '칠성시장'],
      [
        '칠성시장역(서문프라자앞)',
        '신천LH아파트건너',
        '동신초등학교건너',
        '신암초등학교건너',
        '경북대학교정문건너',
        '경북대학교경상대학건너',
        '경진초등학교건너',
        '영진전문대학교정문건너',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 1,
    routeSection: [
      { type: 3, sectionTime: 3 },
      { type: 1, sectionTime: 11, subwayName: ['대구 1호선'] },
      { type: 3, sectionTime: 1 },
      { type: 2, sectionTime: 16, busNo: ['동구2(북구청방면)'] },
      { type: 3, sectionTime: 4 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 41,
            section: [
              {
                graphPos: [
                  { x: 128.62748240642588, y: 35.87741632342043 },
                  { x: 128.6269586449293, y: 35.87700445717928 },
                  { x: 128.62671351968, y: 35.876816461969746 },
                  { x: 128.6265466966362, y: 35.87672720214763 },
                  { x: 128.62633550648854, y: 35.87662916074593 },
                  { x: 128.62616896859666, y: 35.8765759517003 },
                  { x: 128.62288531040585, y: 35.875862992116055 },
                  { x: 128.6192465014192, y: 35.87504361936133 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                  { x: 128.6161283733491, y: 35.87423948688319 },
                  { x: 128.61568458339576, y: 35.8741336088719 },
                  { x: 128.61534094734344, y: 35.87409030753287 },
                  { x: 128.61433232831183, y: 35.8739783097824 },
                  { x: 128.61367869846163, y: 35.87394560538026 },
                  { x: 128.61274808642585, y: 35.873896287350576 },
                  { x: 128.61207272718957, y: 35.873917764555635 },
                  { x: 128.6113646320977, y: 35.87400249742924 },
                  { x: 128.6108226419982, y: 35.874086379721014 },
                  { x: 128.61035858293323, y: 35.874223942002764 },
                  { x: 128.609562930695, y: 35.8744443082992 },
                  { x: 128.60905484849704, y: 35.87461814229082 },
                  { x: 128.60808380135052, y: 35.875073733481734 },
                  { x: 128.60691423820268, y: 35.875638480802074 },
                  { x: 128.60638433863977, y: 35.87585748006061 },
                  { x: 128.6061522657987, y: 35.875921746486945 },
                  { x: 128.60512396046562, y: 35.87613424667752 },
                ],
              },
            ],
            class: 2,
          },
          {
            type: 12,
            section: [
              {
                graphPos: [
                  { x: 128.6050563482883, y: 35.87598136343905 },
                  { x: 128.6059296156366, y: 35.87576964775724 },
                  { x: 128.60644844191572, y: 35.87555070652994 },
                  { x: 128.60740877526442, y: 35.87514024888073 },
                  { x: 128.6076517117481, y: 35.87504888532071 },
                  { x: 128.60783927817914, y: 35.8749578020959 },
                  { x: 128.6080710016553, y: 35.87484846813352 },
                  { x: 128.60872159648147, y: 35.874484637125086 },
                  { x: 128.6092399224432, y: 35.87420259392574 },
                  { x: 128.610298710708, y: 35.87363838811378 },
                  { x: 128.61049727514146, y: 35.87353823153267 },
                  { x: 128.61070705140432, y: 35.873456043921166 },
                  { x: 128.6108728792674, y: 35.87341914600696 },
                  { x: 128.61110535711788, y: 35.87340894769412 },
                  { x: 128.61142663251277, y: 35.873425335614755 },
                  { x: 128.61162623641798, y: 35.873460370050196 },
                  { x: 128.61387781680747, y: 35.8739175460769 },
                  { x: 128.61387781680747, y: 35.8739175460769 },
                  { x: 128.61402198454078, y: 35.87394384722636 },
                  { x: 128.6147970069651, y: 35.873921847890436 },
                  { x: 128.61533975985893, y: 35.87393708907481 },
                  { x: 128.6156500342367, y: 35.873962535371184 },
                  { x: 128.61599394959552, y: 35.874041887228145 },
                  { x: 128.61619376679593, y: 35.87410395258292 },
                  { x: 128.6170484076451, y: 35.87435192560405 },
                  { x: 128.6173926063696, y: 35.874467324807476 },
                  { x: 128.61750376505577, y: 35.874520831414316 },
                  { x: 128.6175818426322, y: 35.87459253479082 },
                  { x: 128.617637983018, y: 35.87469139078253 },
                  { x: 128.61764975801236, y: 35.87478146217184 },
                  { x: 128.61763931518922, y: 35.87486263484542 },
                  { x: 128.61652594861434, y: 35.87695041751569 },
                  { x: 128.61545577390496, y: 35.87890276960294 },
                  { x: 128.61545577390496, y: 35.87890276960294 },
                  { x: 128.61435322997966, y: 35.88097244929414 },
                  { x: 128.61426595742407, y: 35.88114414741696 },
                  { x: 128.61414525098127, y: 35.881288977210836 },
                  { x: 128.61403499137973, y: 35.88135263456914 },
                  { x: 128.61384720811103, y: 35.8814166889237 },
                  { x: 128.61239947077183, y: 35.88182067620509 },
                  { x: 128.6121564498073, y: 35.881903036568374 },
                  { x: 128.61213478666002, y: 35.88196623961229 },
                  { x: 128.61214634809875, y: 35.882029272951044 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61247141409422, y: 35.882532351233394 },
                  { x: 128.61384945520075, y: 35.8845712961745 },
                  { x: 128.61407214516873, y: 35.8847233796121 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61456141004456, y: 35.88497324102813 },
                  { x: 128.61513969961766, y: 35.88527672265605 },
                  { x: 128.61522879124703, y: 35.88533935766737 },
                  { x: 128.61535145843715, y: 35.88544688617553 },
                  { x: 128.61539617913212, y: 35.885500735691096 },
                  { x: 128.61546346997557, y: 35.885608548429445 },
                  { x: 128.61555368073056, y: 35.885815388509 },
                  { x: 128.6156216712034, y: 35.88601332946794 },
                  { x: 128.61575772311554, y: 35.88641822407178 },
                  { x: 128.61589391633623, y: 35.88684114414085 },
                  { x: 128.61601868562857, y: 35.88721905679798 },
                  { x: 128.61615390196107, y: 35.88751579688736 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.61637849472925, y: 35.88791122220621 },
                  { x: 128.6165697224841, y: 35.88828879236268 },
                  { x: 128.616961087055, y: 35.88876447703431 },
                  { x: 128.61732981378327, y: 35.88917718469258 },
                  { x: 128.61753037157996, y: 35.88932937551985 },
                  { x: 128.61779759604804, y: 35.88950826188987 },
                  { x: 128.61852118278904, y: 35.88997321495803 },
                  { x: 128.61863292617227, y: 35.89009882272532 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.61900012099514, y: 35.89031324298457 },
                  { x: 128.62180561256457, y: 35.89212839434131 },
                  { x: 128.62206163840162, y: 35.89228930280181 },
                  { x: 128.6224402823449, y: 35.89254871882865 },
                  { x: 128.62318883732772, y: 35.89336502746121 },
                  { x: 128.62382579194406, y: 35.89407375416925 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.6050563482883,
          top: 35.89407375416925,
          right: 128.62748240642588,
          bottom: 35.87340894769412,
        },
      },
    },
  },
  {
    pathType: 3,
    totalTime: 35,
    payment: 1650,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.627482,
      y: 35.877407,
    },
    endStation: { lastEndStation: '북중학교앞', x: 128.620116, y: 35.8985 },
    stationNames: [
      ['동대구역', '신천', '칠성시장'],
      [
        '칠성꽃도매시장건너',
        '북구선거관리위원회앞',
        '경북대학교북문앞',
        '북중학교앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 1,
    routeSection: [
      { type: 3, sectionTime: 3 },
      { type: 1, sectionTime: 11, subwayName: ['대구 1호선'] },
      { type: 3, sectionTime: 5 },
      { type: 2, sectionTime: 11, busNo: ['급행6'] },
      { type: 3, sectionTime: 5 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 41,
            section: [
              {
                graphPos: [
                  { x: 128.62748240642588, y: 35.87741632342043 },
                  { x: 128.6269586449293, y: 35.87700445717928 },
                  { x: 128.62671351968, y: 35.876816461969746 },
                  { x: 128.6265466966362, y: 35.87672720214763 },
                  { x: 128.62633550648854, y: 35.87662916074593 },
                  { x: 128.62616896859666, y: 35.8765759517003 },
                  { x: 128.62288531040585, y: 35.875862992116055 },
                  { x: 128.6192465014192, y: 35.87504361936133 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                  { x: 128.61760420061563, y: 35.87461945920703 },
                  { x: 128.6161283733491, y: 35.87423948688319 },
                  { x: 128.61568458339576, y: 35.8741336088719 },
                  { x: 128.61534094734344, y: 35.87409030753287 },
                  { x: 128.61433232831183, y: 35.8739783097824 },
                  { x: 128.61367869846163, y: 35.87394560538026 },
                  { x: 128.61274808642585, y: 35.873896287350576 },
                  { x: 128.61207272718957, y: 35.873917764555635 },
                  { x: 128.6113646320977, y: 35.87400249742924 },
                  { x: 128.6108226419982, y: 35.874086379721014 },
                  { x: 128.61035858293323, y: 35.874223942002764 },
                  { x: 128.609562930695, y: 35.8744443082992 },
                  { x: 128.60905484849704, y: 35.87461814229082 },
                  { x: 128.60808380135052, y: 35.875073733481734 },
                  { x: 128.60691423820268, y: 35.875638480802074 },
                  { x: 128.60638433863977, y: 35.87585748006061 },
                  { x: 128.6061522657987, y: 35.875921746486945 },
                  { x: 128.60512396046562, y: 35.87613424667752 },
                ],
              },
            ],
            class: 2,
          },
          {
            type: 15,
            section: [
              {
                graphPos: [
                  { x: 128.60144695878324, y: 35.87609867639081 },
                  { x: 128.601470540942, y: 35.876287835519406 },
                  { x: 128.60150690463493, y: 35.87670226080105 },
                  { x: 128.60152952079955, y: 35.878225379983355 },
                  { x: 128.60149793678482, y: 35.87844185554442 },
                  { x: 128.60126160490503, y: 35.879407454834315 },
                  { x: 128.60125189577724, y: 35.87958776771132 },
                  { x: 128.60136837721086, y: 35.88034429270308 },
                  { x: 128.601516036142, y: 35.88083026481322 },
                  { x: 128.60158542191127, y: 35.881217484379896 },
                  { x: 128.60152320817383, y: 35.881776615388624 },
                  { x: 128.6012955523714, y: 35.88242670857744 },
                  { x: 128.60113427490316, y: 35.88306745512966 },
                  { x: 128.60093038120735, y: 35.885393883688884 },
                  { x: 128.60090015791295, y: 35.885790616016436 },
                  { x: 128.60081387459658, y: 35.88609749740774 },
                  { x: 128.60082563244453, y: 35.886187570442615 },
                  { x: 128.6020989699939, y: 35.88613611342834 },
                  { x: 128.60230995108859, y: 35.88620715876955 },
                  { x: 128.60243246552062, y: 35.886296674904436 },
                  { x: 128.602499739588, y: 35.88640449505454 },
                  { x: 128.6025021346175, y: 35.88671994491104 },
                  { x: 128.60231877582916, y: 35.887369816807805 },
                  { x: 128.60231877582916, y: 35.887369816807805 },
                  { x: 128.60218908281743, y: 35.88779408881438 },
                  { x: 128.6022344116384, y: 35.88792905894621 },
                  { x: 128.60235740758495, y: 35.88808166506495 },
                  { x: 128.60331711604383, y: 35.88902322242764 },
                  { x: 128.60360714536066, y: 35.88929215764082 },
                  { x: 128.6041973250472, y: 35.88970379019228 },
                  { x: 128.60457562441817, y: 35.88992721195759 },
                  { x: 128.60499816125972, y: 35.890141395985765 },
                  { x: 128.6091122683122, y: 35.89220260045212 },
                  { x: 128.60945736427453, y: 35.89242617540263 },
                  { x: 128.61016023260075, y: 35.893080560950445 },
                  { x: 128.61016023260075, y: 35.893080560950445 },
                  { x: 128.61126450545478, y: 35.8940753961996 },
                  { x: 128.61309387525654, y: 35.895724475271884 },
                  { x: 128.61487845414126, y: 35.89730165012708 },
                  { x: 128.6155453816007, y: 35.897595660705214 },
                  { x: 128.61744243012086, y: 35.89795544060055 },
                  { x: 128.62011637371128, y: 35.89850044897531 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.60081387459658,
          top: 35.89850044897531,
          right: 128.62748240642588,
          bottom: 35.873896287350576,
        },
      },
    },
  },
  {
    pathType: 3,
    totalTime: 37,
    payment: 1250,
    startPos: { x: 128.628393775388, y: 35.8793239931795 },
    endPos: { x: 128.62269785225394, y: 35.89624784236353 },
    startStation: {
      firstStartStation: '동대구역',
      x: 128.627482,
      y: 35.877407,
    },
    endStation: {
      lastEndStation: '명문세가APT앞',
      x: 128.623854,
      y: 35.89767,
    },
    stationNames: [
      ['동대구역', '동구청', '아양교', '동촌'],
      [
        '동촌역(신길)1',
        '동촌화성타운건너',
        '입석중학교건너',
        '강산아파트건너',
        '대구국제공항앞',
        '불로우방아파트건너',
        '복현서한2차아파트',
        '명문세가APT앞',
      ],
    ],
    busTransitCount: 1,
    subwayTransitCount: 1,
    routeSection: [
      { type: 3, sectionTime: 3 },
      { type: 1, sectionTime: 12, subwayName: ['대구 1호선'] },
      { type: 3, sectionTime: 4 },
      { type: 2, sectionTime: 15, busNo: ['719'] },
      { type: 3, sectionTime: 3 },
    ],
    routeGraphic: {
      result: {
        lane: [
          {
            type: 41,
            section: [
              {
                graphPos: [
                  { x: 128.62748240642588, y: 35.87741632342043 },
                  { x: 128.62821886644846, y: 35.8781154949569 },
                  { x: 128.62849822116613, y: 35.87842949226922 },
                  { x: 128.6286999860533, y: 35.87873488272826 },
                  { x: 128.6288463089972, y: 35.87903155053015 },
                  { x: 128.6290264991754, y: 35.879409159140245 },
                  { x: 128.62945511886699, y: 35.88038934689602 },
                  { x: 128.6296921897971, y: 35.88095593266465 },
                  { x: 128.63018720365702, y: 35.881926755441526 },
                  { x: 128.63062377592013, y: 35.88251031640267 },
                  { x: 128.63217797415254, y: 35.88435884494723 },
                  { x: 128.63217797415254, y: 35.88435884494723 },
                  { x: 128.63270367934368, y: 35.88500502007281 },
                  { x: 128.6330826100135, y: 35.88530045407743 },
                  { x: 128.63340530373253, y: 35.88548802590024 },
                  { x: 128.63359430349178, y: 35.88557715870396 },
                  { x: 128.6339164956219, y: 35.88570163951439 },
                  { x: 128.63437166504812, y: 35.88583442884741 },
                  { x: 128.63712182517796, y: 35.886252473132004 },
                  { x: 128.63745473891365, y: 35.886331821506694 },
                  { x: 128.63776550244256, y: 35.886411286825975 },
                  { x: 128.63985407677617, y: 35.887193314119834 },
                  { x: 128.63985407677617, y: 35.887193314119834 },
                  { x: 128.643298960182, y: 35.88858994130643 },
                  { x: 128.643631889635, y: 35.888669272365455 },
                  { x: 128.6440199058859, y: 35.88871225380982 },
                  { x: 128.64431895074154, y: 35.88871064649245 },
                  { x: 128.64459562449156, y: 35.88868211923938 },
                  { x: 128.6449052322525, y: 35.8886173614532 },
                  { x: 128.6451593876743, y: 35.888543888216184 },
                  { x: 128.6476640113825, y: 35.88735866735855 },
                  { x: 128.65013511232218, y: 35.886146536733236 },
                ],
              },
            ],
            class: 2,
          },
          {
            type: 11,
            section: [
              {
                graphPos: [
                  { x: 128.65280090835512, y: 35.88706941659133 },
                  { x: 128.65186371115215, y: 35.88758826811833 },
                  { x: 128.65124636388677, y: 35.887943137765326 },
                  { x: 128.65062901108743, y: 35.888298004275555 },
                  { x: 128.6492839736534, y: 35.8890624045704 },
                  { x: 128.64791675847877, y: 35.889826909730154 },
                  { x: 128.64791675847877, y: 35.889826909730154 },
                  { x: 128.64653858775796, y: 35.89060948479502 },
                  { x: 128.64567840006018, y: 35.89107379368845 },
                  { x: 128.64567840006018, y: 35.89107379368845 },
                  { x: 128.64414563120496, y: 35.89192026632542 },
                  { x: 128.64390305220945, y: 35.892056767402494 },
                  { x: 128.64366061859323, y: 35.89221129354277 },
                  { x: 128.6434182571129, y: 35.892374831973406 },
                  { x: 128.64331922851568, y: 35.89245648209513 },
                  { x: 128.64272804585326, y: 35.89331590486911 },
                  { x: 128.64223537179004, y: 35.89403058616833 },
                  { x: 128.64188435126474, y: 35.89445608552244 },
                  { x: 128.64139122550688, y: 35.89511668673443 },
                  { x: 128.64139122550688, y: 35.89511668673443 },
                  { x: 128.6411066558821, y: 35.89554182811279 },
                  { x: 128.640197108166, y: 35.89676346746026 },
                  { x: 128.63995617974302, y: 35.897107254454596 },
                  { x: 128.63985750517958, y: 35.89723396561889 },
                  { x: 128.6397145951793, y: 35.89736992601072 },
                  { x: 128.63956053506354, y: 35.89749693257958 },
                  { x: 128.6392741316119, y: 35.89769675031057 },
                  { x: 128.638833011232, y: 35.897942458051475 },
                  { x: 128.63705742514153, y: 35.8989253318788 },
                  { x: 128.63650609746588, y: 35.899243722207515 },
                  { x: 128.63650609746588, y: 35.899243722207515 },
                  { x: 128.63600971811482, y: 35.899507739422596 },
                  { x: 128.63379255014814, y: 35.90069119749718 },
                  { x: 128.63332924112208, y: 35.90093700241877 },
                  { x: 128.63294282444025, y: 35.90110128099605 },
                  { x: 128.63278809913763, y: 35.90114716396736 },
                  { x: 128.63263322988976, y: 35.90117502118149 },
                  { x: 128.63244512802856, y: 35.90120305360146 },
                  { x: 128.63221257234122, y: 35.901213293956644 },
                  { x: 128.63186916974456, y: 35.90121510526812 },
                  { x: 128.63098146376586, y: 35.90103050664931 },
                  { x: 128.63098146376586, y: 35.90103050664931 },
                  { x: 128.62980524702755, y: 35.90078432606224 },
                  { x: 128.6284848167674, y: 35.900511850901005 },
                  { x: 128.62689811090328, y: 35.900186675556576 },
                  { x: 128.62576629918573, y: 35.899949236096376 },
                  { x: 128.62507829665316, y: 35.89979960325607 },
                  { x: 128.62507829665316, y: 35.89979960325607 },
                  { x: 128.62358037823634, y: 35.89949194704025 },
                  { x: 128.62270371638797, y: 35.89929821635113 },
                  { x: 128.62257022342348, y: 35.89922680466468 },
                  { x: 128.62251412989437, y: 35.899136964415916 },
                  { x: 128.6225355770432, y: 35.89904672131542 },
                  { x: 128.62260126224047, y: 35.89894723519536 },
                  { x: 128.62349171537556, y: 35.89807734108502 },
                  { x: 128.62385406961403, y: 35.897669862528886 },
                ],
              },
            ],
            class: 1,
          },
        ],
        boundary: {
          left: 128.62251412989437,
          top: 35.90121510526812,
          right: 128.65280090835512,
          bottom: 35.87741632342043,
        },
      },
    },
  },
];

export default useInputForm;

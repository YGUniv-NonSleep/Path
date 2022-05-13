import { useEffect, useState } from 'react';
import PathPresenter from './PathPresenter';
import { PathApi } from '../../OdsayApi';
import MapApi from '../../MapApi';
import { TmapApi } from '../../TmapApi';

function PathContainer() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [way, setWay] = useState([]); // 찾은 경로
  const [jusoValue, setJusoValue] = useState([]); // 가져온 주소 받아서 띄워줄 배열 state
  const [SPoint, setSPoint] = useState(''); // 출발지 주소창
  const [APoint, setAPoint] = useState(''); // 도착지 주소창
  const [insertPoint, setInsertPoint] = useState(''); // 입력에 반응하는 창 state

  // 카카오 지도를 불러오는 함수
  // MapApi 기능들 전부 함수화 시키기 호출할 때마다 필요 없는 것도 많이 호출 함.
  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  // 처음 접속시 세팅 Effect Hook
  useEffect(() => {
    mapLoad();
  }, []);

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
    // console.log(e.target)
    setInsertPoint('');
    setSPoint('');
    setAPoint('');
  };
  // 출발지 도착지 전환하는 함수
  const switchPoints = () => {
    let temp = SPoint;
    setSPoint(APoint);
    setAPoint(temp);
  };

  // 키워드로 장소 검색인데 추후 주소로 바꿀것
  function placeSearch() {
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(insertPoint, function (result, status, pagination) {
      if (status === daum.maps.services.Status.OK) {
        let k = result.map((item) => {
          const data = {
            pN: item.place_name,
            aN: item.address_name,
          };
          return data;
        });
        setJusoValue([...k]);
      } else return '몬가... 잘못됨..';
    });
  }

  // 장소 검색 로직
  useEffect(() => {
    placeSearch();
  }, [insertPoint]);

  function getKeywordLatLng(data) {
    const ps = new kakao.maps.services.Places();

    for (var i = 0; i < data.length; i++) {
      let idx = data[i].indexOf('(');
      let string = data[i].substr(0, idx - 1);

      ps.keywordSearch(string, function (result, status, pagination) {
        if (status === daum.maps.services.Status.OK) {
          let k = result.filter((item) => {
            return item.place_name === string;
          });
          setWay((cur) => [...cur, k[0]]);
        } else return console.log('몬가... 몬가... 잘못됨..');
      });
    }
  }

  function wayFind() {
    try {
      setWay([]);
      // 출발지, 도착지의 위도, 경도 얻음
      getKeywordLatLng([SPoint, APoint]); // 이친구들의 콜백이 끝나야 X, Y 좌표를 얻을 수 있음
    } catch (error) {
      console.log(error);
    }
  }

  async function pathSearch(idx) {
    if (idx == undefined) idx = 0;

    // 노선 그래프 경로와 경로 정보 요청
    const graphicData = await PathApi.getTransPath({
      sx: way[0].x,
      sy: way[0].y,
      ex: way[1].x,
      ey: way[1].y,
    });
    console.log(graphicData);

    const sp = await MapApi().drawKakaoMarker(way[0].x, way[0].y);
    sp.setMap(map);

    const ap = await MapApi().drawKakaoMarker(way[1].x, way[1].y);
    ap.setMap(map);

    const dkpl = MapApi().drawKakaoPolyLine(
      graphicData[idx].routeGraphic.result.lane
    );
    dkpl.polyline.setMap(map);

    if (graphicData[idx].routeGraphic.result.boundary) {
      let points = [
        new kakao.maps.LatLng(way[0].y, way[0].x),
        new kakao.maps.LatLng(way[1].y, way[1].x),
      ];

      for (var i = 0; i < dkpl.lineArray.length; i++) {
        points.push(
          new kakao.maps.LatLng(dkpl.lineArray[i].Ma, dkpl.lineArray[i].La)
        );
      }
      // 보행자 경로 생성 및 그리기
      await createWalkPath(way[0].x, way[0].y, points[2].La, points[2].Ma);
      await createWalkPath(
        points[points.length - 1].La,
        points[points.length - 1].Ma,
        way[1].x,
        way[1].y
      );

      let bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      map.setBounds(bounds);
    }
  }

  useEffect(() => {
    if (way.length == 2) {
      pathSearch();
    } else return;
  }, [way]);

  const createWalkPath = async (startX, startY, endX, endY) => {
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
    console.log(walkCoordinate);
    console.log('보행자 경로 좌표 생성 완료');

    // 보행자 경로 그리기
    const walkResult = await MapApi().drawKakaoWalkPolyLine(walkCoordinate);
    walkResult.setMap(map);
  };

  return (
    <PathPresenter
      loading={loading}
      jusoValue={jusoValue}
      SPoint={SPoint}
      APoint={APoint}
      onchangeSP={onchangeSP}
      onchangeAP={onchangeAP}
      switchPoints={switchPoints}
      refreshPoints={refreshPoints}
      wayFind={wayFind}
      pathSearch={pathSearch}
    ></PathPresenter>
  );
}

export default PathContainer;

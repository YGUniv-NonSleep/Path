import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter";
import { PathApi } from "../../OdsayApi";
import MapApi from "../../MapApi";

function PathContainer() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [way, setWay] = useState([]); // 찾은 경로

  const [jusoValue, setJusoValue] = useState([]); // 가져온 주소 받아서 띄워줄 배열 state

  const [SPoint, setSPoint] = useState(""); // 출발지 주소창
  const [APoint, setAPoint] = useState(""); // 도착지 주소창
  const [insertPoint, setInsertPoint] = useState(""); // 입력에 반응하는 창 state

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

  // 출발지를 저장하는 함수
  const onchangeSP = (e, sp) => {
    // setSPoint(e.target.innerText)
    setInsertPoint(sp);
    setSPoint(sp);
    // console.log(sp)
    // console.log(SPoint)
  };
  // 도착지를 저장하는 함수
  const onchangeAP = (e, ap) => {
    setInsertPoint(ap);
    setAPoint(ap);
    // console.log(ap)
  };
  // 다시입력을 수행하는 함수
  const refreshPoints = (e) => {
    // console.log(e.target)
    setInsertPoint("");
    setSPoint("");
    setAPoint("");
  };
  // 출발지 도착지 전환하는 함수
  const switchPoints = () => {
    let temp = SPoint;
    setSPoint(APoint);
    setAPoint(temp);
  };

  function placeSearch() {
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(insertPoint, function (result, status, pagination) {
      if (status === daum.maps.services.Status.OK) {
        // console.log(result)
        let k = result.map((item) => {
          const data = {
            pN: item.place_name,
            aN: item.address_name,
            // x: item.x,
            // y: item.y,
          };
          return data;
        });
        // console.log(k)
        setJusoValue([...k]);

        // let asd = k.filter((it)=>{
        //     return it.pN == SPoint
        // })
      } else return "몬가... 잘못됨..";
    });
  }

  // 장소 검색 로직
  useEffect(() => {
    placeSearch();
  }, [insertPoint]);

  function getKeywordLatLng(data) {
    let idx = data.indexOf("(");
    let string = data.substr(0, idx - 1);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(string, function (result, status, pagination) {
      if (status === daum.maps.services.Status.OK) {
        let k = result.filter((item) => {
            // console.log(item.place_name)
            return item.place_name === string
        });
        console.log(k)
        setWay((cur) => [...cur, k[0]])

      } else return console.log("몬가... 몬가... 잘못됨..");
    })
  }

  // 길 찾기를 수행하는 함수
  // 사용자 입력에 조건 추가 요망.
  async function wayFind() {
    try {
      // 출발지, 도착지의 위도, 경도 얻음
      getKeywordLatLng(SPoint); 
      getKeywordLatLng(APoint); // 이친구들의 콜백이 끝나야 X, Y 좌표를 얻을 수 있음

      let pathWay = await PathApi.getDirection({
        sx: way[0].x, sy: way[0].y,
        ex: way[1].x, ey: way[1].y
      }).catch((error) => console.log(error));

      // setWay([])

      // pathWay 다양한 경로는 바로 아래에서..
      // const a = pathWay.path.map(mo => { return mo })
      // console.log(a)

      // const BaseX = Math.floor(startPoint.la);
      // const BaseY = Math.floor(startPoint.ma);
      const mo = pathWay.path.map((mo) => {
        return mo.info.mapObj;
      });
      const mapObj = `${mo[0]}`;
      // mapObj

      let graphicData = await PathApi.getGraphicRoute(mapObj).catch((error) =>
        console.log(error)
      );
      // console.log(graphicData)

      const sp = await MapApi().drawKakaoMarker(way[0].x, way[0].y);
      sp.setMap(map);

      const ap = await MapApi().drawKakaoMarker(way[1].x, way[1].y);
      ap.setMap(map);

      const dkpl = await MapApi().drawKakaoPolyLine(graphicData);
      dkpl.setMap(map);

       console.log(graphicData.result.boundary)
      if (graphicData.result.boundary) {
        // console.log("boundary ar")
        let points = [
          new kakao.maps.LatLng(way[0].x, way[0].y),
          new kakao.maps.LatLng(way[1].x, way[1].y),
        ];

        let bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < points.length; i++) {
          bounds.extend(points[i]);
        }

        // console.log(bounds)
        map.setBounds(bounds);

        // const moving = moveMapLatLon(map.getCenter());
        // map.panTo(moving);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 맵의 정보를 가져옴
  async function getMapInfo(mapData) {
    let info = await MapApi().getInfo(mapData);
    console.log(info);
    return info;
  }

  // 맵을 옆으로 보기좋게 이동시켜줌
  // function moveMapLatLon(data) {
  //   let moveLatLon = new kakao.maps.LatLng(data.Ma, data.La - 0.0);
  //   return moveLatLon;
  // }

  // 처음 접속시 세팅 Effect Hook
  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    // getMapInfo(map)
  }, [map]);

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
    ></PathPresenter>
  );
}

export default PathContainer;

import { TmapApi } from "../../../api/TmapApi";
import MapApi from '../../../api/MapApi';
import startPin from '../../../assets/images/start_pin.png';
import endPin from '../../../assets/images/end_pin.png';
import storePin from '../../../assets/images/store_pin.png';

// 보행자 경로 검색해서 지도에 그리기
export const drawWalkLine = async (
  startX,
  startY,
  endX,
  endY
) => {
  let walkCoordinate = [];

  let startPedestrianPath = await TmapApi.getPedestrianPath(
    startX,
    startY,
    endX,
    endY
  );

  for (var i in startPedestrianPath.features) {
    let geometry = startPedestrianPath.features[i].geometry;
    if (geometry.type == "LineString") {
      for (var j in geometry.coordinates) {
        let latlng = new kakao.maps.LatLng(
          geometry.coordinates[j][1],
          geometry.coordinates[j][0]
        );
        walkCoordinate.push(latlng);
      }
    } else {
      walkCoordinate.push(
        new kakao.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0])
      );
    }
  }

  // 보행자 경로 그리기
  const walkResult = await MapApi().drawKakaoWalkPolyLine(walkCoordinate);

  return walkResult
};

export const drawMarker = async (coords, loc) => {
  // const cp = await MapApi().drawKakaoMarker(
  //   coords.x, coords.y
  // )

  // return cp

  let markerData = {
    posX: coords.x,
    posY: coords.y,
  }
  if(loc == "start") markerData.image = startPin
  else if(loc == "end") markerData.image = endPin
  else markerData.image = storePin

  let marker = await MapApi().currentLocMarker(markerData);

  return marker
}

export const drawPolyLine = async (pathData) => {
  const dkpl = MapApi().drawKakaoPolyLine(
    pathData.routeGraphic.result.lane
  );

  return dkpl
}

export const moveToMap = async (pathData, polyline) => {
  if (pathData.routeGraphic.result.boundary) {
    let points = [
      new kakao.maps.LatLng(
        pathData.startPos.y,
        pathData.startPos.x
      ),
      new kakao.maps.LatLng(
        pathData.endPos.y,
        pathData.endPos.x
      ),
    ];
  
    for (var i = 0; i < polyline.lineArray.length; i++) {
      points.push(
        new kakao.maps.LatLng(
          polyline.lineArray[i].Ma,
          polyline.lineArray[i].La
        )
      );
    }
  
    // 사용자 지도 위치 영역에 맞추기
    let bounds = new kakao.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    return { bounds, points }
  }
}
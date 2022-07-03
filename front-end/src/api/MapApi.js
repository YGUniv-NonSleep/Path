function MapApi() {
  function createMap(latLng) {
    const mapContainer = document.getElementById('map'); // 지도 표시 div 탐색

    if (latLng == null || latLng == undefined)
      latLng = new kakao.maps.LatLng(37.56682420267543, 126.978652258823);

    let mapOption = {
      center: latLng, // 지도의 중심좌표
      level: 3, // 지도 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도 맵타입
    };

    let map = new kakao.maps.Map(mapContainer, mapOption);

    return map;
  }

  function setCurrentLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // 정확도 옵션을 사용해도 geolocation의 한계 때문에 정확하지 않다
      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      };

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, options);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      alert('geolocation을 사용할수 없어요..');
      // geolocation 사용할 수 없을 때 기본 설정된 좌표 값
      const locPosition = new kakao.maps.LatLng(
        37.56682420267543,
        126.978652258823
      );
      return locPosition;
    }
  }

  function getBoundary(points) {
    let bounds = new kakao.maps.LatLngBounds();

    // 좌표 객체들 (1~n개)
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    // console.log(bounds)
    // map.setBounds(bounds);
    return bounds;
  }

  async function keywordSearch(data, callback) {
    if (!data.keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 처음 입력 받을 땐 카테고리 분류 없이.
    // 위치 정보 있으면 위치정보 받기
    let options = {
      size: 10, // 한 페이지에 보여질 갯수
      page: data.page, // 페이지 값 1~x
    };

    if (data.category != '') {
      if (data.category == '대형마트') options.category_group_code = 'MT1';
      if (data.category == '편의점') options.category_group_code = 'CS2';
      if (data.category == '음식점') options.category_group_code = 'FD6';
      if (data.category == '카페') options.category_group_code = 'CE7';
      if (data.category == '병원') options.category_group_code = 'HP8';
      if (data.category == '약국') options.category_group_code = 'PM9';
    }

    if (data.userLoc != undefined && data.userLoc != null) {
      (options.location = data.userLoc),
        // options.y = data.userLoc.y,
        (options.radius = 1000); // 1000당 1km
    }

    if (data.sort == 'right') {
      options.sort = 'accuracy'; // distance 또는 accuracy (기본값: accuracy)
    } else if (data.sort == 'left') options.sort = 'distance';

    return new Promise(() => {
      ps.keywordSearch(data.keyword, callback, options);
    });
  }

  function categorySearch(data, map, callback) {
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map);
    console.log(data);
    let categoryGroupCode = '';
    let options = {
      size: 10, // 한 페이지에 보여질 갯수
      page: 1, // 페이지 값 1~x
      useMapBounds: true,
    };

    if (data.category != '') {
      if (data.category == '대형마트') categoryGroupCode = 'MT1';
      if (data.category == '편의점') categoryGroupCode = 'CS2';
      if (data.category == '음식점') categoryGroupCode = 'FD6';
      if (data.category == '카페') categoryGroupCode = 'CE7';
      if (data.category == '병원') categoryGroupCode = 'HP8';
      if (data.category == '약국') categoryGroupCode = 'PM9';
    } else return;

    if (data.location != undefined && data.location != null) {
      (options.location = data.location), (options.radius = 1000); // 1000당 1km
    }

    if (data.sort == 'right') {
      options.sort = 'accuracy'; // distance 또는 accuracy (기본값: accuracy)
    } else if (data.sort == 'left') options.sort = 'distance';

    return new Promise(() => {
      // options
      ps.categorySearch(categoryGroupCode, callback, options);
    });
  }

  function setController(map) {
    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();
    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();
    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    return map;
  }

  function getInfo(mapData) {
    //console.log(mapData)

    // 지도의 현재 중심좌표를 얻어옵니다
    let center = mapData.getCenter();

    // 지도의 현재 레벨을 얻어옵니다
    let level = mapData.getLevel();

    // 지도타입을 얻어옵니다
    let mapTypeId = mapData.getMapTypeId();

    // 지도의 현재 영역을 얻어옵니다
    let bounds = mapData.getBounds();

    // 영역의 남서쪽 좌표를 얻어옵니다
    let swLatLng = bounds.getSouthWest();

    // 영역의 북동쪽 좌표를 얻어옵니다
    let neLatLng = bounds.getNorthEast();

    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    let boundsStr = bounds.toString();

    return {
      center,
      level,
      mapTypeId,
      bounds,
      swLatLng,
      neLatLng,
      boundsStr,
    };
  }

  // 지도에 클릭 이벤트를 등록합니다
  // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다

  // kakao.maps.event.addListener(map, 'click', getLatLng)

  // function getLatLng(mouseEvent) {
  //     // 클릭한 위도, 경도 정보를 가져옵니다
  //     let latlng = mouseEvent.latLng;
  //     console.log(latlng)
  //     // 위도: latlng.getLat()
  //     // 경도: latlng.getLng()

  //     return latlng
  // }

  async function currentLocMarker(data) {
    let imageSrc = '';
    let imageSize = new kakao.maps.Size(30, 32);
    let options = {
      offset: new kakao.maps.Point(13, 30),
    };
    let markerImage = null;

    let ob = {
      position: new kakao.maps.LatLng(data.posY, data.posX), // 마커 표시 위치
      clickable: true, // 마커 클릭 이벤트 설정 여부
      zIndex: 15,
    };

    if (data.image != '') {
      imageSrc = data.image;
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, options);
      ob.image = markerImage;
    }

    let marker = new kakao.maps.Marker(ob);
    return marker;
  }

  // 지도위 마커 표시해주는 함수
  function drawKakaoMarker(x, y) {
    let marker = new kakao.maps.Marker({
      // 마커 생성
      position: new kakao.maps.LatLng(y, x), // 마커 표시 위치
      clickable: true, // 마커 클릭 이벤트 설정 여부
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    //marker.setMap(map);
    return marker;
  }

  function drawKakaoWalkPolyLine(linePath) {
    let polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 7, // 선의 두께 입니다
      strokeColor: '#6c757d', // 선의 색깔입니다
      strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'shortdash', // 선의 스타일입니다
    });
    return polyline;
  }

  function drawKakaoMobilPolyLine(linePath) {
    let polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 7, // 선의 두께 입니다
      strokeColor: '#9b5de5', // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'shortdash', // 선의 스타일입니다
    });
    return polyline;
  }

  function drawKakaoPolyLine(data) {
    let lineArray = null;
    lineArray = new Array();

    let polyline = new kakao.maps.Polyline({
      //map: data.map,
      //path: [],
      strokeWeight: 7,
      strokeColor: '#003566',
      strokeOpacity: 0.7,
      strokeStyle: 'shortdash',
    });

    // console.log(data)

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].section.length; j++) {
        for (var k = 0; k < data[i].section[j].graphPos.length; k++) {
          // class -> 1(버스노선), 2(지하철노선)
          // type -> 노선 종류(버스, 지하철)
          lineArray.push(
            new kakao.maps.LatLng(
              data[i].section[j].graphPos[k].y,
              data[i].section[j].graphPos[k].x
            )
          );
        }
      }
    }

    // console.log(lineArray);
    polyline.setPath(lineArray);
    polyline.setZIndex(3);

    return { polyline, lineArray };
  }

  function drawKakaoBusPolyLine(data) {
    let lineArray = null;
    lineArray = new Array();

    // console.log(data[0])

    // console.log(data[0].x)
    // console.log(data[0].y)

    //lineArray.push(new kakao.maps.LatLng(y,x))

    for (var i = 0; i < data.length; i++) {
      lineArray.push(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    let polyline = new kakao.maps.Polyline({
      //map: data.map,
      //path: [],
      strokeWeight: 5,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
    });

    // console.log(lineArray)
    polyline.setPath(lineArray);
    polyline.setZIndex(10);

    return polyline;
  }

  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null);

  // 마커가 드래그 가능하도록 설정합니다
  //marker.setDraggable(true);

  // 아래 코드는 위의 마커를 생성하는 코드에서 clickable: true 와 같이
  // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
  // marker.setClickable(true);

  // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
  // var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  //     iwRemoveable = true; // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  // 인포윈도우를 생성합니다
  // var infowindow = new kakao.maps.InfoWindow({
  //     content : iwContent,
  //     removable : iwRemoveable
  // });

  return {
    createMap,
    getBoundary,
    setCurrentLocation,
    keywordSearch,
    categorySearch,
    setController,
    getInfo, //getLatLng,
    currentLocMarker,
    drawKakaoMarker,
    drawKakaoPolyLine,
    drawKakaoBusPolyLine,
    drawKakaoWalkPolyLine,
    drawKakaoMobilPolyLine,
  };
}

export default MapApi;

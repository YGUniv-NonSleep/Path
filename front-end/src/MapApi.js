function MapApi() {

    function createMap() {
        const mapContainer = document.getElementById('map') // 지도 표시 div 탐색

        let mapOption = {
            center: new kakao.maps.LatLng(37.55525165729346, 126.93737555322481), // 지도의 중심좌표
            level: 3, // 지도 확대 레벨
            mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도 맵타입
        };
        
        let map = new kakao.maps.Map(mapContainer, mapOption);

        return map;
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
            center, level, mapTypeId, bounds, swLatLng, neLatLng, boundsStr
        }
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

    
    // 지도위 마커 표시해주는 함수
    function drawKakaoMarker(x,y) {
        // console.log(x, y)
        let marker = new kakao.maps.Marker({ // 마커 생성
            position: new kakao.maps.LatLng(y,x), // 마커 표시 위치
            clickable: true // 마커 클릭 이벤트 설정 여부
        });
        
        // 마커가 지도 위에 표시되도록 설정합니다
        //marker.setMap(map);
        return marker
    }

    function drawKakaoPolyLine(data) {
        let lineArray = null;
        lineArray = new Array();

        // console.log(data)
        // console.log(data.result)
        // console.log(data.result.lane[0].section.length)
        // console.log(data.result.lane[0].section[0].graphPos[0])

        for(var i = 0 ; i < data.result.lane.length; i++) {
            for(var j=0 ; j <data.result.lane[i].section.length; j++) {
                for(var k=0 ; k < data.result.lane[i].section[j].graphPos.length; k++) {
                    //console.log(data.result.lane[i].section[j].graphPos.length)
                    lineArray.push(new kakao.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
                }
            }
        }

        let polyline = new kakao.maps.Polyline({
            //map: data.map,
            //path: [],
            strokeWeight: 5,
            strokeColor: '#FF00FF',
            strokeOpacity: 0.8,
            strokeStyle: 'dashed'
        });
        
        console.log(lineArray)
        polyline.setPath(lineArray)
        polyline.setZIndex(3);

        return polyline
    }

    function drawKakaoBusPolyLine(data) {
        let lineArray = null;
        lineArray = new Array();

        console.log(data[0])

        console.log(data[0].x)
        console.log(data[0].y)

        //lineArray.push(new kakao.maps.LatLng(y,x))

        for(var i=0; i<data.length; i++){
            lineArray.push(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        let polyline = new kakao.maps.Polyline({
            //map: data.map,
            //path: [],
            strokeWeight: 5,
            strokeColor: '#FF00FF',
            strokeOpacity: 0.8,
            strokeStyle: 'dashed'
        });
        
        console.log(lineArray)
        polyline.setPath(lineArray)
        polyline.setZIndex(10);

        return polyline
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
        drawKakaoBusPolyLine, createMap, setController, getInfo, drawKakaoMarker, drawKakaoPolyLine, //getLatLng,
    }
}

export default MapApi;
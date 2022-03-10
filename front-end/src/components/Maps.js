import { useEffect } from "react";

function Maps() {
    //const { kakao } = window;

    const mapContainer = document.getElementById('map')
    console.log(mapContainer)
    // https://devtalk.kakao.com/t/api-currentstyle-null/35781/4

    let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
        mapTypeId : kakao.maps.MapTypeId.ROADMAP
    };
        
    let map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 지도 타입 변경 컨트롤을 생성한다
	var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
	map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);	

	// 지도에 확대 축소 컨트롤을 생성한다
	var zoomControl = new kakao.maps.ZoomControl();

	// 지도의 우측에 확대 축소 컨트롤을 추가한다
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
}

export default Maps;

import { useEffect } from "react";

function Maps() {
    
    const mapDiv = document.createElement('div');
    mapDiv.id = "map";
    mapDiv.async = true;
    mapDiv.style.width = "800px";
    mapDiv.style.height = "600px";

    document.body.appendChild(mapDiv);

    const mapContainer = document.getElementById('map') // 지도 표시 div 탐색
    console.log(mapContainer)
    // https://devtalk.kakao.com/t/api-currentstyle-null/35781/4

    let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 5, // 지도 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도 맵타입
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
    
    function getInfo() {
        // 지도의 현재 중심좌표를 얻어옵니다 
        var center = map.getCenter(); 
        
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();
        
        // 지도타입을 얻어옵니다
        var mapTypeId = map.getMapTypeId(); 
        
        // 지도의 현재 영역을 얻어옵니다 
        var bounds = map.getBounds();
        
        // 영역의 남서쪽 좌표를 얻어옵니다 
        var swLatLng = bounds.getSouthWest(); 
        
        // 영역의 북동쪽 좌표를 얻어옵니다 
        var neLatLng = bounds.getNorthEast(); 
        
        // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
        var boundsStr = bounds.toString();
        
        
        var message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
        message += '경도 ' + center.getLng() + ' 이고 <br>';
        message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
        message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
        message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
        message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
        
        // 개발자도구를 통해 직접 message 내용을 확인해 보세요.
        // ex) console.log(message);
        console.log(message)
        console.log(center)
    }
    return getInfo();
    
}

export default Maps;

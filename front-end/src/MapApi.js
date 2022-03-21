function MapApi() {
    const mapContainer = document.getElementById('map') // 지도 표시 div 탐색
    //console.log(mapContainer)
    // https://devtalk.kakao.com/t/api-currentstyle-null/35781/4

    let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도 맵타입
    };
    
    let map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 지도 타입 변경 컨트롤을 생성한다
	const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
	map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);	

	// 지도에 확대 축소 컨트롤을 생성한다
	const zoomControl = new kakao.maps.ZoomControl();

	// 지도의 우측에 확대 축소 컨트롤을 추가한다
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
    return function getInfo() {
        // 지도의 현재 중심좌표를 얻어옵니다 
        let center = map.getCenter(); 
        
        // 지도의 현재 레벨을 얻어옵니다
        let level = map.getLevel();
        
        // 지도타입을 얻어옵니다
        let mapTypeId = map.getMapTypeId(); 
        
        // 지도의 현재 영역을 얻어옵니다 
        let bounds = map.getBounds();
        
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
}

export default MapApi;

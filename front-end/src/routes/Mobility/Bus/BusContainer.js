import { useEffect, useState } from "react";
import BusPresenter from "./BusPresenter";
import MapApi from "../../../MapApi";
import { MobilityApi } from "../../../OdsayApi";

function BusContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [busNo, setBusNo] = useState('');
    const [markers, setMarkers] = useState([]);
    const [stayMarker, setStayMarker] = useState([]);
    const [poly, setPoly] = useState('');

    async function mapLoad() {
        try {
            let createMap = await MapApi().createMap();
            let setController = await MapApi().setController(createMap);
            settingMap(setController);
            setLoading(true);

        } catch(error) {
            console.log(error);
        }
    }

    function onChanged(e) {
        if(e != undefined){
            console.log(e.target.value)
            setBusNo(e.target.value)
        } else {
            return 0
        }
    }
    useEffect(() => {
        onChanged()
    }, [busNo])

    function submit(e){
        e.preventDefault()
        console.log(busNo)
        busInfo(busNo)
    }
    async function busInfo(data){
        
        removeMarkers()
        removeStayMarkers()
        if(poly!=''){removeGraphics()}
        let busNo = data

        //정류장
        let busStay = await MobilityApi.getBusStay(busNo).catch((error) => console.log(error));
        console.log(busStay)
        
        const array1 = busStay;
        console.log(array1)

        // var iwContent = new iwContent[null];

        if(busStay != null){
            var bound = new kakao.maps.LatLngBounds();
            for(var i=0; i<array1.length; i++){
                let busStayMark = new kakao.maps.LatLng(array1[i].y, array1[i].x)
                console.log(busStayMark)
                iwContent[i] = busStay[i].stationName;
                console.log(iwContent)
                
                const mark = new kakao.maps.Marker({ 
                    position : busStayMark
                })
                mark.setMap(map);
                setStayMarker((current) => [...current, mark])
                bound.extend(busStayMark);
               }
               
                
            // 인포윈도우를 생성합니다
            // var infowindow = new kakao.maps.InfoWindow({
            //     content : iwContent
            // });

            // // 마커에 마우스오버 이벤트를 등록합니다
            // kakao.maps.event.addListener(marker, 'mouseover', function() {
            // // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            //     infowindow.open(map, marker);
            // });

            // // 마커에 마우스아웃 이벤트를 등록합니다
            // kakao.maps.event.addListener(marker, 'mouseout', function() {
            //     // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            //     infowindow.close();
            // });
               map.setBounds(bound);
        }
        

        //버스 번호
        let busInfo = await MobilityApi.getBusId(busNo).catch((error) => console.log(error));
        let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch((error) => console.log(error));
        
        const array = busDetailInfo.result.station;
        //console.log(array)
        
        const bPoly = await MapApi().drawKakaoBusPolyLine(busDetailInfo.result.station)                           
        bPoly.setMap(map)
        setPoly(bPoly)

        if(busInfo != null){
            var bounds = new kakao.maps.LatLngBounds();

            for (var i = 0; i < array.length; i++) {
                let markerPosition = new kakao.maps.LatLng(array[i].y, array[i].x)
                const mk = new kakao.maps.Marker({ 
                    position : markerPosition,
                    clickable: true
                })
                mk.setMap(map)
                setMarkers((current) => [...current, mk])
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(markerPosition);
            }
        
            map.setBounds(bounds);
        }

        function removeMarkers() {
            for(var i=0; i<markers.length; i++) {
                markers[i].setMap(null);
            }
            setMarkers([])
        }

        function removeStayMarkers(){
            for(var i=0; i<stayMarker.length; i++){
                stayMarker[i].setMap(null);
            }
            setStayMarker([])
        }

        function removeGraphics() {
            console.log(poly)
            poly.setMap(null)
            setPoly('')
        }
    }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() => {
        //busInfo()
    }, [map]);

    return (
        <BusPresenter 
            loading = {loading}
            onChanged = {onChanged}
            submit = {submit}
            busNo = {busNo}    
        > </BusPresenter>
    )
}

export default BusContainer;
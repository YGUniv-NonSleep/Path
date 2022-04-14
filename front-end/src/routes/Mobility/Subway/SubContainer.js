import { useEffect, useState } from "react";
import SubPresenter from "./SubPresenter";
import MapApi from "../../../MapApi";
import { SubName } from "../../../OdsayApi";

function SubContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subName, setSubName] = useState('');
    const [markers, setMarkers] = useState([]);

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

    function onChanged(e){
        if(e != undefined){
            console.log(e.target.value)
            setSubName(e.target.value)
        } else {
            return 0
        }
    }

    useEffect(() => {
        onChanged()
    }, [subName])

    function submit(e){
        e.preventDefault()
        console.log(subName)
        subInfo(subName)
    }

    async function subInfo(data){

        removeMarkers()

        let subName = data
        let stationInfo = await SubName.getSubName(subName).catch((error) => console.log(error));
        console.log(stationInfo)

        let points = [
            new kakao.maps.LatLng(stationInfo.y, stationInfo.x)
        ];

        var bounds = new kakao.maps.LatLngBounds();    

        var i, marker;
        for (i = 0; i < points.length; i++) {
            // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
            marker = new kakao.maps.Marker({ position : points[i], clickable: true });
            marker.setMap(map);
            setMarkers((current) => [...current, marker])
            
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);

            var iwContent = stationInfo.stationName + '<br>' + stationInfo.laneName, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true;

            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);  
        });
        }
            map.setBounds(bounds);

            function removeMarkers(){
                for(var i=0; i<markers.length; i++){
                    markers[i].setMap(null);
                }
                setMarkers([])
            }
    }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() =>{
        subInfo()
    }, [map]);

    return (
        <SubPresenter 
            loading = {loading}
            onChanged = {onChanged}
            submit = {submit}
            subName = {subName}
        >
            </SubPresenter>
    )
}

export default SubContainer;
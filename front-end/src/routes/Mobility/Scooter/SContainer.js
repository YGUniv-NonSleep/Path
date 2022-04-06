import { useEffect, useState } from "react";
import SPresenter from "./SPresenter";
import MapApi from "../../../MapApi";


function SContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);

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

    function ScooterIcon(){
        
        var positions = [
            { 
                latlng: new kakao.maps.LatLng(33.450705, 126.570677)
            },
            {
                latlng: new kakao.maps.LatLng(33.450936, 126.569477)
            },
            {
                latlng: new kakao.maps.LatLng(33.450879, 126.569940)
            },
            {
                latlng: new kakao.maps.LatLng(33.451393, 126.570738)
            }
        ];

        console.log(positions)
    

        for (var i = 0; i < positions.length; i ++) {

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng // 마커를 표시할 위치
            });
            
            console.log(positions[i].latlng);
    
          
        }
         marker.setMap(map);
        
      

    }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() => {
        ScooterIcon()
    }, [map]);

    return (
        <SPresenter 
            loading = {loading}
        >
            </SPresenter>
    )
}

export default SContainer;

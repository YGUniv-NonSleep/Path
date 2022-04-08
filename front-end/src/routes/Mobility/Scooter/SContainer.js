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
            {latlng: new kakao.maps.LatLng(37.5561146977415, 126.937382888804)},
            {latlng: new kakao.maps.LatLng(37.5550163763589, 126.939094978874)},
            {latlng: new kakao.maps.LatLng(37.5565588693504, 126.939066561479)},
            {latlng: new kakao.maps.LatLng(37.5574054114823, 126.938305327396)},
            {latlng: new kakao.maps.LatLng(37.5568915849224, 126.941334328122)},
            {latlng: new kakao.maps.LatLng(37.5572093234013, 126.935548521559)},
            {latlng: new kakao.maps.LatLng(37.5558469433118, 126.942380874348)},
            {latlng: new kakao.maps.LatLng(37.5552621346521, 126.93368057964)},
            {latlng: new kakao.maps.LatLng(37.5537013413484, 126.93817257614)}
        ];

        var imageSrc = 'https://cdn-icons.flaticon.com/png/512/3212/premium/3212700.png?token=exp=1649327267~hmac=137caf2665dee407bcd9e97a2c7b8f2e' ; 
        
        var imageSize = new kakao.maps.Size(50, 55); 

        for (var i = 0; i < positions.length; i ++) {

            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                image : markerImage
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


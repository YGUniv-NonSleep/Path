import { useEffect, useState } from "react";
import SubPresenter from "./SubPresenter";
import MapApi from "../../../MapApi";

function SubContainer() {
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

    async function subInfo(){

      
        var points = [
            new kakao.maps.LatLng(35.865578, 128.59302)
        ];

        var bounds = new kakao.maps.LatLngBounds();    

        var i, marker;
        for (i = 0; i < points.length; i++) {
            // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
            marker = new kakao.maps.Marker({ position : points[i] });
            marker.setMap(map);
            
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
        }
            map.setBounds(bounds);
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
        >
            </SubPresenter>
    )
}

export default SubContainer;
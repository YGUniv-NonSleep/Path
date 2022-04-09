import { useEffect, useState } from "react";
import BusPresenter from "./BusPresenter";
import MapApi from "../../../MapApi";
import { MobilityApi } from "../../../OdsayApi";

function BusContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [busNo, setBusNo] = useState(null);
    const [markers, setMarkers] = useState([]);

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

    async function busInfo(data){
        let busNo = data

        console.log(markers)
        removeMarkers();
        
        // if(markers.length != 0) {
            
        // }

        let busInfo = await MobilityApi.getBusId(busNo).catch((error) => console.log(error));
         //console.log(busInfo)

        let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch((error) => console.log(error));
         //console.log(busDetailInfo)

        const bPoly = await MapApi().drawKakaoBusPolyLine(busDetailInfo.result.station)                           
        //console.log(bPoly)
        bPoly.setMap(map)

        const array = busDetailInfo.result.station;
        //console.log(array.length)


        let points = null;
        points = new Array();
        
        for(var i=0; i<array.length; i++){
            points.push(new kakao.maps.LatLng(array[i].y, array[i].x))
        }
        // console.log(points)
        console.log("???")

        
        var bounds = new kakao.maps.LatLngBounds();
         
        for (var i = 0; i < points.length; i++) {
            //console.log(points[i])
            const a = new kakao.maps.Marker({ position : points[i] })
            setMarkers({...a})

            // console.log(markers[i])
            // markers[i].setMap(map)


            a.setMap(map)
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
        }
        // points=null;
        // console.log(bounds)
        // console.log(map)
        console.log(markers)

        map.setBounds(bounds);

        function removeMarkers() {
            console.log(markers)
            for(var i=0; i<markers.length; i++){
                console.log(markers[i])
                //markers[i].setMap(null);
            }
            setMarkers([])
            console.log(markers)
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
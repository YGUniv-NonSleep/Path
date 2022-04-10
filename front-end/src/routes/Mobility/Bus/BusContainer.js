import { useEffect, useState } from "react";
import BusPresenter from "./BusPresenter";
import MapApi from "../../../MapApi";
import { MobilityApi } from "../../../OdsayApi";

function BusContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [busNo, setBusNo] = useState('');
    const [markers, setMarkers] = useState([]);
    const [poly, setPoly] = useState('');

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

        removeMarkers()
        if(poly!=''){removeGraphics()}
        
        
        let busInfo = await MobilityApi.getBusId(busNo).catch((error) => console.log(error));
         //console.log(busInfo)

        let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch((error) => console.log(error));
         //console.log(busDetailInfo)

        const bPoly = await MapApi().drawKakaoBusPolyLine(busDetailInfo.result.station)                           
        console.log(bPoly)
        bPoly.setMap(map)
        setPoly(bPoly)

        const array = busDetailInfo.result.station;
        //console.log(array.length)
        
        var bounds = new kakao.maps.LatLngBounds();
         
        for (var i = 0; i < array.length; i++) {
            
            let markerPosition = new kakao.maps.LatLng(array[i].y, array[i].x)

            const mk = new kakao.maps.Marker({ 
                position : markerPosition
            })
            mk.setMap(map)
            setMarkers((current) => [...current, mk])
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(markerPosition);
        }
        map.setBounds(bounds);

        function removeMarkers() {
            for(var i=0; i<markers.length; i++) {
                markers[i].setMap(null);
            }
            setMarkers([])
        }

        function removeGraphics() {
            // for(var i=0; i<poly; i++){
            //     bPoly.Sg[i].setMap(null);
            // }
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
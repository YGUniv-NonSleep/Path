import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function useCarPoolRequest() {

    const [requestOpen, setRequestOpen] = useState(false);
    const [arriveOpen, setArriveOpen] = useState(false);
    const [effectState, setEffectState] = useState(null);
    const [setx, setX] = useState(null);
    const [sety, setY] = useState(null);
    const [asetx,setAx] = useState(null);
    const [asety, setAy] = useState(null);
    const [setstate, setState] =useState(false);
    var ax;
    var ay;
    var geocoder = new kakao.maps.services.Geocoder();
    var map, markerInfo;
    var marker_s, marker_e,marker,waypoint;
    var drawInfoArr = [];
    var resultInfoArr = [];
    var drawInfoArr2 = [];
    var chktraffic = [];
    var resultdrawArr = [];
    var resultMarkerArr = [];
    var trafficInfochk = "Y";
    const { postId } = useParams();

    useEffect(() => {
        axios
          .get(process.env.REACT_APP_SPRING_API + `/api/carpost/view/${postId}`)
          .then((res) => {
            console.log(res.data);
            setEffectState(res.data.body);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      useEffect(()=>{
        if(effectState != null){
            RequestMap(
                // effectState.startLatitude,
                // effectState.startLongitude,
                // // effectState.arriveLatitude,
                // // effectState.arriveLongitude
            )
        }
      },[effectState])

    const RequestOpen = (e) =>{
        e.preventDefault();
        setRequestOpen(true);
    }
    const RequestClose = (e) => {
        e.preventDefault();
        setRequestOpen(false);
    }

    const RequestArrive = (e) => {
        e.preventDefault();
        setArriveOpen(true);
    }
    const RequestArrClose = (e) => {
        e.preventDefault();
        setArriveOpen(false);
    }

    const SubmitRequest = (e) => {
        e.preventDefault();
        const data = {
          price : document.getElementsByName("price")[0].value,
          passenger : document.getElementsByName("recruit")[0].value,
          content : document.getElementsByName("content")[0].value,
          postId : effectState.id,
          startLatitude : setx,
          startLongitude : sety,
          arriveLatitude : asetx,
          arriveLongitude : asety
        }
        console.log(data);
        axios.post(process.env.REACT_APP_SPRING_API + '/api/request',data)
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    const requestComplete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = "";
    
        
        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
          console.log(fullAddress,"풀어드레스");
          requestCoord(fullAddress);
    }

    const requestComplete2 = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
    
        
        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
          console.log(fullAddress,"풀어드레스");
          requestCoord2(fullAddress);
    }
    
    function requestCoord(data) {
        geocoder.addressSearch(data, function(result,status){
            if(status === kakao.maps.services.Status.OK){
              console.log(result[0].x + "출발"); // 경도
              console.log(result[0].y); // 위도
              setX(result[0].y)
              setY(result[0].x)
            }
          })
    }

    function requestCoord2(data) {
        geocoder.addressSearch(data, function(result,status){
            if(status === kakao.maps.services.Status.OK){
              console.log(result[0].x + "도착"); // 경도
              console.log(result[0].y); // 위도
              ax = result[0].y;
              ay =result[0].x;
              setAx(result[0].y);
              setAy(result[0].x);
            }

            Hub(setx,sety,ax,ay)
            
          })
    }

    const Hub  = (data1, data2, data3 , data4) => {
            console.log(data1)
            console.log(data2)
            console.log(data3)
            console.log(data4)
            RequestMap(data1,data2,data3,data4);
            setState(true); 
    }

    const RequestMap = (data1,data2,data3,data4) =>{
              if(data1,data2,data3,data4){
                map = new Tmapv2.Map("request_map", {
                    center: new Tmapv2.LatLng(effectState.startLatitude, effectState.startLongitude),
                    width: "1000px",
                    height: "550px",
                    zoom: 10,
                    zoomControl: true,
                    scrollwheel: true,
                  });
                  marker_s = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(effectState.startLatitude, effectState.startLongitude),
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map,
                  });
                  resultMarkerArr.push(marker_s);
                  //도착  
                  marker_e = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(effectState.arriveLatitude,effectState.arriveLongitude),
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map,
                  });
                  resultMarkerArr.push(marker_e);
                  marker = new Tmapv2.Marker({
                    position : new Tmapv2.LatLng(data1,data2),
                    icon:"http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                    iconSize : new Tmapv2.Size(24,38),
                    map:map
                });   
                resultMarkerArr.push(marker);
                 marker = new Tmapv2.Marker({
                    position : new Tmapv2.LatLng(data3,data4),
                    icon:"http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_2.png",
                    iconSize : new Tmapv2.Size(24,38),
                    map:map
                });
                resultMarkerArr.push(marker);



                var headers = {};
                headers["appKey"] = "l7xx76f78a49e0724d6b999d58cb6a37677a";
                var params = {
				  startName: "출발",
				  startX: effectState.startLongitude,
				  startY: effectState.startLatitude,
				  startTime: "202206301314",
				  endName: "도착",
				  endX: effectState.arriveLongitude,
				  endY: effectState.arriveLatitude,
                 viaPoints: [
				    {
				      "viaPointId": "test01",
				      "viaPointName": "test01",
				      "viaX": data2,
				      "viaY": data1,
				    },
                    {
                        "viaPointId": "test02",
                        "viaPointName": "test02",
                        "viaX": data4,
                        "viaY": data3,
                      },
                ],
                reqCoordType: "WGS84GEO",
                resCoordType : "EPSG3857",
                searchOption : "0",
                }
                var routeLayer;
                axios.post("https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json",params,
                {
                    headers :{
                        appKey :"l7xx76f78a49e0724d6b999d58cb6a37677a",
                    },
                }
                ).then((res)=>{
                    console.log(res);
                    var resultData = res.data.properties;
			        var resultFeatures = res.data.features;
                    if(resultInfoArr.length>0){
                        for(var i in resultInfoArr){
                            resultInfoArr[i].setMap(null);
                        }
                        resultInfoArr=[];
                    }
                    
                    for(var i in resultFeatures) {
                        var geometry = resultFeatures[i].geometry;
                        var properties = resultFeatures[i].properties;
                        var polyline_;
                        drawInfoArr = [];
                        
                        if(geometry.type == "LineString") {
                            for(var j in geometry.coordinates){
                                // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                                var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                                // 포인트 객체를 받아 좌표값으로 변환
                                var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                                // 포인트객체의 정보로 좌표값 변환 객체로 저장
                                var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                                
                                drawInfoArr.push(convertChange);
                            }

                            polyline_ = new Tmapv2.Polyline({
                                path : drawInfoArr,
                                strokeColor : "#FF0000",
                                strokeWeight: 6,
                                map : map
                            });
                            resultInfoArr.push(polyline_);
                            
                        }else{
                            var markerImg = "";
                            var size = "";			//아이콘 크기 설정합니다.
                            
                            if(properties.pointType == "S"){	//출발지 마커
                                markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";	
                                size = new Tmapv2.Size(24, 38);
                            }else if(properties.pointType == "E"){	//도착지 마커
                                markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                                size = new Tmapv2.Size(24, 38);
                            }else{	//각 포인트 마커
                                markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                                size = new Tmapv2.Size(8, 8);
                            }
                            
                            // 경로들의 결과값들을 포인트 객체로 변환 
                            var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);
                            // 포인트 객체를 받아 좌표값으로 다시 변환
                            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);
                              
                            console.log(convertPoint._lat, convertPoint._lng);
                             var marker_p = new Tmapv2.Marker({
                                  position: new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng),
                                  icon : markerImg,
                                  iconSize : size,
                                  map:map
                              });

                              console.log(convertPoint._lat)
                              console.log(convertPoint._lng)
                              
                              resultMarkerArr.push(marker_p);
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err);
                }) 
              }
    };

    return {
        requestOpen,arriveOpen,setstate,RequestOpen,RequestClose,requestCoord,requestComplete,RequestMap,RequestArrive,RequestArrClose,
        requestComplete2,SubmitRequest
    }
}



export default useCarPoolRequest;

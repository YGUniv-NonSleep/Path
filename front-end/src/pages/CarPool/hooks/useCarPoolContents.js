
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


function useCarPoolContents(){
  var x;
  var y;
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  const { postId } = useParams();
  
  const [effectState, setEffectState] = useState(null);
  const [drawLineState, setDrawLineState] = useState(null);
  const [tDistance, setTdistance] = useState("");
  const [tTime, setTtime] = useState("");
  const [taxiFare, setTaxiFare] = useState("");
  const [showPtag, setShowPtag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
 
  const [isArrivedOpen, setIsArrivedOpen] = useState(false);
  const [arriveX, setArriveX] = useState(null);
  const [arriveY, setArriveY] = useState(null);

  const [startAddr, setStartAddr] = useState(null);
  const [arriveAddr, setArriveAddr] = useState(null);

  const [startLocal1, setStartLocal1] = useState(null);
  const [startLocal2, setStartLocal2] = useState(null);
  const [arriveLocal1, setArriveLocal1] = useState(null);
  const [arriveLocal2, setArriveLocal2] = useState(null);

  const [requestStartX, setRequestStartX] = useState(null);
  const [requestStartY, setRequestStartY] = useState(null);

  const [request, setRequestCarpool] = useState(false);
  const [reqstart, setReqStart] = useState(false);
  const [alarmCount,setAlarmCount] = useState(null);
  const [blockRequest,setBlock] = useState(false);

  const UpdateStartLocal1 = () =>{
    if(startLocal1 == null){
      return effectState.startLocal1
    }else if(startLocal1 != null){
      return startLocal1
    }
  }

  const UpdateStartLocal2 = () =>{
    if(startLocal2 == null){
      return effectState.startLocal2
    }else if(startLocal2 != null){
      return startLocal2;
    }
  }

  const UpdateArriveLocal1 = () =>{
    if(arriveLocal1 == null){
      return effectState.arriveLocal1
    }else if(arriveLocal1 != null){
      return arriveLocal1
    }
  }

  const UpdateArriveLocal2 = () =>{
    if(arriveLocal2 == null){
      return effectState.arriveLocal1
    }else if(arriveLocal2 != null){
      return arriveLocal2
    }
  }
  

  const RequestCreate = (e) =>{
    e.preventDefault();
 
    var data = {
      price  : document.getElementsByName("price")[0].value,
      passenger : document.getElementsByName("passenger")[0].value,
      content : document.getElementsByName("content")[0].value,
      startLatitude : effectState.startLatitude,
      startLongitude : effectState.startLongitude,
      arriveLatitude : effectState.arriveLatitude,
      arriveLongitude : effectState.arriveLongitude,
      postId : effectState.id
    }
    console.log(data);
    axios.post(process.env.REACT_APP_SPRING_API + "/api/request",data)
    .then((res)=>{
      console.log(res.data);
      alert(res.data.message);
      Close(e);
      window.location = '/carPool';
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  var geocoder = new kakao.maps.services.Geocoder();
  var map, markerInfo;
	var lonlat;
	var markers = [];
  var markers2 = [];
 

  //출발지,도착지 마커
  var marker_s, marker_e, marker_p,marker;

 

  //경로그림정보
  var drawInfoArr = [];
  var drawInfoArr2 = [];

  var chktraffic = [];
  var resultdrawArr = [];
  var resultMarkerArr = [];
  var trafficInfochk = "Y";
  var searchOption = 0;

  useEffect(() => {
    axios.get(process.env.REACT_APP_SPRING_API + `/api/request/confirm/${postId}`)
    .then((res) => { 
      console.log(res);
      if(res.data.body.approval == "accept"){
        setBlock(true);
      }else{
        setBlock(false);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

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
  useEffect(() => {
    if (effectState != null) {
      Map(
        effectState.startLatitude,
        effectState.startLongitude,
        effectState.arriveLatitude,
        effectState.arriveLongitude
      );
    }
  }, [effectState]);
  function getCoords(data) {
    geocoder.addressSearch(data, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0].x);
        console.log(result[0].y);
        effectState.startLatitude = result[0].y;
        effectState.startLongitude = result[0].x;
      }  

      setStartX(result[0].x);
      setStartY(result[0].y);
    });
  }
  
  function requestCoord(data) {
    geocoder.addressSearch(data, function(result,status){
      if(status === kakao.maps.services.Status.OK){
        console.log(result[0].x); // 경도
        console.log(result[0].y); // 위도
        setRequestStartX(result[0].y)//위도
        setRequestStartY(result[0].x)//경도
         y = result[0].x;
         x = result[0].y;   
      }
    })
  }

  function getArrivedCoords(data) {
    geocoder.addressSearch(data, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0].x);
        console.log(result[0].y);
        //var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        effectState.arriveLatitude = result[0].y;
        effectState.arriveLongitude = result[0].x;
      }

      setArriveX(result[0].x);
      setArriveY(result[0].y);
    });
  }

  const DeleteCarCont = (e) => {
    e.preventDefault();
    var id = effectState.id;
    axios.delete(process.env.REACT_APP_SPRING_API + `/api/carpost/delete/${id}`)
    .then((res)=>{
      console.log(res)
      alert(res.data.message);
      navigate(-1);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const Close = (e) => {
    e.preventDefault();
    setShowModal(false);
    setRequestCarpool(false);
  };
  
  const PatchModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const requestCarpool = (e) =>{
    e.preventDefault();
    setRequestCarpool(true);
   
  }

  const Patch = (e) => {
    e.preventDefault();
    const data = {
      id: effectState.id,
      title: e.target.title.value,
      content: e.target.content.value,
      recruit: e.target.recruit.value,
      price : e.target.price.value,
      sdate: e.target.sdate.value,
      edate: e.target.edate.value,
      stime: e.target.stime.value + ":00",
      startLocal1 : UpdateStartLocal1(),
      startLocal2 : UpdateStartLocal2(),
      arriveLocal1 : UpdateArriveLocal1(),
      arriveLocal2 : UpdateArriveLocal2(),
      startLongitude: effectState.arriveLongitude,
      startLatitude: effectState.startLatitude,
      arriveLongitude: effectState.arriveLongitude,
      arriveLatitude: effectState.arriveLatitude,
      member: effectState.member,
      cars: {
        id: effectState.cars.id
      },
    };
    console.log("data",data);
    let formData = new FormData();
    const multipartFile = e.target.userfile.files[0];
    formData.append('multipartFile',multipartFile);

    axios.post(process.env.REACT_APP_SPRING_API + '/api/image',formData,{
      withCredentials : true,
      headers : {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res)=>{
      console.log(res);
      const imageName = res.data;
      console.log(imageName);
      return imageName;
    })
    .then(async (imageName) =>{
      const result = await carPostUpdate(imageName,data);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const carPostUpdate = async(imageName,data) => {
    const updateData = {
      id: data.id,
      title: data.title,
      content: data.content,
      recruit: data.recruit,
      price : data.price,
      sdate: data.sdate,
      edate: data.edate,
      stime: data.stime,
      startLocal1 : data.startLocal1,
      startLocal2 : data.startLocal2,
      arriveLocal1 : data.arriveLocal1,
      arriveLocal2 : data.arriveLocal2,
      startLongitude: data.startLongitude,
      startLatitude: data.startLatitude,
      arriveLongitude: data.arriveLongitude,
      arriveLatitude: data.arriveLatitude,
      member: data.member,
      cars: {
        id: data.cars.id
      },
      photoName : imageName
    };
    console.log(data);
    await axios.patch(process.env.REACT_APP_SPRING_API + `/api/carpost/${data.id}`,updateData,{
      withCredentials : true,
    })
    .then((res)=>{
      console.log(res.data);
      alert(res.data.message)
      window.location = '/carPool';
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const openStartCode = (e) => {
    e.preventDefault();
    setIsStartOpen(true);
  };
  const RequestClose = (e) => {
    e.preventDefault();
    setIsStartOpen(false);
  }

  const RequestOpen = (e) => {
    e.preventDefault();
    setRequestOpen(true);
  }

  const handleComplete = (data) => {
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
    setStartLocal1(data.sigungu);
    setStartLocal2(data.bname)
    setStartAddr(fullAddress);
    getCoords(fullAddress);
  };

  
  const requestComplete = (data) => {
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

  const openArriveCode = (e) => {
    e.preventDefault();
    setIsArrivedOpen(true);
  };

  const handleComplete2 = (data) => {
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
    setArriveLocal1(data.sigungu);
    setArriveLocal2(data.bname);
    setArriveAddr(fullAddress);
    getArrivedCoords(fullAddress);
  };
  
  const FindWay = () => {

    setShowPtag(true);
    resettingMap();
    var params = {
      appKey: "l7xx76f78a49e0724d6b999d58cb6a37677a",
      startX: effectState.startLongitude,
      startY: effectState.startLatitude,
      endX: effectState.arriveLongitude,
      endY: effectState.arriveLatitude,
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      searchOption: searchOption,
      trafficInfo: trafficInfochk,
    };
    console.log(params);
    axios
      .post(
        "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
        params,
        {
          headers: {
            appkey: "l7xx76f78a49e0724d6b999d58cb6a37677a",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setDrawLineState(res.data);
        const resultData = res.data.features;
        setTdistance(
          (resultData[0].properties.totalDistance / 1000).toFixed(1)
        );
        setTtime((resultData[0].properties.totalTime / 60).toFixed(0));
        setTaxiFare(resultData[0].properties.taxiFare);

        if (trafficInfochk == "Y") {
          for (var i in resultData) {
            //for문 [S]
            var geometry = resultData[i].geometry;
            var properties = resultData[i].properties;

            if (geometry.type == "LineString") {
              //교통 정보도 담음
              chktraffic.push(geometry.traffic);
              var sectionInfos = [];
              var trafficArr = geometry.traffic;

              for (var j in geometry.coordinates) {
                // 경로들의 결과값들을 포인트 객체로 변환
                var latlng = new Tmapv2.Point(
                  geometry.coordinates[j][0],
                  geometry.coordinates[j][1]
                );
                // 포인트 객체를 받아 좌표값으로 변환
                var convertPoint =
                  new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

                sectionInfos.push(convertPoint);
              }

              drawLine(sectionInfos, trafficArr);
            } else {
              var markerImg = "";
              var pType = "";

              if (properties.pointType == "S") {
                //출발지 마커
                markerImg =
                  "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                pType = "S";
              } else if (properties.pointType == "E") {
                //도착지 마커
                markerImg =
                  "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                pType = "E";
              } else {
                //각 포인트 마커
                markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                pType = "P";
              }

              // 경로들의 결과값들을 포인트 객체로 변환
              var latlon = new Tmapv2.Point(
                geometry.coordinates[0],
                geometry.coordinates[1]
              );
              // 포인트 객체를 받아 좌표값으로 다시 변환
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              var routeInfoObj = {
                markerImage: markerImg,
                lng: convertPoint._lng,
                lat: convertPoint._lat,
                pointType: pType,
              };
              // 마커 추가
              addMarkers(routeInfoObj);
            }
          } //for문 [E]
        } else {
          for (var i in resultData) {
            //for문 [S]
            var geometry = resultData[i].geometry;
            var properties = resultData[i].properties;

            if (geometry.type == "LineString") {
              for (var j in geometry.coordinates) {
                // 경로들의 결과값들을 포인트 객체로 변환
                var latlng = new Tmapv2.Point(
                  geometry.coordinates[j][0],
                  geometry.coordinates[j][1]
                );
                // 포인트 객체를 받아 좌표값으로 변환
                var convertPoint =
                  new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                // 포인트객체의 정보로 좌표값 변환 객체로 저장
                var convertChange = new Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
                );
                // 배열에 담기
                drawInfoArr.push(convertChange);
              }
              drawLine(drawInfoArr, "0");
            } else {
              var markerImg = "";
              var pType = "";

              if (properties.pointType == "S") {
                //출발지 마커
                markerImg =
                  "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                pType = "S";
              } else if (properties.pointType == "E") {
                //도착지 마커
                markerImg =
                  "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                pType = "E";
              } else {
                //각 포인트 마커
                markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                pType = "P";
              }

              // 경로들의 결과값들을 포인트 객체로 변환
              var latlon = new Tmapv2.Point(
                geometry.coordinates[0],
                geometry.coordinates[1]
              );
              // 포인트 객체를 받아 좌표값으로 다시 변환
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              var routeInfoObj = {
                markerImage: markerImg,
                lng: convertPoint._lng,
                lat: convertPoint._lat,
                pointType: pType,
              };

              // Marker 추가
              addMarkers(routeInfoObj);
            }
          } //for문 [E]
        }

        //
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const addMarkers = (infoObj) => {
    var size = new Tmapv2.Size(24, 38); //아이콘 크기 설정합니다.

    if (infoObj.pointType == "P") {
      //포인트점일때는 아이콘 크기를 줄입니다.
      size = new Tmapv2.Size(8, 8);
    }

    marker_p = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(infoObj.lat, infoObj.lng),
      icon: infoObj.markerImage,
      iconSize: size,
      map: map,
    });

    resultMarkerArr.push(marker_p);
  };
  
  const drawLine = (arrPoint, traffic) => {
    var polyline_;
    if (chktraffic.length != 0) {
      // 교통정보 혼잡도를 체크
      // strokeColor는 교통 정보상황에 다라서 변화
      // traffic :  0-정보없음, 1-원활, 2-서행, 3-지체, 4-정체  (black, green, yellow, orange, red)

      var lineColor = "";

      if (traffic != "0") {
        if (traffic.length == 0) {
          //length가 0인것은 교통정보가 없으므로 검은색으로 표시

          lineColor = "#06050D";
          //라인그리기[S]
          polyline_ = new Tmapv2.Polyline({
            path: arrPoint,
            strokeColor: lineColor,
            strokeWeight: 6,
            map: map,
          });
          resultdrawArr.push(polyline_);
          //라인그리기[E]
        } else {
          //교통정보가 있음

          if (traffic[0][0] != 0) {
            //교통정보 시작인덱스가 0이 아닌경우
            var trafficObject = "";
            var tInfo = [];

            for (var z = 0; z < traffic.length; z++) {
              trafficObject = {
                startIndex: traffic[z][0],
                endIndex: traffic[z][1],
                trafficIndex: traffic[z][2],
              };
              tInfo.push(trafficObject);
            }

            var noInfomationPoint = [];

            for (var p = 0; p < tInfo[0].startIndex; p++) {
              noInfomationPoint.push(arrPoint[p]);
            }

            //라인그리기[S]
            polyline_ = new Tmapv2.Polyline({
              path: noInfomationPoint,
              strokeColor: "#06050D",
              strokeWeight: 6,
              map: map,
            });

            //라인그리기[E]
            resultdrawArr.push(polyline_);

            for (var x = 0; x < tInfo.length; x++) {
              var sectionPoint = []; //구간선언

              for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                sectionPoint.push(arrPoint[y]);
              }

              if (tInfo[x].trafficIndex == 0) {
                lineColor = "#06050D";
              } else if (tInfo[x].trafficIndex == 1) {
                lineColor = "#61AB25";
              } else if (tInfo[x].trafficIndex == 2) {
                lineColor = "#FFFF00";
              } else if (tInfo[x].trafficIndex == 3) {
                lineColor = "#E87506";
              } else if (tInfo[x].trafficIndex == 4) {
                lineColor = "#D61125";
              }

              //라인그리기[S]
              polyline_ = new Tmapv2.Polyline({
                path: sectionPoint,
                strokeColor: lineColor,
                strokeWeight: 6,
                map: map,
              });

              //라인그리기[E]
              resultdrawArr.push(polyline_);
            }
          } else {
            //0부터 시작하는 경우

            var trafficObject = "";
            var tInfo = [];

            for (var z = 0; z < traffic.length; z++) {
              trafficObject = {
                startIndex: traffic[z][0],
                endIndex: traffic[z][1],
                trafficIndex: traffic[z][2],
              };
              tInfo.push(trafficObject);
            }

            for (var x = 0; x < tInfo.length; x++) {
              var sectionPoint = []; //구간선언

              for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                sectionPoint.push(arrPoint[y]);
              }

              if (tInfo[x].trafficIndex == 0) {
                lineColor = "#06050D";
              } else if (tInfo[x].trafficIndex == 1) {
                lineColor = "#61AB25";
              } else if (tInfo[x].trafficIndex == 2) {
                lineColor = "#FFFF00";
              } else if (tInfo[x].trafficIndex == 3) {
                lineColor = "#E87506";
              } else if (tInfo[x].trafficIndex == 4) {
                lineColor = "#D61125";
              }

              //라인그리기[S]
              polyline_ = new Tmapv2.Polyline({
                path: sectionPoint,
                strokeColor: lineColor,
                strokeWeight: 6,
                map: map,
              });
              //라인그리기[E]
              resultdrawArr.push(polyline_);
            }
          }
        }
      } else {
      }
    } else {
      polyline_ = new Tmapv2.Polyline({
        path: arrPoint,
        strokeColor: "#DD0000",
        strokeWeight: 6,
        map: map,
      });
      resultdrawArr.push(polyline_);
    }
  };

  const Map = (data1, data2, data3, data4) => {
    map = new Tmapv2.Map("map_div", {
      center: new Tmapv2.LatLng(data1, data2),
      width: "1000px",
      height: "750px",
      zoom: 13,
      zoomControl: true,
      scrollwheel: true,
    });
    marker_s = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(data1, data2),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    //도착
    marker_e = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(data3, data4),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });
    marker = new Tmapv2.Marker({
      position : new Tmapv2.LatLng(x,y),
      icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
      iconSize : new Tmapv2.Size(24, 38),
      map:map
});

   
  };

  function resettingMap() {
    //기존마커는 삭제
    marker_s.setMap(null);
    marker_e.setMap(null);

    if (resultMarkerArr.length > 0) {
      for (var i = 0; i < resultMarkerArr.length; i++) {
        resultMarkerArr[i].setMap(null);
      }
    }

    if (resultdrawArr.length > 0) {
      for (var i = 0; i < resultdrawArr.length; i++) {
        resultdrawArr[i].setMap(null);
      }
    }

    chktraffic = [];
    drawInfoArr = [];
    resultMarkerArr = [];
    resultdrawArr = [];
  }

  return {
    effectState, drawLineState, tDistance, tTime, taxiFare, showPtag, showModal, 
    isStartOpen, startX, startY, startLocal1,startLocal2, isArrivedOpen, arriveX, arriveY, 
    arriveLocal1,arriveLocal2, startAddr, arriveAddr,request,alarmCount,requestOpen,requestStartX,requestStartY,blockRequest,
    getCoords, getArrivedCoords, Close, PatchModal, Patch, requestComplete,
    openStartCode, handleComplete, openArriveCode, handleComplete2,requestCoord,
    FindWay, addMarkers, drawLine, Map, resettingMap,requestCarpool,RequestCreate,DeleteCarCont,RequestOpen,RequestClose,

  }
  
}

export default useCarPoolContents
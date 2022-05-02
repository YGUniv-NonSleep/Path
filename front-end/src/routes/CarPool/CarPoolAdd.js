import { ImportExport, KayakingOutlined, PropaneSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

const CommuCon = styled.div`
  width: 390px;
  height: 100%;
`;
const CommuSubCon = styled.div`
  margin-left: 130px;
`;

function CarPoolAdd(){
    let navigate = useNavigate();

    const [isStartOpen, setIsStartOpen] = useState(false);
    const [startX, setStartX] = useState(null);
    const [startY, setStartY] = useState(null);
    const [startLocal, setStartLocal] =useState(null);

    const [isArrivedOpen, setIsArrivedOpen] = useState(false);
    const [arriveX, setArriveX] = useState(null);
    const [arriveY, setArriveY] = useState(null);
    const [arriveLocal,setArriveLocal] = useState(null);
    const [dataset, setDataSet] = useState(null);
  
    var geocoder = new kakao.maps.services.Geocoder();

    function getCoords(data){
        geocoder.addressSearch(data, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
                    console.log(result[0].x)
                    console.log(result[0].y)
             }
            setStartX(result[0].x)
            setStartY(result[0].y)
        });  
    }
    
    function getArrivedCoords(data){
      geocoder.addressSearch(data,function(result,status){
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
           console.log(result[0].x)
           console.log(result[0].y)
          //var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        }
        setArriveX(result[0].x)
        setArriveY(result[0].y)
      });
    }
  

    const openStartCode = (e) =>{
        setIsStartOpen(true);
        setIsArrivedOpen(false);
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
      
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        console.log(data.sido)
        setStartLocal(data.sido)
        getCoords(fullAddress);
      };



      const openArrivedCode = (e) =>{
        setIsStartOpen(false);
        setIsArrivedOpen(true);
      }

      const handleComplete2 = (data) =>{
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
      
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        console.log(data.sido)
        setArriveLocal(data.sido)
        getArrivedCoords(fullAddress);
      };

      const CreateCarPost = (e) =>{
        e.preventDefault();
        var data = {
          title : e.target.title.value,
          content : e.target.content.value,
          recruit : e.target.recruit.value,
          sdate : e.target.sdate.value,
          edate : e.target.edate.value,
          stime : e.target.stime.value + ":00",
          startLongitude : startX,
          startLatitude : startY,
          arriveLongitude : arriveX,
          arriveLatitude : arriveY,
          local : arriveLocal,
          cars : {
            id : 1
          }
        }
        console.log(data)
        
        var formData = new FormData();
        formData.append("userfile", e.target.userfile.files[0]);
        formData.append(
          "key", new Blob([JSON.stringify(data)], { type: "application/json" })
        );
        axios.post(process.env.REACT_APP_SPRING_API + "/api/carpost/create",formData,{
          headers : {
            "Content-Type": `multipart/form-data`,
          }
        }) 
        .then((res)=>{
          console.log(res.data.body)
          setDataSet(res.data.body)
          alert(res.data.message)
          navigate(-1); 
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    return(
      <div className="CarPoolAdd">
        <CommuCon>
            <CommuSubCon>
              <>
                <form
                onSubmit={CreateCarPost}
                encType="multipart/form-data">
                    <input type="text" placeholder="제목을 입력하세요" name="title"></input>
                    <input type="text" placeholder="내용을 입력하세요" name="content"></input><br></br>
                    <input type="text" placeholder="탑승인원을 입력하세요" name="recruit"></input><br></br>
                    시작날짜 : <input type="date" name="sdate"></input><br></br>
                    종료날짜 : <input type="date" name="edate"></input><br></br>
                    출발시간 : <input type="time" name="stime"></input><br></br>
                    <button type="button" onClick={openStartCode}>출발지 검색</button>
                    <button type="button" onClick={openArrivedCode}>도착지 검색</button>
                    <input type="file" name="userfile" multiple="multiple" />
                    <button type="submit">작성하기</button>
                </form>
                <div id="popUpDom">
                        {isStartOpen ?
                            <div>
                              <DaumPostcode className="post-code" onComplete={handleComplete}/>
                            </div>
                          :''
                        }
                        {isArrivedOpen ?
                            <div>
                              <DaumPostcode className="post-code" onComplete={handleComplete2}/>
                            </div>
                            :''
                        }
                    </div>
              </>        
            </CommuSubCon>
        </CommuCon>
     </div>
    );

}

export default CarPoolAdd;
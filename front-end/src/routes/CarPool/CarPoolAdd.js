import { ImportExport, KayakingOutlined, PropaneSharp } from "@mui/icons-material";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
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
    const [subadd, setSub] = useState(null);
    const [isPopupOpen, setIsPopUpOpen] = useState(false);
    const [insertPoint,setInsertPoint] = useState('');

    var geocoder = new kakao.maps.services.Geocoder();

    function getCoords(data){
        geocoder.addressSearch(data, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
                    console.log(result);
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });  
    }
  

    const openPostCode = (e) =>{
        setIsPopUpOpen(true);
    }
    const handleComplete = (data) => {
        const addr = data.query;
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
        getCoords(addr);
      };


    return(
      <div className="CarPoolAdd">
        <CommuCon>
            <CommuSubCon>
                <form
                //onSubmit={CreateCarPost}
                encType="multipart/form-data">
                    <input type="text" placeholder="제목을 입력하세요" name="title"></input>
                    <input type="text" placeholder="내용을 입력하세요" name="content"></input><br></br>
                    <button type="button" onClick={openPostCode}>우편번호 검색</button>
                    <div id="popUpDom">
                        {isPopupOpen && (
                            <DaumPostcode className="post-code" onComplete={handleComplete}/>
                        )}
                </div>
                </form>       
            </CommuSubCon>
        </CommuCon>
     </div>
    );

}

export default CarPoolAdd;
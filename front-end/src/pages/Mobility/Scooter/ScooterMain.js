import PropTypes from "prop-types";
import styled from "styled-components";
import MIcon from "../MIcon";
import Map from "../../../components/Map";
import useLoading from '../../../hooks/useLoading';
import useScooterIcon from '../hooks/useScooterIcon';
import BatteryIcon from '@mui/icons-material/Battery60';
import { ConnectingAirportsOutlined, DonutLarge } from "@mui/icons-material";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  border-radius : 2px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 380px;
  height: 90px;
`;

const BarContainer = styled.div`
  z-index: 5;
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

const Modal = styled.div`
position: absolute;
left: 600px;
top: 720px;
width: 460px;
height: 180px;
background-color: white;
border-radius : 10px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ScootNum = styled.div`
position: relative;
top: 13px;
left: 13px;
font-size: 16px;
font-weight: bold;
`;

const UnlockCost = styled.div`
position: relative;
bottom: 30px;
left: 345px;
font-size: 14px;
`;

const MinuteCost = styled.div`
position: relative;
left: 378px;
bottom: 20px;
font-size: 14px;
`;

const UseStart = styled.button`
position: relative;
top: 40px;
left: 75px;
width: 150px;
height: 40px;
border-radius: 15px;
border: none;
outline:none;
background-color: #1ABC9C;
  &:hover {
    background-color: #00A98F;
  };
`;

const Reserve = styled.button`
position: relative;
top: 40px;
left: 90px;
width: 150px;
height: 40px;
border-radius: 15px;
border: none;
outline:none;
background-color: #1ABC9C;
&:hover {
  background-color: #00A98F;
}
`;

const Battery = styled.div`
position: relative;
top: 20px;
left: 5px;
width: 100px;
height: 30px;
font-size: 11px;
`;

const Num = styled.div`
position: relative;
bottom: 21px;
left: 30px;
font-size: 11px;
color: gray;
`;

const ResIng = styled.div`
position: relative;
top: 15px;
font-size: 14px;
color: gray;
`

const Timer = styled.div`
position: relative;
top: 25px;
font-size: 28px;
font-weight: bold;
`;

const ScootNum1 = styled.div`
position: relative;
bottom: 62px;
left: 15px;
font-size: 16px;
font-weight: bold;
`;

const Battery1 = styled.div`
position: relative;
bottom: 60px;
left: 5px;
width: 100px;
height: 30px;
font-size: 11px;
`;

const UseStart1 = styled.button`
position: relative;
left: 75px;
width: 300px;
height: 40px;
border-radius: 15px;
border: none;
outline:none;
background-color: #1ABC9C;
  &:hover {
    background-color: #00A98F;
  }
`;

const ResBox = styled.div`
position: relative;
left: 75%;
text-align: right;
width: 100px;
height: 80px;
`;

const MobilID = styled.div`
position: relative;
top: 10px;
left: 10px;
font-weight: bold;
`;

const Line = styled.hr`
position: relative;
top: 10px;
width: 100%;
border: 0;
height: 2px;
background: #ccc;
`;

const Battery2 = styled.div`
position: relative;
top: 20px;
left: 20px;
font-size: 25px;
font-weight: bold;
`;

const Battery3 = styled.div`
position: relative;
top: 30px;
left: 20px;
`;

const UseStop = styled.button`
position: relative;
top: 55px;
left: 80px;
width: 300px;
height: 40px;
border-radius: 15px;
border: none;
outline:none;
background-color: #1ABC9C;
  &:hover {
    background-color: #00A98F;
  }
`;


function ScooterMain() {
  const { loading } = useLoading();
  const { modal, mobilData, reserve, modalRes, minutes, seconds, useStart, startMod, send, useStop} = useScooterIcon();

  return (
    <div className="Mobility">
      <SideNav>
        <BarContainer>
          <MIcon />
        </BarContainer>
        {modal == "open" ? 
        <Modal>
          <ScootNum>#{mobilData.id}</ScootNum>
          <Battery><BatteryIcon sx={{fontSize: 30, color: "#00A98F"}} /><Num>{mobilData.battery}%</Num></Battery>
          <UnlockCost>잠금 해제 {mobilData.mobilityCompany.unlockFee}</UnlockCost>
          <MinuteCost>분당 {mobilData.mobilityCompany.minuteFee}</MinuteCost>
          <UseStart onClick={(e) => {useStart(mobilData, e)}} value="useStart">이용 시작</UseStart>
          <Reserve onClick={reserve} value="reserve">예약 하기</Reserve>
          {}
        </Modal> 
        : modalRes == "openRes" ? 
        <Modal>
          {minutes != 0 ? 
          <>
          <ResBox>
          <ResIng>예약중</ResIng>
          <Timer>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Timer>
          </ResBox>
          <ScootNum1>#{mobilData.id}</ScootNum1>
          <Battery1><BatteryIcon sx={{fontSize: 30, color: "#00A98F"}} /><Num>{mobilData.battery}%</Num></Battery1>
          <UseStart1 onClick={(e) => {useStart(mobilData, e)}} value="useStart">이용 시작</UseStart1>
          </> : 
          <>
          <ResBox>
          <ResIng>예약중</ResIng>
          <Timer>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Timer>
          </ResBox>
          <ScootNum1>#{mobilData.id}</ScootNum1>
          <Battery1><BatteryIcon sx={{fontSize: 30, color: "#00A98F"}} /><Num>{mobilData.battery}%</Num></Battery1>
          </>
          }
        </Modal>
        
        : startMod == "open" ? 
        <Modal>
          <MobilID>{send.mobilityCompany.name}{" "}#{send.id}</MobilID>
          <Line/>
          <Battery2>{send.battery}%</Battery2>
          <Battery3>배터리 잔량</Battery3>
          <UseStop onClick={useStop} value="useStop">이용 종료</UseStop>
        </Modal>

        :<></>

        }
        
        
      </SideNav>
     
      <Map />
    </div>
  );
}

ScooterMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ScooterMain;

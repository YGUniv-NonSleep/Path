import Map from "../../../components/Map";
import MIcon from "../MIcon";
import styled from "styled-components";
import PropTypes from "prop-types";
import useLoading from '../../../hooks/useLoading';
import useBikeIcon from '../hooks/useBikeIcon';
import BatteryIcon from '@mui/icons-material/Battery60';

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
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

function BikeMain() {
  const { loading } = useLoading();
  const {modal, mobilData} = useBikeIcon();

  return (
    <div className="Mobility">
      <SideNav>
        <MIcon />
        <BarContainer>
          
        </BarContainer>
        {modal == "open" ? 
        <Modal>
          <ScootNum>#{mobilData.id}</ScootNum>
          <Battery><BatteryIcon sx={{fontSize: 30, color: "#00A98F"}} /><Num>{mobilData.battery}%</Num></Battery>
          <UnlockCost>잠금 해제 {mobilData.mobilityCompany.unlockFee}</UnlockCost>
          <MinuteCost>분당 {mobilData.mobilityCompany.minuteFee}</MinuteCost>
          <UseStart>이용 시작</UseStart>
          <Reserve>예약 하기</Reserve>
        </Modal> 
        
        : <></>}
      </SideNav>
      <Map />
    </div>
  );
}

BikeMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BikeMain;

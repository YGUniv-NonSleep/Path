import styled from "styled-components";
import { 
  Typography 
 } from "@mui/material";
import {
  JoinFull, DirectionsWalk, PedalBike, DirectionsBus, 
  DirectionsSubway, ElectricScooter, DirectionsCarFilled
 } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index:100;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const Top = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

const Top2 = styled.li`
  text-align: center;
`;

const Side = () => {

  return (
      <SideNav>
        <Top>
          <Top2>
            <IconButton color="primary">
              <JoinFull />
            </IconButton>
            <Typography variant="subtitle2">통합</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsBus />
            </IconButton>
            <Typography variant="subtitle2">버스</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsSubway />
            </IconButton>
            <Typography variant="subtitle2">지하철</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <ElectricScooter />
            </IconButton>
            <Typography variant="subtitle2">킥보드</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <PedalBike />
            </IconButton>
            <Typography variant="subtitle2">자전거</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsWalk />
            </IconButton>
            <Typography variant="subtitle2">도보</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsCarFilled />
            </IconButton>
            <Typography variant="subtitle2">자동차</Typography>
          </Top2>
        </Top>
      </SideNav>
  );
};

export default Side;

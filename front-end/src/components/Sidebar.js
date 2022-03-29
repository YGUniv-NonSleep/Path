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
  z-index:5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const Ul = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

const Li = styled.li`
  text-align: center;
`;

const BarContainer = styled.div`
  z-index: 10
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

const Btn = styled.button`
  z-index: 10;
  margin-left: 130px;
`;

const Sidebar = () => {
  
  return (
      <SideNav>
        <Ul>
          <Li>
            <IconButton color="primary">
              <JoinFull />
            </IconButton>
            <Typography variant="subtitle2">통합</Typography>
          </Li>
          <Li>
            <IconButton color="primary">
              <DirectionsBus />
            </IconButton>
            <Typography variant="subtitle2">버스</Typography>
          </Li>
          <Li>
            <IconButton color="primary">
              <DirectionsSubway />
            </IconButton>
            <Typography variant="subtitle2">지하철</Typography>
          </Li>
          <Li>
            <IconButton color="primary">
              <ElectricScooter />
            </IconButton>
            <Typography variant="subtitle2">킥보드</Typography>
          </Li>
          <Li>
            <IconButton color="primary">
              <PedalBike />
            </IconButton>
            <Typography variant="subtitle2">자전거</Typography>
          </Li>
          <Li>
            <IconButton color="primary">
              <DirectionsWalk />
            </IconButton>
            <Typography variant="subtitle2">도보</Typography>
          </Li>
          <Li>
            <IconButton color="primary">
              <DirectionsCarFilled />
            </IconButton>
            <Typography variant="subtitle2">자동차</Typography>
          </Li>
        </Ul>
        <BarContainer>
          <Btn>임시 길찾기 버튼</Btn>
        </BarContainer>
      </SideNav>
  );
};

export default Sidebar;

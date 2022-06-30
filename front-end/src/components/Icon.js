import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import {
  JoinFull,
  DirectionsWalk,
  PedalBike,
  DirectionsBus,
  DirectionsSubway,
  ElectricScooter,
  DirectionsCarFilled,
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const Ul = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

const Li = styled.li`
  text-align: center;
`;

const Icon = ({ setSearchType }) => {
  // 통합, 대중교통, 모빌리티, 도보, 자동차 하나씩만 선택하고, 결과에서 필터
  return (
    <Ul>
      <Li>
        <IconButton color="primary" onClick={() => setSearchType(0)}>
          <JoinFull />
        </IconButton>
        <Typography variant="subtitle2">통합</Typography>
      </Li>

      <Li>
        <IconButton color="primary" onClick={() => setSearchType(2)}>
          <DirectionsBus />
        </IconButton>
        <Typography variant="subtitle2">버스</Typography>
      </Li>

      <Li>
        <IconButton color="primary" onClick={() => setSearchType(1)}>
          <DirectionsSubway />
        </IconButton>
        <Typography variant="subtitle2">지하철</Typography>
      </Li>

      <Li>
        <IconButton color="primary" onClick={() => setSearchType(3)}>
          <ElectricScooter />
        </IconButton>
        <Typography variant="subtitle2">킥보드</Typography>
      </Li>

      <Li>
        <IconButton color="primary" onClick={() => setSearchType(4)}>
          <PedalBike />
        </IconButton>
        <Typography variant="subtitle2">자전거</Typography>
      </Li>

      <Li>
        <IconButton color="primary" onClick={() => setSearchType(5)}>
          <DirectionsWalk />
        </IconButton>
        <Typography variant="subtitle2">도보</Typography>
      </Li>
    </Ul>
  );
};

export default Icon;

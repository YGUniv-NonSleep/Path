import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';

function MainListItems(props) {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="마이페이지" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="결제내역" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="이용내역" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="예약내역" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="이용금액" />
      </ListItemButton>
    </React.Fragment>
  );
}

function SecondaryListItems(props) {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        환경 설정
      </ListSubheader>
      <ListItemButton component={Link} to="/member/update">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="정보 수정" />
      </ListItemButton>
      <ListItemButton component={Link} to="/member/card">
        <ListItemIcon>
          <AddCardIcon />
        </ListItemIcon>
        <ListItemText primary="카드 관리" />
      </ListItemButton>
      <ListItemButton component={Link} to="/member/cars">
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="차량 관리" />
      </ListItemButton>
      <ListItemButton component={Link} to="/member/Confirmation">
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="카풀 신청서" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DeleteForeverIcon />
        </ListItemIcon>
        <ListItemText
          primary="회원 탈퇴"
          onClick={() => props.deleteMember()}
        />
      </ListItemButton>
    </React.Fragment>
  );
}

export { MainListItems, SecondaryListItems };

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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import axios from 'axios';

function MainListItems(props) {
  return (
    <React.Fragment>
      <ListItemButton component={Link} to="/member">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="마이페이지" />
      </ListItemButton>

      <ListItemButton component={Link} to="/member/payments">
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
  let state = useSelector((state) => state);
  const [feedBack, setFeedBack] = useState(false);
  const [send, setSend] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SPRING_API + `/api/request/${state.user.id}`)
      .then((res) => {
        const result = res.data.body;
        for (var i = 0; i < result.length; i++) {
          if (result[i].approval == null) {
            setFeedBack(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          `/api/request/sending/${state.user.id}`
      )
      .then((res) => {
        const result = res.data.body;
        for (var i = 0; i < result.length; i++) {
          if (result[i].state != 'accept') {
            setSend(true);
          } else {
            setSend(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        카풀
      </ListSubheader>

      <ListItemButton component={Link} to="/member/cars">
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="차량 관리" />
      </ListItemButton>

      {send ? (
        <ListItemButton component={Link} to="/member/SendingConfirm">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="보낸 신청서" />
          <FeedbackOutlinedIcon
            sx={{ color: '#FF0000' }}
          ></FeedbackOutlinedIcon>
        </ListItemButton>
      ) : (
        <ListItemButton component={Link} to="/member/SendingConfirm">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="보낸 신청서" />
        </ListItemButton>
      )}

      {feedBack ? (
        <>
          <ListItemButton component={Link} to="/member/Confirmation">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="받은 신청서" />
            <FeedbackOutlinedIcon
              sx={{ color: '#FF0000' }}
            ></FeedbackOutlinedIcon>
          </ListItemButton>
        </>
      ) : (
        <ListItemButton component={Link} to="/member/Confirmation">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="받은 신청서" />
        </ListItemButton>
      )}

      <ListItemButton component={Link} to="/member/operation">
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="운행내역" />
      </ListItemButton>

      <ListItemButton component={Link} to="/member/boarding">
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="탑승내역" />
      </ListItemButton>

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

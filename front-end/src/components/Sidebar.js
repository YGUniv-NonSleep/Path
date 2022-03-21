import React from "react";
import JoinFullIcon from '@mui/icons-material/JoinFull';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";

const SideNav = styled.nav`
position: fixed;
left: 95px;
z-index:100;
background-color: white;
box-shadow: 3px 3px 3px gray;
width: 390px;
height: 100%;
`;

const Top = styled.div`
position: fixed;
top: 10px;
left: 110px;
display: grid;
grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

const Top1 = styled.div`
position: fixed;
top:50px;
left: 120px;
font-size: 12px;
display: grid;
grid-template-columns: 52px 46px 52px 52px 53px 45px 50px;
`;


const Side = () => {
    return (
        <SideNav>
         <Top>
         <IconButton color="primary"><JoinFullIcon /></IconButton>
         <IconButton color="primary"><DirectionsBusIcon /></IconButton>
         <IconButton color="primary"><DirectionsSubwayIcon /></IconButton>
         <IconButton color="primary"><ElectricScooterIcon /></IconButton>
         <IconButton color="primary"><PedalBikeIcon /></IconButton>
         <IconButton color="primary"><DirectionsWalkIcon /></IconButton>
         <IconButton color="primary"><DirectionsCarFilledIcon /></IconButton>
         </Top>

         <Top1>
             <div>통합</div>
             <div>버스</div>
             <div>지하철</div>
             <div>킥보드</div>
             <div>자전거</div>
             <div>도보</div>
             <div>자동차</div>

         </Top1>

        </SideNav>
    );
}

export default Side;
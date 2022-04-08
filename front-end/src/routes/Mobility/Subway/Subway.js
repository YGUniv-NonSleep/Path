import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MIcon from "../MIcon";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const BarContainer = styled.div`
  z-index: 10
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

const Ul = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
`;

const Btn = styled.button`
position: absolute;
top: 160px;
left: 10px;
width: 182px;
height: 40px;
font-size: 12px;
`;

const Btn1 = styled.button`
position: absolute;
top: 160px;
left: 190px;
width: 180px;
height: 40px;
font-size: 12px;
`;

const Subway = () => {
  return (
    <SideNav>
      <MIcon />

      <Ul>
        
      </Ul>

      <BarContainer>
        <TextField
          sx={{ left: "15px", width: "360px" }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Btn>시간표</Btn>
        <Btn1>출구정보</Btn1>

      </BarContainer>
    </SideNav>
  );
};

export default Subway;

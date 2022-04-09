import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MIcon from "../MIcon";
import Box from "@mui/material/Box";

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
  margin-top: 150px;
`;

const Ul = styled.ul`
  position: fixed;
  top: 75px;
  left: 110px;
`;

const Btn = styled.button`
  position: absolute;
  top: 20px;
  left: 2px;
  width: 180px;
  height: 40px;
`;

const Station = styled.button`
  position: absolute;
  top: 20px;
  left: 180px;
  width: 180px;
  height: 40px;
`;

const Text = styled.p`
  position: absolute;
  top: 230px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line = styled.hr`
  position: absolute;
  top: 250px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const Text1 = styled.p`
  position: absolute;
  top: 400px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line1 = styled.hr`
  position: absolute;
  top: 420px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const Bus = (props) => {
  // console.log(props.onChange)
  return (
    <SideNav>
      <MIcon />
      <Ul>
        <Btn>버스</Btn>
        <Station>버스정류장</Station>
      </Ul>

      <BarContainer>
        <Box 
        component="form"
        noValidate
        onSubmit={props.submit}
        sx={{mt:3}}
        >  
          <TextField
          sx={{ left: "15px", width: "360px" }}
          size="small"
          id="busNo"
          name="busNo"
          value={props.busNo}
          onChange={props.onChange}
          onKeyPress={(e) => {
            if(e.key === 'Enter'){
              return props.submit
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {" "}
                <SearchIcon />{" "}
              </InputAdornment>
            ),
          }}
        />
        </Box>
        

        <Text>최근 검색</Text>
        <Line></Line>
        <Text1>즐겨찾기한 버스</Text1>
        <Line1></Line1>
      </BarContainer>
    </SideNav>
  );
};

export default Bus;

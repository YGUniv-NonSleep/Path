import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Icon from "../../../components/Icon";

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

const Scooter = () => {
  return (
    <SideNav>
      <Icon />

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
      </BarContainer>
    </SideNav>
  );
};

export default Scooter;

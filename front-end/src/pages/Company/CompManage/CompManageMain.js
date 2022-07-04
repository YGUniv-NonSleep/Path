import { useParams, Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../../hooks/useLoading";
import useCompManageMain from "./hooks/useCompManageMain";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["상품 목록", "업체 수정", "업체 탈퇴"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function CompManageMain() {
  const { loading } = useLoading();
  const { comId } = useParams();
  const {} = useCompManageMain();

  return (
    <div>
      {loading ? (
        <div>
          <AppBar position="static" sx={{ marginLeft: "95px", backgroundColor: 'rgba(0,0,0,0.4)'  }}>
            <Container maxWidth="xl" sx= {{marginLeft: "unset"}} >
              <Toolbar disableGutters>
                                
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",                
                    textDecoration: "none",
                    
                  }}
                ></Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Link to="items">
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      상품 목록
                    </Button>
                  </Link>
                  <Link to="compEdit">
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      업체정보 수정
                    </Button>
                  </Link>
                  <Link to="resign">
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      업체 탈퇴
                    </Button>
                  </Link>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Outlet context={comId}></Outlet>
        </div>
      ) : (
        <h2>로드 중...</h2>
      )}
    </div>
  );
}

CompManageMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CompManageMain;

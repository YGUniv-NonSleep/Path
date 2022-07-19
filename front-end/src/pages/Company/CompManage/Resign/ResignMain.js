import { useNavigate, Link } from "react-router-dom";
import useLoading from "../../../../hooks/useLoading";
import useCompResign from "../hooks/useCompResign";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Path콕! {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

function ResignMain() {
  const { loading } = useLoading();
  const {} = useCompResign();

  return loading ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 1,
          }}
        >
          <Container maxWidth="sm" sx={{ marginTop: "120px" }}>
            <WarningIcon
              color="warning"
              sx={{
                fontSize: "5rem",
                display: "flex",
                margin: "20px auto 30px",
              }}
            />
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight={"normal"}
            >
              업체 회원 탈퇴
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight={"normal"}
            >
              탈퇴하시면 "Path콕!" 의 업체 서비스를 이용할 수 없습니다.
            </Typography>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 4,
                pb: 6,
              }}
            >
              <Button
                align="center"
                variant="outlined"
                color="error"
                onClick={() => navigate("/oder")}
                sx={{ display: "flex", margin: "60px auto 0" }}
              >
                오더로 이동
              </Button>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button 
                  sx={{fontSize: "23px", width: "225px"}} 
                  variant="outlined" 
                  color="success" 
                  onClick={()=>navigate("/oder")}
                >오더로 이동</Button>
                <Button 
                  sx={{fontSize: "23px", marginLeft: "15px"}} 
                  variant="outlined" 
                  color="success" 
                  onClick={()=>navigate("/member/payments")}
                >결제내역으로 이동</Button>
               </div>
            </Box>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 1 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  ) : (
    <h2>로드 중...</h2>
  );
}

ResignMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ResignMain;

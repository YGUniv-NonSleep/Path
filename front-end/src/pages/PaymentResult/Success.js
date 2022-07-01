import {
  Button,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Typography,
  Container,
  Modal,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import TextField from "@mui/material/TextField";

import useSuccess from "./hooks/useSuccess";

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

function Success() {
  const {} = useSuccess();
  const navigate = useNavigate();

  return (
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
            <CheckCircleIcon color="success" sx={{ fontSize: "5rem", display: "flex", margin: "20px auto 30px" }} />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight={"normal"}
            >
              결제 성공!
            </Typography>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                }}
            >
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
  );
}

export default Success;

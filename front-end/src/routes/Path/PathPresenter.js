import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../Components/Map";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tops from "../../Components/Top";
import Footers from "../../Components/Footer";

function PathPresenter(props) {
  return (
    <div className="Path">
      <CssBaseline />
      <Container fixed>
        <Tops text="탑 네비">
            <Link to="/login">로그인 화면 이동</Link>
        </Tops>
        <Box sx={{ bgcolor: "#cfe8fc", height: "50vh" }} >
            
            {props.loading ? <p>맵 나왔다</p> : <h2>로드 중...</h2>}
            <Map></Map>
        </Box>
        <Box sx={{ bgcolor: "#cfe8fc", height: "8vh" }} >
            <Footers text="푸터"></Footers>
        </Box>
      </Container>
    </div>
  );
}

PathPresenter.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PathPresenter;

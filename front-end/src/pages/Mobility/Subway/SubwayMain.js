import Map from "../../../components/Map";
import styled from "styled-components";
import PropTypes from "prop-types";
import { 
  InputAdornment, TextField, Box 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MIcon from "../MIcon";
import useLoading from '../../../hooks/useLoading';
import useSubwayInfo from "../hooks/useSubwayInfo";

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
  left: 200px;
  width: 180px;
  height: 40px;
  font-size: 12px;
`;

function SubwayMain() {
  const { loading } = useLoading();
  const {
    subName, 
    submit, onChanged, 
  } = useSubwayInfo();

  return (
    <div className="Mobility">
      <SideNav>
        <MIcon />

        {/* { loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> } */}

        <Ul></Ul>

        <BarContainer>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <TextField
              sx={{ left: "15px", width: "360px" }}
              size="small"
              id="subName"
              name="subName"
              value={subName}
              onChange={onChanged}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  return submit;
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

          <Btn>시간표</Btn>
          <Btn1>출구정보</Btn1>
        </BarContainer>
      </SideNav>
      <Map />
    </div>
  );
}

SubwayMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SubwayMain;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import useLoading from "../../../../hooks/useLoading";
import useCompEdit from "../hooks/useCompEdit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const theme = createTheme();

function CompEditMain() {
  const { loading } = useLoading();
  const { updateForm, handleInput, updateCompInfo } = useCompEdit();
  console.log(updateForm);
  return (
    <>
      {loading ? null : <h2>로드 중...</h2>}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              padding: "100px 0 0 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
            <Typography component="h1" variant="h4">
              업체정보 수정
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={updateCompInfo}
              sx={{ mt: 3 }}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                      required
                      autoFocus
                      fullWidth
                      value={updateForm.name}
                      onChange={handleInput}
                      id="compName"
                      name="compName"
                      label="업체명"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        카테고리
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="category"
                        label="카테고리"
                        value={updateForm.category}
                        name="category"
                      >
                        <MenuItem value={"CONVENIENCESTORE"}>편의점</MenuItem>
                        <MenuItem value={"CAFE"}>카페</MenuItem>
                        <MenuItem value={"RESTAURANT"}>레스토랑</MenuItem>
                        <MenuItem value={"MART"}>마트</MenuItem>
                        <MenuItem value={"HOSPITAL"}>병원</MenuItem>
                        <MenuItem value={"PHARMACY"}>약국</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={updateForm.mail}
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={updateForm.phone}
                      id="phone"
                      name="phone"
                      label="전화번호 (010-XXXX-XXXX)"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={updateForm.companyNumber}
                      id="companyNumber"
                      name="companyNumber"
                      label="사업자등록번호"
                    />
                  </Grid>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={12}>
                    <TimePicker
                    label="Open Time"
                    value={updateForm.open}
                    // onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TimePicker
                    label="Close Time"
                    value={updateForm.close}
                    // onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  </LocalizationProvider>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={updateForm.waitTime}
                      type="number"
                      id="waitTime"
                      name="waitTime"
                      label="주문대기시간"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Image Upload
                      <input multiple type="file" />
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="button" variant="contained">
                      주소찾기
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="addr"
                      name="addr"
                      label="주소"
                      disabled
                      value={updateForm.addr}
                      defaultValue=" "
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="addrDetail"
                      name="addrDetail"
                      value={updateForm.addrDetail}
                      label="상세주소"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="addrExtra"
                      name="addrExtra"
                      label="참고항목"
                      // onChange={handleInput}
                      disabled
                      defaultValue=" "
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                >
                  정보수정
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 10 }}
                  size="large"
                >
                  돌아가기
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

CompEditMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CompEditMain;

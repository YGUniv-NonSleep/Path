import CssBaseline from '@mui/material/CssBaseline';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import MuiLink from '@mui/material/Link';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  FormHelperText,
  FormControl,
  Typography,
  Container,
  AdapterDateFns,
  LocalizationProvider,
  MenuItem,
  DatePicker,
  InputLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Select,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useUpdateMem from '../hooks/useUpdateMem';
import useSignUp from '../hooks/useSignUp';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const theme = createTheme();

function UpdateMemMain() {
  const {
    errorList,
    goBackPage,
    handleInput,
    handleAddrInput,
    handleSubmit,
    daumAddrApi,
  } = useUpdateMem();

  // valid check -> email, phone, addr, addrDetail

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: '180px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h4">
            회원수정
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={handleInput}
                    error={errorList.emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="전화번호 (010-XXXX-XXXX)"
                    onChange={handleInput}
                    error={errorList.phoneError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.phoneError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    sx={{ mr: 2, verticalAlign: 'middle' }}
                    id="postId"
                    name="postId"
                    label="우편번호"
                    disabled
                    defaultValue={' '}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    onClick={async () => daumAddrApi()}
                    endIcon={<LocalPostOfficeIcon />}
                  >
                    주소찾기
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    id="addr"
                    name="addr"
                    label="주소"
                    defaultValue={' '}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="addrDetail"
                    name="addrDetail"
                    label="상세주소"
                    onChange={handleInput}
                    error={errorList.addrDetailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.addrDetailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="addrExtra"
                    name="addrExtra"
                    label="참고항목"
                    disabled
                    defaultValue={' '}
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
                회원 수정
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => goBackPage()}
              >
                돌아가기
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateMemMain;

import styled from 'styled-components';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  FormHelperText,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

function SearchPw(props) {
  const { loginIdError, phoneError } = props.errorList;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          padding: '60px 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <KeyIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          비밀번호 찾기
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={props.handleSearchSubmit}
          sx={{ mt: 3 }}
        >
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  id="loginId"
                  name="loginId"
                  label="아이디"
                  onChange={props.handleInput}
                  error={loginIdError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{loginIdError}</FormHelperTexts>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  label="전화번호 (010-XXXX-XXXX)"
                  onChange={props.handleInput}
                  error={phoneError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{phoneError}</FormHelperTexts>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              비밀번호 찾기
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default SearchPw;

import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  Grid,
  TextField,
  Button,
  Container,
  CssBaseline,
  Avatar,
  createTheme,
  Typography,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useSearchId from '../hooks/useSearchId';
import { Link } from 'react-router-dom';

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link to="/">Your Website </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SearchIdMain() {
  const { inputValue, handleInput, handleSubmit, nameError, emailError } =
    useSearchId();

  // valid check -> name, email

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            아이디 찾기
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
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    value={inputValue.name}
                    onChange={handleInput}
                    error={nameError !== '' || false}
                    helperText={nameError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="이메일"
                    value={inputValue.email}
                    onChange={handleInput}
                    error={emailError !== '' || false}
                    helperText={emailError}
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
                아이디 찾기
              </Button>
            </FormControl>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

SearchIdMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchIdMain;

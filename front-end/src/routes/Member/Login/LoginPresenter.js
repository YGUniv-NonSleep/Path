import { Link } from "react-router-dom";
import { 
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Grid, Box, Typography, Container 
} from '@mui/material'
import MuiLink from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <MuiLink color="inherit" underline="none" variant="body2">
        <Link to="/">
          Your Website
        </Link>
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function LoginPresenter(props) {
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={props.handleInput}
              id="loginId"
              label="아이디"
              name="loginId"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={props.handleInput}
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={props.handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button onClick={props.testSubmit}>테스트 버튼</Button>
            <Button onClick={props.testUserSubmit}>유저 테스트 버튼</Button>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <MuiLink color="inherit" underline="hover" variant="body2">
                  <Link to="/searchId">
                    아이디를 잊으셨나요?
                  </Link>
                </MuiLink>
              </Grid>
              <Grid item xs={3}>
                <MuiLink color="inherit" underline="hover" variant="body2">
                  <Link to="/searchPw">
                    비밀번호를 잊으셨나요?
                  </Link>
                </MuiLink>
              </Grid>
              <Grid item xs={3}>
                <MuiLink color="inherit" underline="hover" variant="body2">
                  <Link to="/signup">
                    {'회원가입'}
                  </Link>
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default LoginPresenter;

import styled from 'styled-components';
import {
  Box,
  FormControl,
  Grid,
  TextField,
  Button,
  Container,
  CssBaseline,
  Avatar,
  FormHelperText,
  createTheme,
  Typography,
  ThemeProvider,
} from '@mui/material';
import { LockOpen } from '@mui/icons-material';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

function SearchId(props) {
  const theme = createTheme();
  const { nameError, emailError, registerError } = props.errorList;

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
          <Avatar component="h1" variant="h4">
            <LockOpen />
          </Avatar>
          <Typography component="h1" variant="h4">
            아이디 찾기
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={props.handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    onChange={props.handleInput}
                    error={nameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    label="이메일"
                    onChange={props.handleInput}
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
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
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SearchId;

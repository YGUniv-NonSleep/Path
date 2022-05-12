import styled from "styled-components";
import PropTypes from "prop-types";
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
} from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import useSearchId from "../hooks/useSearchId";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const theme = createTheme();

const SearchIdCon = styled.div`
  width: 390px;
  height: 100%;
`;

const SearchIdSubCon = styled.div`
  margin-left: 130px;
`;

function SearchIdMain() {
  const {
    inputValue, 
    handleInput, handleSubmit
  } = useSearchId();

  // valid check -> name, email

  return (
    <SearchIdCon>
      <SearchIdSubCon>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="이름"
                value={inputValue.name}
                onChange={handleInput}
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
              />
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
      </SearchIdSubCon>
    </SearchIdCon>
  );
}

SearchIdMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchIdMain;

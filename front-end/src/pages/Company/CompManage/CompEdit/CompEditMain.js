import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../../hooks/useLoading';
import useCompEdit from '../hooks/useCompEdit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
  } from '@mui/material';

const theme = createTheme();

function CompEditMain() {
    const { loading } = useLoading();
    const { comInfo } = useCompEdit();
    console.log(comInfo)
    return (
        <>
            { loading ? null : <h2>로드 중...</h2> }
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    
                    <Box
                    sx={{
                        padding: '100px 0 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                    <Typography component="h1" variant="h4">
                        회원가입
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        // onSubmit={alert("SD")}
                        sx={{ mt: 3 }}
                    >
                        <FormControl component="fieldset" variant="standard">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                회원유형
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="role"
                                label="회원유형"
                                value={""}
                                name="role"
                                >
                                <MenuItem value={'ROLE_MEMBER'}>일반회원</MenuItem>
                                <MenuItem value={'ROLE_BUSINESS'}>업체회원</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                id="loginId"
                                name="loginId"
                                label="아이디"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
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
                                type="password"
                                id="password"
                                name="password"
                                label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                label="비밀번호 재입력"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="이름"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                name="phone"
                                label="전화번호 (010-XXXX-XXXX)"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <Button
                                type="button"
                                variant="contained"
                            >
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
                                defaultValue=" "
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="addrDetail"
                                name="addrDetail"
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
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                <Checkbox color="primary" />
                                }
                                label="회원가입 약관에 동의합니다."
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
                            회원가입
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
    )
}

CompEditMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CompEditMain;
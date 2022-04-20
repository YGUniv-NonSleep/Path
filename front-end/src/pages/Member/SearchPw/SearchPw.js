import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Box, FormControl, Grid, TextField, Button } from '@mui/material'

const SearchPwCon = styled.div`
    width: 390px;
    height: 100%;
`;

const SearchPwSubCon = styled.div`
    margin-left: 130px;
`;

function SearchPw(props) {
    // console.log(props)
    return (
        <SearchPwCon>
            <SearchPwSubCon>

                <Box
                    component="form"
                    noValidate
                    onSubmit={props.handleUserFind}
                    sx={{ mt: 3 }}
                >
                    <FormControl component="fieldset" variant="standard">
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userId"
                                name="userId"
                                label="아이디"
                                value={props.userId}
                                onChange={props.onChanged}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                name="phone"
                                label="전화번호"
                                value={props.phone}
                                onChange={props.onChanged}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            회원 조회
                        </Button>
                    </FormControl>
                </Box>
            </SearchPwSubCon>
        </SearchPwCon>
    )
}

export default SearchPw
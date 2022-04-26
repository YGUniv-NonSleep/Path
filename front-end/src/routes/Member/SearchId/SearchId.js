import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Box, FormControl, Grid, TextField, Button } from '@mui/material'

const SearchIdCon = styled.div`
    width: 390px;
    height: 100%;
`;

const SearchIdSubCon = styled.div`
    margin-left: 130px;
`;

function SearchId(props) {
    // console.log(props)
    return (
        <SearchIdCon>
            <SearchIdSubCon>
                <Box
                    component="form"
                    noValidate
                    onSubmit={props.handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <FormControl component="fieldset" variant="standard">
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="이름"
                                value={props.name}
                                onChange={props.onChanged}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="이메일"
                                value={props.email}
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
                            아이디 찾기
                        </Button>
                    </FormControl>
                </Box>
            </SearchIdSubCon>
        </SearchIdCon>
    )
}

export default SearchId
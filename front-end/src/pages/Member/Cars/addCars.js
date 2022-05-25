import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Input,
  FormControl,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

function AddCarsModal() {
  return (
    <Box sx={style}>
      <DirectionsCarIcon sx={{ m: 1 }} />
      <Typography component="h1" variant="h4" align="center">
        차량 등록
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                name="carKind"
                label="차량 종류"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="carNum" label="차량 번호" />
            </Grid>
            <Grid item xs={12}>
              <Input fullWidth type="file" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            차량 등록
          </Button>
          <Typography variant="subtitle1" align="center">
            취소하시려면 바깥을 클릭해주세요.
          </Typography>
        </FormControl>
      </Box>
    </Box>
  );
}

export default AddCarsModal;

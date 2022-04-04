import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Container } from '@mui/material';

function MemberPresenter(props) {
  return (
    <Container component="main" maxWidth="xs">
      <div className="Member">
        {props.loading ? <p>맴버 화면 나왔다</p> : <h2>로드 중...</h2>}
      </div>
      <Button onClick={props.testBusiness}>Business</Button>
      <Button onClick={props.testAdmin}>Admin</Button>
      <Button onClick={props.testReissue}>재발급</Button>
    </Container>
  );
}

MemberPresenter.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MemberPresenter;

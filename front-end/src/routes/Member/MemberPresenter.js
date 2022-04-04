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
      <Button onClick={props.testSubmit}>테스트버튼</Button>
      <Button onClick={props.testUserSubmit}>테스트버튼</Button>
    </Container>
  );
}

MemberPresenter.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MemberPresenter;

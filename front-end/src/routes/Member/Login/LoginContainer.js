import { useEffect, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import axios from 'axios';

function LoginContainer() {
  // ================로그인 입력 ========//
  // inputValue = {username:'', password:''}를 초기화
  const [inputValue, setInputValue] = useState({
    loginId: '',
    password: '',
  });
  // inputValue안의 값들 선언
  const { loginId, password } = inputValue; // 비구조화 할당을 통해 값 추출한 것

  const handleInput = (e) => {
    const { name, value } = e.target; // e.target에서 name과 value 추출
    setInputValue({
      ...inputValue, // 기존 input 객체를 전개 구문으로 펼쳐서 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정 (이때 [name]은 계산된 속성명 구문 사용)
    });
  };

  useEffect(() => {
    console.log('마운트 될 때만 실행');
  }, []); // [] 값이 바뀔때마다 계속 실행, 빈 배열인 경우는 처음 한번만 실행됨
  // ========== 로그인 유효성 검사 ==========//
  const isValidLoginId =
    loginId.length >= 4 && loginId != '' && loginId != ' ' && loginId != null;

  const isValidPassword =
    password.length >= 8 &&
    password != '' &&
    password != ' ' &&
    password != null;

  const handleButtonValid = () => {
    if (!isValidLoginId) {
      alert('아이디 입력하세요');
      return false;
    } else if (!isValidPassword) {
      alert('비밀번호 입력하세요');
      return false;
    }
    return true;
  };
  // ============== 로그인 ================= //
  const handleSubmit = () => {
    if (!handleButtonValid()) return null;
    const data = {
      username: loginId,
      password: password,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/login', data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.headers.authorization == null && res.data == '') {
          alert('존재하지 않습니다.');
          return;
        }
        console.log(res);
        console.log(res.headers.authorization);
        onLoginSuccess(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLoginSuccess = (res) => {
    const authorization = res.headers.authorization;
    axios.defaults.headers.common['authorization'] = authorization; // axios 모든 요청 헤더에 토큰값 넣기
    window.location.href = '/member';
  };

  const testSubmit = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/test', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const testUserSubmit = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/user', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // =======================

  return (
    <LoginPresenter
      handleSubmit={handleSubmit}
      testSubmit={testSubmit}
      handleInput={handleInput}
      testUserSubmit={testUserSubmit}
    ></LoginPresenter>
  );
}
export default LoginContainer;

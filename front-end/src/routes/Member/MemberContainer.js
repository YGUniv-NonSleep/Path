import { useEffect, useState } from 'react';
import MemberPresenter from './MemberPresenter';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function MemberContainer() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((current) => !current);
    tokenReissue();
  }, []);

  const [memberId, setMemberId] = useState('');

  // === AccessToken 재발급 == //
  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/token', '', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const authorization = res.headers.authorization;
        // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
        axios.defaults.headers.common['authorization'] = authorization;
        console.log('AccessToken 발급 완료');
        const decoded = tokenDecode(authorization);
        setMemberId(decoded.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    console.log(decoded);
    return decoded;
  };

  // === 로그아웃 진행 === //
  const userLogOut = () => {
    axios
      .delete(process.env.REACT_APP_SPRING_API + '/api/token', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMemberId('');
        console.log('로그아웃');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMember = () => {
    console.log('회원탈퇴 시작');
    const url = process.env.REACT_APP_SPRING_API + '/api/member/' + memberId;
    axios
      .delete(url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.header.statusCode == 200) {
          alert(res.data.message);
          userLogOut();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MemberPresenter
      loading={loading}
      deleteMember={deleteMember}
    ></MemberPresenter>
  );
}

export default MemberContainer;

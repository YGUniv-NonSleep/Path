import { useEffect, useState } from 'react';
import MemberPresenter from './MemberPresenter';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function MemberContainer() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((current) => !current);
    console.log('AccessToken 재발급');
    tokenReissue();
  }, []);

  // === AccessToken 재발급 == //
  const tokenReissue = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/member/reissue', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        const authorization = res.headers.authorization;
        // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
        axios.defaults.headers.common['authorization'] = authorization;
        console.log('AccessToken 발급 완료');
        tokenDecode(authorization);
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

  // ======== 테스트 ====== //
  const testBusiness = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/business', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const testAdmin = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/admin', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MemberPresenter
      loading={loading}
      testBusiness={testBusiness}
      testAdmin={testAdmin}
      tokenReissue={tokenReissue}
    ></MemberPresenter>
  );
}

export default MemberContainer;

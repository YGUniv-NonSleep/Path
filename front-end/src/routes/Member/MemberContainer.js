import { useEffect, useState } from 'react';
import MemberPresenter from './MemberPresenter';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function MemberContainer() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((current) => !current);
  }, []);

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    console.log(decoded);
    return decoded;
  };

  // ======== 테스트 ====== //
  const testMember = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/member', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      testMember={testMember}
    ></MemberPresenter>
  );
}

export default MemberContainer;

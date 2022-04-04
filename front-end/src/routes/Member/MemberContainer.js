import { useEffect, useState } from 'react';
import MemberPresenter from './MemberPresenter';
import axios from 'axios';

function MemberContainer() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((current) => !current);
    console.log('렌더링될때마다함');
  }, []);

  // === AccessToken 재발급 == //

  // ======== 테스트 ====== //
  const testReissue = () => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/member/reissue', {
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
      testReissue={testReissue}
    ></MemberPresenter>
  );
}

export default MemberContainer;

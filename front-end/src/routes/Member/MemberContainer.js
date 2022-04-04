import { useEffect, useState } from 'react';
import MemberPresenter from './MemberPresenter';
import axios from 'axios';

function MemberContainer() {
  // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((current) => !current);
    console.log('렌더링될때마다함');
  }, []);

  // === AccessToken 확인 == //

  // ======== 테스트 ====== //
  const testSubmit = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/member/test', {
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

  return (
    <MemberPresenter
      loading={loading}
      testSubmit={testSubmit}
      testUserSubmit={testUserSubmit}
    ></MemberPresenter>
  );
}

export default MemberContainer;

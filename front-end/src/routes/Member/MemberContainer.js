import { useEffect, useState } from 'react';
import MemberPresenter from './MemberPresenter';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function MemberContainer() {
  const [loading, setLoading] = useState(false);
  const [memberId, setMemberId] = useState('');

  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/token', '', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const authorization = res.headers.authorization;
        axios.defaults.headers.common['authorization'] = authorization;
        console.log('AccessToken 발급 완료');
        const decoded = tokenDecode(authorization);
        setMemberId(decoded.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    console.log(decoded);
    return decoded;
  };

  const userLogOut = () => {
    axios
      .delete(process.env.REACT_APP_SPRING_API + '/api/token', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMember = () => {
    userLogOut();
    const url = process.env.REACT_APP_SPRING_API + '/api/member/' + memberId;
    axios
      .delete(url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.header.statusCode == 200) {
          alert(res.data.message);
          setMemberId('');
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading((current) => !current);
    tokenReissue();
  }, []);

  return (
    <MemberPresenter
      loading={loading}
      deleteMember={deleteMember}
    ></MemberPresenter>
  );
}

export default MemberContainer;

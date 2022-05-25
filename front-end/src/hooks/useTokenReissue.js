import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../store';

function useTokenReissue() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  // === AccessToken 재발급 == //
  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/token', '', {
        withCredentials: true,
      })
      .then((res) => {
        const authorization = res.headers.authorization;
        // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
        axios.defaults.headers.common['authorization'] = authorization;
        const decoded = tokenDecode(authorization);
        return decoded;
      })
      .then((decoded) => {
        dispatch(
          changeUser({
            id: decoded.id,
            name: decoded.name,
            loginId: decoded.sub,
            role: decoded.role,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    const decoded = jwt_decode(authorization);
    return decoded;
  };

  // === 로그아웃 진행 === //
  const userLogOut = () => {
    axios
      .delete(process.env.REACT_APP_SPRING_API + '/api/token', {
        withCredentials: true,
      })
      .then((res) => {
        console.log('로그아웃 완료');
      })
      .catch((err) => {
        console.log(err);
        axios.defaults.headers.common['authorization'] = '';
      })
      .finally(() => {
        dispatch(
          changeUser({
            name: 'anonymous',
            loginId: 'anonymous',
            role: 'ROLE_ANONYMOUS',
          })
        );
        navigate('/');
      });
  };

  return { tokenReissue, userLogOut };
}

export default useTokenReissue;

import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function useTokenReissue() {
  // redux로 손봐야할 듯?
  const [token, setToken] = useState(null);

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
        setToken(decoded);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    // console.log(decoded);
    return decoded;
  };

  useEffect(() => {
    tokenReissue();
  }, []);

  return { token, tokenReissue, tokenDecode };
}

export default useTokenReissue;

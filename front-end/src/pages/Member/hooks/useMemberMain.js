import { useState } from 'react';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function useMemberMain() {
  const navigate = useNavigate();
  const { userLogOut } = useTokenReissue();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  let user = useSelector((state) => state.user);

  const deleteMember = () => {
    const url = process.env.REACT_APP_SPRING_API + '/api/member/' + user.id;
    axios
      .delete(url, {
        withCredentials: true,
      })
      .then((res) => {
        userLogOut();
        if (res.data.header.statusCode == 200) {
          alert(res.data.message);
          console.log('회원탈퇴완료');
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
      .finally(() => {
        navigate('/');
      });
  };

  return {
    open,
    toggleDrawer,
    deleteMember,
  };
}

export default useMemberMain;

import { useState } from 'react';
import axios from 'axios';

function useMemberMain() {
  const [memberId, setMemberId] = useState('');
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
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

  return {
    open,
    toggleDrawer,
    deleteMember,
  };
}

export default useMemberMain;

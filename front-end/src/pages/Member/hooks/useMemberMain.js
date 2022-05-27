import { useEffect, useState } from 'react';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function useMemberMain() {
  const navigate = useNavigate();
  const { userLogOut } = useTokenReissue();
  const [open, setOpen] = useState(true);
  const [payments, setPayments] = useState([]);
  const [amountByDay, setAmountByDat] = useState([]);

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

  const getPayments = () => {
    const url =
      process.env.REACT_APP_SPRING_API + '/api/member/' + user.id + '/payments';
    const data = {
      page: 0,
      size: 5,
    };
    axios
      .get(url, { params: data }, { withCredentials: true })
      .then((res) => {
        setPayments(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalChargeForMonth = () => {
    const url =
      process.env.REACT_APP_SPRING_API +
      '/api/member/' +
      user.id +
      '/payments/all';
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setAmountByDat(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.id !== 0) {
      getPayments();
      getTotalChargeForMonth();
    }
  }, [user]);

  return {
    open,
    toggleDrawer,
    deleteMember,
    payments,
    amountByDay,
  };
}

export default useMemberMain;

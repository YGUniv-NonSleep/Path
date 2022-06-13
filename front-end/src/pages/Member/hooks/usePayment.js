import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const usePayment = () => {
  const [payments, setPayments] = useState([]);
  const [amountByDay, setAmountByDay] = useState([]);
  let user = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(
    dayjs(new Date()).format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    dayjs(new Date()).format('YYYY-MM-DD')
  );
  const paymentPageNum = useRef(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isDatePage, setIsDatePage] = useState(false);

  const handleStartDate = (date) => {
    setStartDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const handleEndDate = (date) => {
    setEndDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const handleToday = () => {
    const date = new Date();
    setStartDate(dayjs(date).format('YYYY-MM-DD'));
    setEndDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const handleWeekAgo = () => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    setStartDate(dayjs(date).format('YYYY-MM-DD'));
    setEndDate(dayjs(new Date()).format('YYYY-MM-DD'));
  };

  const handleMonthAgo = (month) => {
    setStartDate(dayjs(addMonth(new Date(), -month)).format('YYYY-MM-DD'));
    setEndDate(dayjs(new Date()).format('YYYY-MM-DD'));
  };

  const addMonth = (date, month) => {
    let addMonthFirstDate = new Date(
      date.getFullYear(),
      date.getMonth() + month,
      1
    );
    let addMonthLastDate = new Date(
      addMonthFirstDate.getFullYear(),
      addMonthFirstDate.getMonth() + 1,
      0
    );
    let result = addMonthFirstDate;
    if (date.getDate() > addMonthLastDate.getDate()) {
      result.setDate(addMonthLastDate.getDate());
    } else {
      result.setDate(date.getDate());
    }
    return result;
  };

  const getPayments = () => {
    const url =
      process.env.REACT_APP_SPRING_API + '/api/member/' + user.id + '/payments';
    const data = {
      page: paymentPageNum.current,
      size: 5,
    };
    axios
      .get(url, { params: data }, { withCredentials: true })
      .then((res) => {
        setIsDatePage(false);
        setPayments([...payments, ...res.data.content]);
        setIsLastPage(res.data.last);
        if (!isLastPage.current) {
          paymentPageNum.current++;
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          window.location.href = '/';
        }
      });
  };

  const getPaymentsDate = () => {
    const url =
      process.env.REACT_APP_SPRING_API +
      '/api/member/' +
      user.id +
      '/payments/date';
    const data = {
      startDate: startDate,
      endDate: endDate,
      page: paymentPageNum.current,
      size: 5,
    };
    axios
      .get(url, { params: data }, { withCredentials: true })
      .then((res) => {
        setIsDatePage(true);
        setPayments((payments) => [...payments, ...res.data.content]);
        setIsLastPage(res.data.last);
        if (!isLastPage.current) {
          paymentPageNum.current++;
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          window.location.href = '/';
        }
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
        setAmountByDay(res.data.body);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          window.location.href = '/';
        }
      });
  };

  useEffect(() => {
    if (user.id !== 0) {
      getPayments();
      getTotalChargeForMonth();
    }
  }, [user]);

  return {
    startDate,
    handleStartDate,
    endDate,
    handleEndDate,
    handleToday,
    handleWeekAgo,
    handleMonthAgo,
    getPayments,
    getPaymentsDate,
    getTotalChargeForMonth,
    payments,
    amountByDay,
    isLastPage,
    paymentPageNum,
    setPayments,
    isDatePage,
  };
};

export default usePayment;

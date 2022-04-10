import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchId from './SearchId';
import { useNavigate } from 'react-router-dom';

function SearchIdContainer({ history }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setLoading(true);
  }, []);

  function onChanged(e) {
    if (e != undefined) {
      if (e.target.id === 'name') {
        setName(e.target.value);
      } else if (e.target.id === 'email') {
        setEmail(e.target.value);
      }
    } else return 0;
  }

  useEffect(() => {
    onChanged();
  }, [name, email]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      mail: email,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/forgot/loginid', data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.message);
        console.log(res.data.body.loginId);
        alert(res.data.message + '\n' + '아이디 : ' + res.data.body.loginId);
        goBackPage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();

  const goBackPage = () => {
    navigate('/login');
  };

  return (
    <SearchId
      loading={loading}
      onChanged={onChanged}
      handleSubmit={handleSubmit}
      name={name}
      email={email}
    ></SearchId>
  );
}

export default SearchIdContainer;

import {
  Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { storeInfo } from '../store/comp';
import axios from 'axios';

import PageNotFound from './PageNotFound';
import Menubar from './Menubar';

import { Path, WalkPath } from '../pages/Path';
import { Oder } from '../pages/Oder';
import { Bus, Subway, Scooter, Bike } from '../pages/Mobility';
import { Community, CommunityContents, CommunityAdd } from '../pages/Community';
import { CarPool, CarPoolContents, CarPoolAdd } from '../pages/CarPool';
import { Company, CompStore, CompCreate, ItemBasic } from '../pages/Company';
import {
  CompManage,
  CompEdit,
  ItemEdit,
  Items,
  Resign,
} from '../pages/Company/CompManage';
import Confirmation from '../pages/Confirmation/Confirmation';
import {
  Member,
  Card,
  Cars,
  Login,
  SignUp,
  UpdateMem,
  SearchId,
  SearchPw,
  Payment,
} from '../pages/Member';
import TossPayments from '../pages/TosspaymentsTest';


// https://kyung-a.tistory.com/36

function Router() {
  const userInfo = useSelector((state) => state.user);
  const compUserStore = useSelector((state) => state.comp.compList);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SPRING_API + '/api/company/myStore')
      .then((res) => {
        // 새로고침 오류
        if (res.data.body.length != 0) {
          let idList = [];
          res.data.body.map((item) => {
            idList.push(item.id);
          });
          dispatch(storeInfo({ state: idList }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);

  useEffect(() => {
    if (compUserStore.length != 0 && location.pathname === '/company/manage') {
      axios
        .get(
          process.env.REACT_APP_SPRING_API + `/api/company/${compUserStore[0]}`
        )
        .then((res) => {
          navigate(`/company/manage/${res.data.body.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      compUserStore.length == 0 &&
      location.pathname === '/company/manage'
    ) {
      alert('업체 정보가 없습니다.');
      navigate('/company/store');
    }
  }, [location.pathname]);

  useEffect(() => {
    setUserRole(userInfo.role);
  }, [userInfo]);

  useEffect(() => {
    // url 창에 입력해서 넘어가면 role이 anonymous 뜸 수정 필요
    // if(userInfo.role == 'ROLE_ANONYMOUS'){
    //   if(location.pathname.includes("member")){
    //     alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.")
    //     return navigate('/login')
    //   }
    //   if(location.pathname.includes("company")){
    //     alert("해당 페이지 접근 권한이 없습니다! 메인페이지로 이동합니다.")
    //     return navigate('/')
    //   }
    // }
    // if(location.pathname.includes("company") && userInfo.role != 'ROLE_BUSINESS'){
    //   alert("업체 회원만 접근 가능합니다. 서비스 이용을 원하실 경우 업체 회원으로 가입해주세요.")
    //   return navigate('/')
    // }
  }, [location, userInfo]);

  return (
    <Fragment>
      <Menubar></Menubar>

      <Routes>
        {/* 404 rounte */}
        {/* <Route path="/*" element={<PageNotFound />} /> */}

        {/* path */}
        <Route path="/" element={<Path />} />
        <Route path="/walk" element={<WalkPath />} />

        {/* pay test */}
        <Route path="/pay" element={<TossPayments />} />

        {/* sign in, out */}
        <Route path="/login" element={<Login />} />
        <Route path="/searchId" element={<SearchId />} />
        <Route path="/searchPw" element={<SearchPw />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member/confirmation" element={<Confirmation />} />
      </Routes>

      <Routes>
        <Route path="/company" element={<Company />} />
        <Route path="/company/store" element={<CompStore />} />
        <Route path="/company/create" element={<CompCreate />} />
        <Route path="/company/basic" element={<ItemBasic />} />
        <Route path="/company/manage/:comId" element={<CompManage />}>
          {/* 없으면 업체 등록하라고 팝업창, 마이 업체 경로 타고 들어온거 아니면 첫 번째 업체 관리로 들어옴 */}
          <Route path="items" element={<Items />}>
            <Route path="itemEdit" element={<ItemEdit />} />
          </Route>
          <Route path="compEdit" element={<CompEdit />} />
          <Route path="resign" element={<Resign />} />
        </Route>
      </Routes>
      <Routes>
        {/* oder 주문은 회원만 */}
        <Route path="/oder" element={<Oder />} />

        {/* mobility */}
        <Route index path="/mobility/bus" element={<Bus />} />
        <Route path="/mobility/subway" element={<Subway />} />
        <Route path="/mobility/scooter" element={<Scooter />} />
        <Route path="/mobility/bike" element={<Bike />} />

        {/* community 글쓰는것 부터는 회원만 */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<CommunityContents />} />
        <Route path="/community/add" element={<CommunityAdd />} />

        {/* carpool 글쓰고 신청하는거 회원만 */}
        <Route path="/carpool" element={<CarPool />} />
        <Route path="/carpool/:postId" element={<CarPoolContents />} />
        <Route path="/carpool/add" element={<CarPoolAdd />} />
        <Route path="/carpool/:postId" element={<CarPoolContents />} />

        {userInfo.role != 'ROLE_ANONYMOUS' ? (
          // 로그인되었는지 확인
          <>
            {/* member */}
            <Route path="/member" element={<Member />} />
            <Route path="/member/update" element={<UpdateMem />} />
            <Route path="/member/card" element={<Card />} />
            <Route path="/member/cars" element={<Cars />} />
            <Route path="/member/payments" element={<Payment />} />
            {userInfo.role == 'ROLE_BUSINESS' ? (
              // 업체 회원 확인
              <>
                {/* company */}
                <Route path="/company" element={<Company />} />
                <Route path="/company/store" element={<CompStore />} />
                <Route path="/company/create" element={<CompCreate />} />
                <Route path="/company/basic" element={<ItemBasic />} />
                <Route path="/company/manage/:comId" element={<CompManage />}>
                  {/* 등록된 업체 없을 때 들어오면 업체 등록하라고 팝업창 띄우고 마이업체 화면 이동,
                    마이 업체 경로 타고 들어온거 아니면 첫 번째 업체 관리로 들어옴 */}
                  <Route path="items" element={<Items />}>
                    <Route path="itemEdit" element={<ItemEdit />} />
                  </Route>
                  <Route path="compEdit" element={<CompEdit />} />
                  <Route path="resign" element={<Resign />} />
                </Route>
              </>
            ) : null}
          </>
        ) : null}
      </Routes>
    </Fragment>
  );
}

export default Router;

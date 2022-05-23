import {
  BrowserRouter,
  Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
  Route,
} from 'react-router-dom';

import PageNotFound from './PageNotFound';
import Menubar from './Menubar';

import { Path, WalkPath } from '../pages/Path';
import { Oder } from '../pages/Oder';
import { Bus, Subway, Scooter, Bike } from '../pages/Mobility';
import { Community, CommunityContents, CommunityAdd } from '../pages/Community';
import { CarPool, CarPoolContents, CarPoolAdd } from '../pages/CarPool';
import {
  Company,
  CompStore,
  CompDetail,
  CompCreate,
  ItemBasic,
} from '../pages/Company';
import {
  CompManage,
  CompEdit,
  ItemEdit,
  Items,
  Resign,
} from '../pages/Company/CompManage';
import {
  Member,
  Card,
  Login,
  SignUp,
  UpdateMem,
  SearchId,
  SearchPw,
} from '../pages/Member';
import TossPayments from '../pages/TosspaymentsTest';
// https://kyung-a.tistory.com/36

function Router() {
  return (
    <BrowserRouter>
      <Menubar></Menubar>

      <Routes>
        {/* 속성을 component 대신에 element */}
        <Route path="/" element={<Path />} />
        <Route path="/walk" element={<WalkPath />} />
      </Routes>
      <Routes>
        <Route path="/pay" element={<TossPayments />} />

        {/* 404 rounte */}
        {/* <Route path="/*" element={<PageNotFound />} /> */}
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/searchId" element={<SearchId />} />
        <Route path="/searchPw" element={<SearchPw />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/update" element={<UpdateMem />} />
        <Route path="/member/card" element={<Card />} />
      </Routes>
      <Routes>
        <Route path="/company" element={<Company />} />
        <Route path="/company/store" element={<CompStore />}>
          <Route path=":comId" element={<CompDetail />} />
        </Route>
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
        <Route path="/oder" element={<Oder />} />
      </Routes>
      <Routes>
        {/* <Route path="/mobility" element={<Mobility />} /> */}
        <Route path="/mobility/bus" element={<Bus />} />
        <Route path="/mobility/subway" element={<Subway />} />
        <Route path="/mobility/scooter" element={<Scooter />} />
        <Route path="/mobility/bike" element={<Bike />} />
      </Routes>
      <Routes>
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<CommunityContents />} />
        <Route path="/community/add" element={<CommunityAdd />} />
      </Routes>
      <Routes>
        <Route path="/carpool" element={<CarPool />} />
        <Route path="/carpool/:postId" element={<CarPoolContents />} />
        <Route path="/carpool/add" element={<CarPoolAdd />} />
        <Route path="/carpool/:postId" element={<CarPoolContents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

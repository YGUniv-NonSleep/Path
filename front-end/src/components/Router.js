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
import { Company, CompStore, CompCreate, ItemBasic } from '../pages/Company';
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
  return (
    <BrowserRouter>
      <Menubar></Menubar>
      
      <Routes>
        {/* 404 rounte */}
        <Route path="*" element={<PageNotFound />} />
        
        {/* path */}
        <Route path="/" element={<Path />} />
        <Route path="/walk" element={<WalkPath />} />

        {/* pay test */}
        <Route path="/pay" element={<TossPayments />} />

        {/* member */}
        <Route path="/login" element={<Login />} />
        <Route path="/searchId" element={<SearchId />} />
        <Route path="/searchPw" element={<SearchPw />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/update" element={<UpdateMem />} />
        <Route path="/member/card" element={<Card />} />
        <Route path="/member/cars" element={<Cars />} />
        <Route path="/member/payments" element={<Payment />} />

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

        {/* oder */}
        <Route path="/oder" element={<Oder />} />

        {/* mobility */}
        <Route index path="/mobility/bus" element={<Bus />} />
        <Route path="/mobility/subway" element={<Subway />} />
        <Route path="/mobility/scooter" element={<Scooter />} />
        <Route path="/mobility/bike" element={<Bike />} />

        {/* community */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<CommunityContents />} />
        <Route path="/community/add" element={<CommunityAdd />} />

        {/* carpool */}
        <Route path="/carpool" element={<CarPool />} />
        <Route path="/carpool/:postId" element={<CarPoolContents />} />
        <Route path="/carpool/add" element={<CarPoolAdd />} />
        <Route path="/carpool/:postId" element={<CarPoolContents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import {
  BrowserRouter,
  Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
  Route,
} from 'react-router-dom';

import PageNotFound from './PageNotFound';

import Path from '../pages/Path/PathMain';
import Oder from '../pages/Oder/OderMain';
//import Mobility from '../pages/Mobility/MobilityMain';

import Community from '../pages/Community/CommunityMain';
import CommunityContents from '../pages/Community/CommunityContents';

import CarPool from '../pages/CarPool/CarPoolMain';

import { MemberContainer as Member } from '../pages/Member';
import { LoginContainer as Login } from '../pages/Member';
import SearchId from '../pages/Member/SearchId/SearchIdMain';
import SearchPw from '../pages/Member/SearchPw';
import { SignUpContainer as SignUp } from '../pages/Member';
import { UpdateMemContainer as UpdateMem } from '../pages/Member';

import Company from '../pages/Company/CompanyMain';
import CompStore from '../pages/Company/CompStore/CompStoreMain';
import CompDetail from '../pages/Company/CompDetail/CompDetailMain';
import CompCreate from '../pages/Company/CompCreate/CompCreateMain';
import ItemBasicMain from '../pages/Company/ItemBasic/ItemBasicMain';

import CompManage from '../pages/Company/CompManage/CompManageMain';
import Items from '../pages/Company/CompManage/Items/ItemsMain';
import ItemEdit from '../pages/Company/CompManage/ItemEdit/ItemEditMain';
import CompEdit from '../pages/Company/CompManage/CompEdit/CompEditMain';
import Resign from '../pages/Company/CompManage/Resign/ResignMain';

import Mobility from '../pages/Mobility/MobilityMain';
import Bus from '../pages/Mobility/Bus/BusMain';
import Subway from '../pages/Mobility/Subway/SubwayMain';
import Scooter from '../pages/Mobility/Scooter/ScooterMain';
import Bike from '../pages/Mobility/Bike/BikeMain';

import Menubar from './Menubar';

// https://kyung-a.tistory.com/36

function Router() {
  return (
    <BrowserRouter>
      <Menubar></Menubar>
      
      <Routes>
        {/* 속성을 component 대신에 element */}
        <Route path="/" element={<Path />} />

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
      </Routes>
      <Routes>
        <Route path="/company" element={<Company />} />
        <Route path="/company/store" element={<CompStore />}>
          <Route path=":comId" element={<CompDetail />} />
        </Route>
        <Route path="/company/create" element={<CompCreate />} />
        <Route path="/company/basic" element={<ItemBasicMain />} />
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
        <Route path="/mobility/bus" element={<Bus />} />
        <Route path="/mobility/subway" element={<Subway />} />
        <Route path="/mobility/scooter" element={<Scooter />} />
        <Route path="/mobility/bike" element={<Bike />} />
      </Routes>
      <Routes>
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<CommunityContents />} />
      </Routes>
      <Routes>
        <Route path="/carpool" element={<CarPool />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

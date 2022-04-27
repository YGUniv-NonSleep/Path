import {
  BrowserRouter,
  Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
  Route,
} from 'react-router-dom';

import Path from '../routes/Path';
import WalkPath from '../routes/WalkPath';
import Oder from '../routes/Oder';

import Community from '../routes/Community';
import CommunityContents from '../routes/Community/CommunityContents';

import CarPool from '../routes/CarPool';

import { MemberContainer as Member } from '../routes/Member';
import { LoginContainer as Login } from '../routes/Member';
import SearchId from '../routes/Member/SearchId';
import SearchPw from '../routes/Member/SearchPw';
import { SignUpContainer as SignUp } from '../routes/Member';
import { UpdateMemContainer as UpdateMem } from '../routes/Member';

import Company from '../routes/Member/Company';
import CompStore from '../routes/Member/Company/CompStore';
import CompDetail from '../routes/Member/Company/CompDetail';
import CompCreate from '../routes/Member/Company/CompCreate';
import CompManage from '../routes/Member/Company/CompManage';

import Items from '../routes/Member/Company/CompManage/Items';
import ItemEdit from '../routes/Member/Company/CompManage/ItemEdit';
import CompEdit from '../routes/Member/Company/CompManage/CompEdit';
import Resign from '../routes/Member/Company/CompManage/Resign';

import Mobility from '../routes/Mobility';
import Scooter from '../routes/Mobility/Scooter';
import Bus from '../routes/Mobility/Bus';
import Subway from '../routes/Mobility/Subway';
import Bike from '../routes/Mobility/Bike';

import Menubar from './Menubar';
import FileTest from '../routes/FileTest';

// https://kyung-a.tistory.com/36

function Router() {
  return (
    <BrowserRouter>
      <Menubar></Menubar>

      <Routes>
        {/* 속성을 component 대신에 element */}
        <Route path="/" element={<Path />} />
        <Route path="/walk" element={<WalkPath />} />
        <Route path="/image" element={<FileTest />} />
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
        <Route path="/company/manage/:comId" element={<CompManage />}>
          {/* 없으면 업체 등록하라고 팝업창, 마이 업체 경로 타고 들어온거 아니면 첫 번째 업체 관리로 들어옴 */}
          <Route index path="items" element={<Items />} />
          <Route path="itemEdit" element={<ItemEdit />} />
          <Route path="compEdit" element={<CompEdit />} />
          <Route path="resign" element={<Resign />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/oder" element={<Oder />} />
      </Routes>
      <Routes>
        <Route path="/mobility" element={<Mobility />} />
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

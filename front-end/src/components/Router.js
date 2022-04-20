import {
  BrowserRouter,
  Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
  Route,
} from 'react-router-dom';

import Path from '../pages/Path/PathMain';
import { MemberContainer as Member } from '../pages/Member';
import Oder from '../pages/Oder/OderMain';
import Mobility from '../pages/Mobility/MobilityMain';
import Community from '../pages/Community/CommunityMain';
import CarPool from '../pages/CarPool/CarPoolMain';
import { LoginContainer as Login } from '../pages/Member';
import SearchId from '../pages/Member/SearchId'
import SearchPw from '../pages/Member/SearchPw'
import { SignUpContainer as SignUp } from '../pages/Member';

import Company from '../pages/Company/CompanyMain';
import CompStore from '../pages/Company/CompStore/CompStoreMain';
import CompCreate from '../pages/Company/CompCreate/CompCreateMain';
import CompManage from '../pages/Company/CompManage/CompManageMain';

import Bus from '../pages/Mobility/Bus/BusMain';
import Subway from '../pages/Mobility/SubwayMain';
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
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/searchId" element={<SearchId />} />
        <Route path="/searchPw" element={<SearchPw />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member" element={<Member />} />
      </Routes>
      <Routes>
        <Route path="/company" element={<Company />} />
        <Route path="/company/store" element={<CompStore />}>
          <Route path=":comId" element={<CompStore />} />
        </Route>
        <Route path="/company/create" element={<CompCreate />} />
        <Route path="/company/manage" element={<CompManage />}>
          <Route path=":comId" element={<CompStore />}>
            <Route index path="items" element={<CompManage />} />
            <Route path="item-edit" element={<CompManage />} />
            <Route path="info-edit" element={<CompManage />} />
            <Route path="resign" element={<CompManage />} />
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/oder" element={<Oder />} />
      </Routes>
      <Routes>
      <Route path="/mobility" element={<Mobility />} />
        <Route path="/mobility/bus" element={<Bus/>} />
        <Route path="/mobility/subway" element={<Subway />} />
        <Route path="/mobility/scooter" element={<Scooter />} />
        <Route path="/mobility/bike" element={<Bike />} />
      </Routes>
      <Routes>
        <Route path="/community" element={<Community />} />
      </Routes>
      <Routes>
        <Route path="/carpool" element={<CarPool />} />
      </Routes>
    </BrowserRouter>
  );
}


export default Router;

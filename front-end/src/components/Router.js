import {
    BrowserRouter,
    Routes, // v5에서 v6되면서 Switch에서 이름이 Routes로 변경됨.
    Route,
 } from "react-router-dom";
import Member from "../routes/Member"
import Path from "../routes/Path"

 function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 속성을 component 대신에 element */}
                <Route path="/" element={<Path />} />
            </Routes>
            <Routes>
                <Route path="/member" element={<Member />} />
            </Routes>
        </BrowserRouter>
    )
 }

 export default Router;
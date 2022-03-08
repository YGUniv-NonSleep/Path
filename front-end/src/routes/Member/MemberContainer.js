import { useEffect, useState } from "react";
import MemberPresenter from "./MemberPresenter"
import axios from "axios";

function MemberContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.

    return (
        <MemberPresenter />
    )
}

export default MemberContainer;
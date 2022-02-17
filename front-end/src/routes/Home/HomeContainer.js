import { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter"

function HomeContainer() {
    // 여기서 api 같은거 가져와서 HomePresenter로 props 넘겨줌.
    return (
        <HomePresenter />
    )
}

export default HomeContainer;
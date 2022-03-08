import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import axios from "axios";

function PathContainer() {
    const [data, setData] = useState(null);

    return (
        <PathPresenter />
    )
}

export default PathContainer;
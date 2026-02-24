import RandomImg from "./randomImg.tsx";
import {ImgArr} from "../App.tsx";
import {memo} from "react";

function ChildComponent6({arr}: ImgArr){

    console.log("ChildComponent-6 is rendered");

    return (
        <div id="parentComponent">
            <p id="p_cmp_t">Parent Component</p>
            <RandomImg arr={arr}/>
        </div>
    );
}

export default memo(ChildComponent6);

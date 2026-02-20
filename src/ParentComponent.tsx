import React from "react";
import RandomImg from "./randomImg.tsx";
import {ImgArr} from "./App.tsx";

export const ParentComponent = React.memo(({arr}: ImgArr) => {
    console.log("parentComponent is getting re-rendered");
    return (
        <div id="parentComponent">
            <p id="p_cmp_t">Parent Component</p>
            <RandomImg arr={arr}/>
        </div>
    );
});
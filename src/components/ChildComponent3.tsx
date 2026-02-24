import {memo} from "react";

// This component is updating the state of the parent (App())
function ChildComponent3({colorCB}: {colorCB: (s:string)=>void}) {
    console.log("ChildComponent-3 is rendered");

    function changeColor(){
        const newColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
        //generate new color string
        colorCB(newColor);
    }

    return (
        <div id="inc_div2">
            <button id="inc_button" onClick={changeColor}>
                changeColor
            </button>
        </div>
    );
}

export default memo(ChildComponent3);

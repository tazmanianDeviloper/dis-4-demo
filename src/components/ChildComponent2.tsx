import {useState, memo} from "react";

function ChildComponent2(){
    console.log("ChildComponent-2 is rendered");
    const [color, setColor] = useState<string>("#f4e7ae");
    const changeColor = () => {
        const newColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
        setColor(newColor);
    };
    return (
        <div id="inc_div2" style={{backgroundColor: color}}>
            <button id="inc_button" onClick={changeColor}>
                changeColor
            </button>
        </div>
    );
};

export default memo(ChildComponent2);

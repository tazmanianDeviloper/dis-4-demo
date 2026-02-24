import {useState, memo} from "react";

// Like component-3, this component is updating the state of the parent (App()), with a callback function.
// Except here that callback function, is not a useState() callback.
function ChildComponent5({cb}:{cb:(arr:Array<number>)=>Array<number>}){

    console.log("ChildComponent-5 is rendered");

    const randomArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [newArr, setNewArr]=useState<Array<number>>([...randomArr]);

    return (
        <div id="inc_div2">
            <p>
                {
                    "["
                        +
                            newArr.map((num, idx) =>
                                {
                                    return idx != 0 ? ` ${num}` : `${num}`;
                                }
                            )
                        +
                    "]"
                }
            </p>
            <button id="inc_button" onClick={()=>setNewArr(cb(randomArr))}>
                {" "} click me
            </button>

        </div>
    );
}

export default memo(ChildComponent5);

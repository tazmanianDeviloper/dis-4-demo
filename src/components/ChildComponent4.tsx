import {memo} from "react";


// This component's state is being managed from the parent (App()).
function ChildComponent4({arr}: {arr:Array<number>}){

    console.log("ChildComponent-4 is rendered");

    return (
        <div id="inc_div">
            <p>
                {
                    "["
                        +
                            arr.map((num, idx) =>
                                {
                                    return idx != 0 ? ` ${num}` : `${num}`;
                                }
                            )
                        +
                    "]"
                }
            </p>
        </div>
    );
}

export default memo(ChildComponent4);

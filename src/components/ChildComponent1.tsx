import {memo, useEffect, useState} from "react";

function ChildComponent1(){

    console.log("ChildComponent-1 is rendered");

    const [count, setCount] = useState<number>(0);

    function increment(){
        setCount(count + 1);
        // console.log("my count is", count);
        // logs the old value because state updates are async
    }

    useEffect(() => {
        // console.log("my new count is", count);
    }, [count]);

    return (
        <div id="inc_div">
            <p id="count">{`count: ${count}`}</p>
            <button id="inc_button" onClick={increment}>
                increment
            </button>

            {/*<button onClick={setCount((count+1))}>increment</button>*/}
            {/*why that not working? what's expected type? */}
        </div>
    );
}

export default memo(ChildComponent1);

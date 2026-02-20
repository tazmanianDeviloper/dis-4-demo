import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ChildComponent5 from "./ChildComponent5.tsx";
import ChildComponent3 from "./ChildComponent3.tsx";
import ChildComponent2 from "./ChildComponent2.tsx";
import ChildComponent4 from "./ChildComponent4.tsx";
import {ChildComponent1} from "./ChildComponent1.tsx";
import {ParentComponent} from "./ParentComponent.tsx";

export interface ImgArr {
    arr: Array<string>;
}

export default function App() {
    console.log("App is getting re-rendered");

    // const [color, setColor] = useState("#f4e7ae"); // now we change the parent color
    const [imgs, setImgs] = useState<Array<string>>([]);

    // For the useRef
    const myRef = useRef<HTMLDivElement>(null);

    // my shuffle logic for ParentComponent
    function knuthShuffle(arr: number[]): number[] {
        const n = arr.length;

        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Math.random() ∈ [0, 1), so j ∈ [0, i]

            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        return arr;
    }


    const arrprop = useMemo(
        () => knuthShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        []
    );

    useEffect(() => {
        (async () => {
            const objects = await (
                await fetch(
                    "https://collectionapi.metmuseum.org/public/collection/v1/objects",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            ).json();
            // console.log(objects);

            const randomarts = knuthShuffle(objects.objectIDs);
            // console.log(random7arts);

            // eslint-disable-next-line prefer-const
            let random6arts: Array<string> = [];

            let counter = 6;
            let i = 0;
            while (counter > 0) {
                const img = (
                    await (
                        await fetch(
                            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomarts[i]}`,
                            {method: "GET"}
                        )
                    ).json()
                ).primaryImage;
                if (img) {
                    random6arts.push(img);
                    counter--;
                }
                i++;
            } // this approach is so slow!!
            console.log(random6arts);
            setImgs(random6arts);
        })();
    }, []);

    return (
        <div ref={myRef} id="App">
            <h1 id="header1">React hooks demonstration</h1>

            {/*/!* Component1, disable it as needed *!/*/}
            {/*<div id="useState">*/}
            {/*    <p id="usestate_p">UseState</p>*/}
            {/*    <ChildComponent1/>*/}
            {/*</div>*/}

            {/* Component2, disable it as needed */}
            {/*<div id="useState">*/}
            {/*    <p id="usestate_p">UseState2</p>*/}
            {/*    <ChildComponent2/>*/}
            {/*</div>*/}

            {/*/!* Component3, disable it as needed *!/*/}
            {/*<div id="useState" style={{backgroundColor: color}}>*/}
            {/*    <p id="usestate_p">UseState as the callback</p>*/}
            {/*    <ChildComponent3 colorCB={setColor}/>*/}
            {/*</div>*/}

            {/*/!* Component4, disable it as needed *!/*/}
            {/*<div id="useState">*/}
            {/*    <p id="usestate_p">UseMemo</p>*/}
            {/*    <ChildComponent4 arr={arrprop}/>*/}
            {/*</div>*/}

            {/*/!* Component5, disable it as needed *!/*/}
            {/*<div id="useState">*/}
            {/*    <p id="usestate_p">UseCallback</p>*/}
            {/*    <ChildComponent5 cb={knuthShuffle}/>*/}
            {/*</div>*/}

            {/*/!*ParentComponent, disable it as needed*!/*/}
            {/*<div id="nest_usestate">*/}
            {/*    <p>nest_useState</p>*/}
            {/*    <ParentComponent arr={imgs}/>*/}
            {/*</div>*/}

            {/* this will not work why?? */}
            {/*<div id="useState">*/}
            {/*    <p>useRef</p>*/}
            {/*    <button*/}
            {/*        id="inc_button"*/}
            {/*        onClick={() =>*/}
            {/*            myRef.current &&*/}
            {/*            myRef.current.scrollIntoView({behavior: "smooth"})*/}
            {/*        }*/}
            {/*    >*/}
            {/*        Back to Top*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/* <div id="nest_usestate">
        <p>nest_useState2</p>
        <ParentComponent arr={random6artsprops} />
      </div> */}
        </div>
    );
}


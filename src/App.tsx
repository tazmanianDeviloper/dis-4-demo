import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ChildComponent5 from "./components/ChildComponent5.tsx";
import ChildComponent3 from "./components/ChildComponent3.tsx";
import ChildComponent2 from "./components/ChildComponent2.tsx";
import ChildComponent4 from "./components/ChildComponent4.tsx";
import ChildComponent1 from "./components/ChildComponent1.tsx";
import ChildComponent6 from "./components/ChildComponent6.tsx";

export interface ImgArr {
    arr: Array<string>;
}

export default function App() {
    console.log("App is rendered");

    const [color, setColor] = useState("#f4e7ae");

    // Un-comment for ChildComponent-6
    const [images, setImages] = useState<Array<string>>([]);

    // For the useRef
    const myRef = useRef<HTMLDivElement>(null);

    //-----------------------------------------------------------------
    // Toggle back and forth for ChildComponent5
    // Without useCallback
    // function knuthShuffle(arr: number[]):number[] {
    //
    //     const n=arr.length-1;
    //
    //     for (let i=n; i>0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         // Math.random() ∈ [0, 1), so j ∈ [0, i]
    //
    //         const temp = arr[i];
    //         arr[i]=arr[j];
    //         arr[j]=temp;
    //     }
    //
    //     return arr;
    // }

    // With useCallback()
    const knuthShuffle=useCallback((arr:number[]):number[]=>{
        const n=arr.length-1;

        for (let i=n; i>0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Math.random() ∈ [0, 1), so j ∈ [0, i]

            const temp = arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
        }

        return arr;
    },[])
    //-----------------------------------------------------------------

    //-----------------------------------------------------------------
    // Toggle back and forth for ChildComponent4

    // Without useMemo
    // const arrProp = knuthShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    // With useMemo
    const arrProp = useMemo(
        () => knuthShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        [knuthShuffle]
    );

    //-----------------------------------------------------------------

    // Un-comment for ChildComponent-6
    useEffect(() => {
        async function fetchAll() {
            const res = await fetch(
                "https://collectionapi.metmuseum.org/public/collection/v1/objects",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const objects = await res.json();
            // console.log(objects);

            const randomArts = knuthShuffle(objects.objectIDs);
            // console.log(random7arts);

            // eslint-disable-next-line prefer-const
            let random6arts: Array<string> = [];

            let counter=6;
            let i = 0;
            while (counter > 0) {
                const randRes=await fetch(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArts[i]}`,
                    {
                        method: "GET"
                    }
                )
                const {primaryImage}=await randRes.json();

                if (primaryImage) {
                    random6arts.push(primaryImage);
                    counter--;
                }
                i++;
            }
            // console.log(random6arts);
            setImages(random6arts);
        }

        fetchAll().then().catch();

        },[]
    );

    return (
        <div ref={myRef} id="App">

            <h1 id="header1">React hooks demonstration</h1>

            {/* Component1, disable it as needed */}
            <div id="useState">
                <p id="usestate_p">UseState</p>
                <ChildComponent1/>
            </div>

             {/*Component2, disable it as needed*/}
            <div id="useState">
                <p id="usestate_p">UseState2</p>
                <ChildComponent2/>
            </div>

            {/* Component3, disable it as needed */}
            <div id="useState" style={{backgroundColor: color}}>
                <p id="usestate_p">UseState as the callback</p>
                <ChildComponent3 colorCB={setColor}/>
            </div>

            {/* Component4, disable it as needed */}
            <div id="useState">
                <p id="usestate_p">UseMemo</p>
                <ChildComponent4 arr={arrProp}/>
            </div>

            {/* Component5, disable it as needed */}
            <div id="useState">
                <p id="usestate_p">UseCallback</p>
                <ChildComponent5 cb={knuthShuffle}/>
            </div>

            {/*ChildComponent6, disable it as needed*/}
            <div id="nest_usestate">
                <p>nest_useState</p>
                <ChildComponent6 arr={images}/>
            </div>

             {/*this will not work why?? */}
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

        </div>
    );
}


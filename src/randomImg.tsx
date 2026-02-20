import { memo } from "react";
import { ImgArr } from "./App";
const RandomImg = ({ arr }: ImgArr) => {
  return (
    <div id="randomImg">
      {arr.map((str, idx) => (
        <img id="img" key={idx} src={str} alt={`Random Art`}/>
      ))}
    </div>
  );
};
export default memo(RandomImg);

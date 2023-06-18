import "./style.css";
// import "../globals.css";
import Image from "next/image";
import main from "./images/main.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import img6 from "./images/img6.png";

const RotImg = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative ">
      <div className="border border-solid border-[#4a4a4a] rounded-full absolute w-[7rem] h-[7rem] flex items-center justify-center">
        <Image src={main} alt="main" className="w-1/3 h-1/3" />
      </div>
      <div className="border border-solid border-[#4a4a4a] rounded-full absolute w-[13rem] h-[13rem] circle1">
        <div className="imgBx" style={{ "--i": 1 }}>
          <Image src={img4} alt="img1" className="img img2" />
        </div>
        <div className="imgBx" style={{ "--i": 2 }}>
          <Image src={img2} alt="img2" className="img" />
        </div>
      </div>
      <div className="border border-solid border-[#4a4a4a] rounded-full absolute w-[19rem] h-[19rem] circle2">
        <div className="imgBx" style={{ "--i": 1 }}>
            <Image src={img3} alt="img3" className="img img3" />
        </div>
        <div className="imgBx" style={{ "--i": 2 }}>
            <Image src={img5} alt="img4" className="img" />
        </div>
      </div>
      <div className="border border-solid border-[#4a4a4a] rounded-full absolute w-[25rem] h-[25rem] circle3">
        <div className="imgBx" style={{ "--i": 1 }}>
            <Image src={img1} alt="img5" className="img img2" />
        </div>
        <div className="imgBx" style={{ "--i": 2 }}>
            <Image src={img6} alt="img6" className="img" />
        </div>
      </div>
    </div>
  );
};

export default RotImg;

import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  const cssOverride: CSSProperties = {
    borderWidth: 5,
  };

  return (
    <div className="anim_gradient flex items-center justify-center min-h-screen">
        <ClipLoader color={"#000"} loading={true} size={150} cssOverride={cssOverride}/>
    </div>
  );
};

export default Loading;
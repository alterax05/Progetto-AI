import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="anim_gradient flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin" size={175} strokeWidth={1}/>
    </div>
  );
};

export default Loading;
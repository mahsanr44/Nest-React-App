import Crud from "@/components/Crud";
import { ClimbingBoxLoader, FadeLoader } from "react-spinners";

export default function Home() {
  return (
    <div>
<ClimbingBoxLoader 
  color="#36d7b7"
  loading
  speedMultiplier={2}
/>
      <Crud/>
    </div>
  );
}

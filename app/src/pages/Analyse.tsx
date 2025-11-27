import FirstGraph from "../components/FirstGraph";
import { Header } from "../components/Header";
import SecondGraph from "../components/SecondGraph";
import ThirdGraph from "../components/ThirdGraph";
import { FourthGraph } from "../components/FourthGraph";

export default function Analyse() {
  return (
    <div className="bg-[#e8d6cc] min-h-screen ">
      <Header />
      <div className="flex gap-6 px-6 py-4">
        <div className="bg-white p-4 rounded-xl shadow-md w-1/3">
          <FirstGraph />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md w-1/3">
          <SecondGraph />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md w-1/3">
          <ThirdGraph />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md w-1/3">
          <FourthGraph />
        </div>
      </div>
    </div>
  );
}

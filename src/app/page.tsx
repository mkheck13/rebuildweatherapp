import SideBar from "./components/SidebarComponent";
import MainComponent from "./components/MainComponent";


const App = () => {
  return (
    <div className="bg-[#100E1D] flex flex-col lg:flex-row">
      <SideBar />
      <MainComponent />
    </div>
  );
};
export default App;
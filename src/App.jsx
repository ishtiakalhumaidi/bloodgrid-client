
import ThemeToggle from "./components/Theme/ThemeToggle";
import logo from "/logo.png";

function App() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-3">
      
      <img className="w-20 " src={logo} />
      <h1 className="text-5xl font-bold italic">
        <span className="text-primary">Blood</span>Grid website...{" "}
      </h1>
      <div className=" border p-4 border-base-content rounded-full ">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;

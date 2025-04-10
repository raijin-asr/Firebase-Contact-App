import Navbar from "./components/Navbar";
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";

const App = () => {
  return (
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow">
          <FiSearch className="text-white text-3xl absolute ml-1"/>
          <input type="text" className="pl-9 text-white flex-grow border bg-transparent border-white rounded-md h-10"/>
        </div>
          <AiFillPlusCircle className="text-5xl cursor-pointer text-white"/>
      </div>
    </div>
  )
}

export default App
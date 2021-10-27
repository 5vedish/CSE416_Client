import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from './Dropdown';

export default function Navbar() {
  // referenced https://v1.tailwindcss.com/components/navigation
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-extrabold text-xl">QIZ</span>
      </div>
      <div>
        <button>
          <ControlPointIcon />
        </button>
      </div>
      <div className="shadow flex">
        <input className="w-full rounded p-2" type="text" placeholder="Search..." />
        <button className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
          <SearchIcon />
        </button>
      </div>
      <div>
        <a href="#" className="">Shop</a>
      </div>
      <div>
        <Dropdown />
      </div>
    </nav>
  )
}
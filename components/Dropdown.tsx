import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

// referenced https://headlessui.dev/react/menu
// used profile icon from https://mui.com/components/material-icons/

export default function Dropdown() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full px-4 py-2 text-white rounded-md">
            <PermIdentityIcon />
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'text-gray-300' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                >
                  Profile
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'text-gray-300' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                >
                  Account
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'text-gray-300' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

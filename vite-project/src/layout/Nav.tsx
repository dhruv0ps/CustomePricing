import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { observer } from "mobx-react-lite";

import logo from "../../src/assets/react.svg";

export default observer(function NavBar({ toggleSidebar, isSidebarOpen }: any) {
  return (
    <Navbar className="bg-gray-50 drop-shadow-sm border border-gray-200" fluid rounded>
      <Navbar.Brand href="/yellowadmin">
        <img src={logo} className="mr-3 h-10" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-base font-thin">
              authStore?.user?.username ?? "User"
            </span>
            <span className="block truncate text-sm">authStore?.user?.email</span>
          </Dropdown.Header>
          <Dropdown.Divider />
          {/* <Dropdown.Item icon={HiLogout} onClick={async () => {
            await authStore.logout()
            navigate("/yellowadmin/login");
          }}>Sign out</Dropdown.Item> */}
        </Dropdown>
        {isSidebarOpen ? (
          <MdMenuOpen className="text-2xl mx-2 lg:hidden" onClick={() => toggleSidebar()} />
        ) : (
          <MdMenu className="text-2xl mx-2 lg:hidden" onClick={() => toggleSidebar()} />
        )}
      </div>
    </Navbar>
  );
});

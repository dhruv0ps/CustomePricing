import { Sidebar } from "flowbite-react";
import { BsIncognito } from "react-icons/bs";
import { FaIndustry } from "react-icons/fa";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import  { useState } from "react";

const NavSideBar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  // Hardcoded role for demonstration
  const role = "admin"; // Change to "user" or another role to test different behaviors

  // State to manage which collapsible section is open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dealer: false,
    manufacturer: false,
  });

  // Toggle the state for a section
  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Dealer Section (Customer Pricing Links)
  const DealerSection = () => {
    if (role !== "admin") {
      return null; // Only render for "admin" role
    }

    return (
      <Sidebar.Collapse
        icon={BsIncognito}
        label="Customer"
        open={openSections.dealer} // Control the open state
        onClick={() => toggleSection("dealer")} // Toggle on click
        renderChevronIcon={(theme, open) => {
          const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
          return (
            <IconComponent
              aria-hidden
              className={twMerge(theme.label.icon.open[open ? "on" : "off"])}
            />
          );
        }}
      >
        <Link to="/customer/customepricing">
          <Sidebar.Item>Custom Pricing</Sidebar.Item>
        </Link>
        <Link to="/customer/pricemanagment">
          <Sidebar.Item>List of Customer Pricing</Sidebar.Item>
        </Link>
      </Sidebar.Collapse>
    );
  };

  // Manufacturer Section
  const ManufacturerSection = () => {
    return (
      <Sidebar.Collapse
        icon={FaIndustry}
        label="Manufacturer"
        open={openSections.manufacturer} // Control the open state
        onClick={() => toggleSection("manufacturer")} // Toggle on click
        renderChevronIcon={(theme, open) => {
          const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
          return (
            <IconComponent
              aria-hidden
              className={twMerge(theme.label.icon.open[open ? "on" : "off"])}
            />
          );
        }}
      >
        <Link to="/manufacturer/listmachine">
          <Sidebar.Item>Machine</Sidebar.Item>
        </Link>
        <Link to="/manufacturer/stationform">
          <Sidebar.Item>Station</Sidebar.Item>
        </Link>
      </Sidebar.Collapse>
    );
  };

  return (
    <Sidebar
      aria-label="Sidebar"
      className={`h-screen overflow-hidden ${isSidebarOpen ? "" : "hidden"} w-64 bg-gray-100 dark:bg-gray-800 `}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Dealer Section */}
          <DealerSection />
          {/* Manufacturer Section */}
          <ManufacturerSection />
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default NavSideBar;

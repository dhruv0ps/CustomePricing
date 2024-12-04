import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaTrash, FaExclamationTriangle, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import showConfirmationModal from "../../components/confirmationUtil";

interface Item {
  id: number;
  name: string;
  thumbnail: string;
}

const mockData: Item[] = [
  { id: 1, name: "Machine A", thumbnail: "https://via.placeholder.com/100" },
  { id: 2, name: "Machine B", thumbnail: "https://via.placeholder.com/100" },
  { id: 3, name: "Machine C", thumbnail: "https://via.placeholder.com/100" },
  { id: 4, name: "Machine D", thumbnail: "https://via.placeholder.com/100" },
  { id: 5, name: "Machine E", thumbnail: "https://via.placeholder.com/100" },
  { id: 6, name: "Machine F", thumbnail: "https://via.placeholder.com/100" },
];

const ITEMS_PER_PAGE = 3; // Items per page

const MachineList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Item[]>(mockData);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Handle search filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredData = mockData.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setData(filteredData);
      setCurrentPage(1); // Reset to page 1 after filtering
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleDelete = async (id: number) => {
    const confirm = await showConfirmationModal("Are you sure you want to delete this item?");
    if (!confirm) return;
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleView = (id: number) => {
    navigate(`/manufacturer/viewmachine/${id}`);
  };

  const handleReport = (id: number) => {
    navigate(`/manufacturer/reportmachine/${id}`);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-gray-50 -mt-5 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <Button color="gray" onClick={() => navigate(-1)}>
          <span className="flex gap-2 items-center">
            <FaChevronLeft />
            Back
          </span>
        </Button>
        <Button
          color="green"
          className="ml-2"
          onClick={() => navigate("/manufacturer/addmachine")}
        >
          <span className="flex gap-2 items-center">Add Machine</span>
        </Button>
      </div>

      {/* Search Bar */}
     

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Machines List</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View and manage the list of machines efficiently.
          </p>
        </div>
        <div className="space-y-2 mt-4">
        <h2 className="text-lg font-semibold">Select Machine</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Machine"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 pl-10 w-full focus:outline-none focus:ring focus:ring-gray-300"
          />
          <HiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
          {data.length === 0 ? (
            <p className="text-center text-gray-600">No items found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Thumbnail
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                      <td className="px-6 py-4">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-4">
                          <Button
                            color="dark"
                            size="sm"
                            onClick={() => handleView(item.id)}
                          >
                            <FaEye className="w-4 h-4" />
                          </Button>
                          <Button
                            color="failure"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </Button>
                          <Button
                            color="warning"
                            size="sm"
                            onClick={() => handleReport(item.id)}
                          >
                            <FaExclamationTriangle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav
            className="inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Button
              outline
              color="dark"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="px-4 py-2 bg-white text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              outline
              color="dark"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MachineList;

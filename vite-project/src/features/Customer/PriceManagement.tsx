import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import showConfirmationModal from "../../components/confirmationUtil";

interface Customer {
  id: number;
  name: string;
  conditions: number;
}

const customers: Customer[] = [
  { id: 1, name: "Purlator", conditions: 1 },
  { id: 2, name: "FedExD", conditions: 1 },
  { id: 3, name: "UPSkm", conditions: 1 },
  { id: 4, name: "PrimeM", conditions: 1 },
  { id: 5, name: "LogiX", conditions: 2 },
  { id: 6, name: "TransFast", conditions: 3 },
];

const ITEMS_PER_PAGE = 3;

const CustomerManagement: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const navigate = useNavigate();

  // Handle search functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lowerCaseSearchText = searchText.toLowerCase();
      setFilteredCustomers(
        customers.filter((customer) =>
          customer.name.toLowerCase().includes(lowerCaseSearchText)
        )
      );
      setCurrentPage(1); // Reset to page 1 after filtering
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // Get paginated customers
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle delete
  const handleDelete = async (id: number) => {
    const confirm = await showConfirmationModal("Are you sure you want to delete this customer?");
    if (confirm) {
      setFilteredCustomers((prev) => prev.filter((customer) => customer.id !== id));
      console.log(`Customer with ID ${id} deleted.`);
    }
  };

  // Handle edit
  const handleEdit = (id: number): void => {
    navigate(`/customer/customepricing/${id}`);
  };

  // Handle view
  const handleView = (id: number): void => {
    navigate(`/customepricing/view/${id}`);
  };

  return (
    <div className="h-full overflow-y-auto border-l mt-2 border-gray-200 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
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
          onClick={() => navigate("/customer/customepricing")}
        >
          <span className="flex gap-2 items-center">Add Custome Pricing</span>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Pricing List</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View and manage the list of Custom pricing efficiently.
          </p>
        </div>
      <div className="space-y-2 mt-4">
        <h2 className="text-lg font-semibold">Select Customer</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Customer"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border rounded-md p-2 pl-10 w-full focus:outline-none focus:ring focus:ring-gray-300"
          />
          <HiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4 ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Conditions
                </th>
                <th className="px-10 py-3  text-center text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id}  className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{customer.conditions}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="flex justify-center space-x-2">
                      <Button color="dark" size="sm" onClick={() => handleEdit(customer.id)}>
                        <FaEdit className="w-4 h-4" />
                      </Button>
                      <Button color="dark" size="sm" onClick={() => handleView(customer.id)}>
                        <FaEye className="w-4 h-4" />
                      </Button>
                      <Button color="failure" size="sm" onClick={() => handleDelete(customer.id)}>
                        <FaTrash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
        {/* Pagination */}
     
      </div>
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
  );
};

export default CustomerManagement;

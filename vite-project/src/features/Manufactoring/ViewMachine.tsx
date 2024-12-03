import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaCog, FaHistory } from "react-icons/fa";
import { Button, Card } from "flowbite-react";

interface Report {
  id: number;
  date: string;
  description: string;
}

interface Machine {
  id: number;
  name: string;
  image: string;
  reportHistory: Report[];
}

// Mock Data
const mockMachines: Machine[] = [
  {
    id: 1,
    name: "Machine A",
    image: "https://via.placeholder.com/300",
    reportHistory: [
      { id: 1, date: "2024-12-01", description: "Replaced damaged gear." },
      { id: 2, date: "2024-11-20", description: "Oil leakage detected." },
    ],
  },
  {
    id: 2,
    name: "Machine B",
    image: "https://via.placeholder.com/300",
    reportHistory: [
      { id: 1, date: "2024-11-15", description: "Motor malfunction." },
    ],
  },
];

const ViewMachine: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const machine = mockMachines.find((m) => m.id === Number(id));

  if (!machine) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <h2 className="text-center text-red-500 text-xl font-semibold mb-4">
            Machine not found
          </h2>
          <div className="flex justify-center">
            <Button onClick={() => navigate(-1)} color="dark">
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Button
          onClick={() => navigate(-1)}
          color="light"
          className="flex items-center gap-2 mb-6"
        >
          <FaChevronLeft className="w-4 h-4" />
          Back 
        </Button>

        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={machine.image}
                alt={machine.name}
                className="w-48 lg:w-80 h-48 object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
              />
            </div>
            <div className="flex-grow p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FaCog className="text-primary-600" />
                {machine.name}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                This machine has been in service and has a history of reports
                listed below. Regular maintenance is advised based on the report
                history.
              </p>
              <div className="flex items-center gap-2 text-primary-600">
                <FaHistory className="w-5 h-5" />
                <span className="font-semibold">
                  {machine.reportHistory.length} Reports
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-2">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3 ">
            <FaHistory className="text-primary-600" />
            Report History
          </h2>
          {machine.reportHistory.length === 0 ? (
            <p className="text-gray-600 text-lg">
              No reports available for this machine.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {machine.reportHistory.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {report.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ViewMachine;


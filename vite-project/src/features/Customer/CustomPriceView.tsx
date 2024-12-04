

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";


interface Customer {
  id: number;
  name: string;
  conditions: number;
  email: string;
  phone: string;
}


const mockData: Customer[] = [
  { id: 1, name: "Purlator", conditions: 1, email: "purlator@example.com", phone: "123-456-7890" },
  { id: 2, name: "FedExD", conditions: 2, email: "fedexd@example.com", phone: "987-654-3210" },
  { id: 3, name: "UPSkm", conditions: 1, email: "upskm@example.com", phone: "456-789-0123" },
  { id: 4, name: "PrimeM", conditions: 3, email: "primem@example.com", phone: "789-012-3456" },
  {id : 5, name : "LogiX",conditions : 4, email : "logix@gmail.com", phone : "8906-28990-199"},
  {id : 6, name : "TransFast",conditions : 2, email : "transfast@gmail.om", phone : "8906-28990-199"},
];

const CustomerView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    const customerData = mockData.find((c) => c.id === Number(id));
    setCustomer(customerData || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!customer) {
    return <p className="text-center mt-4 text-red-500">Customer not found</p>;
  }

  return (
    <div className="max-w-full bg-gray-50  mx-auto p-6">
      <Button color="light" size="sm" onClick={() => navigate(-1)} className="mb-4">
        <HiArrowLeft className="mr-2 h-5 w-5" />
        Back
      </Button>

      <Card>
        <h1 className="text-2xl font-bold mb-4">{customer.name}</h1>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {customer.id}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <p>
            <strong>Conditions:</strong> {customer.conditions}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CustomerView;

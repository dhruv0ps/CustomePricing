import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Label, Select, TextInput, Alert } from "flowbite-react";
import { HiX, HiInformationCircle } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa";
interface Condition {
  product: string;
  minQty: number | null;
  maxQty: number | null;
  price: number | null;
}
type MockData = {
    [key: string]: {
      customer: string;
      conditions: { product: string; minQty: number; maxQty: number; price: number }[];
    };
  };
  
const productPrices: Record<string, number> = {
  "Sweet Sleep": 100,
  "Dream Delight": 150,
  "Cozy Comfort": 200,
};

// Mock API to simulate fetching/editing data
const mockData: MockData = {
  "1": {
    customer: "FedEx",
    conditions: [
      { product: "Dream Delight", minQty: 5, maxQty: 20, price: 140 },
      { product: "Sweet Sleep", minQty: 10, maxQty: 50, price: 90 },
    ],
  },
};

const fetchData = async (id: string) => {
  // Simulating an API call to fetch data based on ID
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData[id] || null), 500);
  });
};

const PricingConditions = () => {
  const { id } = useParams(); // Get the ID from the route
  const navigate = useNavigate();

  const [isEditMode, _setIsEditMode] = useState<boolean>(!!id);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [customer, setCustomer] = useState<string>("Purulator");
  const [conditions, setConditions] = useState<Condition[]>([
    { product: "", minQty: null, maxQty: null, price: null },
  ]);
  const [validationMsg, setValidationMsg] = useState<string[]>([""]);

  // Fetch existing data for editing if an ID is present
  useEffect(() => {
    if (id) {
      fetchData(id).then((data: any) => {
        if (data) {
          setCustomer(data.customer);
          setConditions(data.conditions);
          setValidationMsg(new Array(data.conditions.length).fill(""));
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { product: "", minQty: null, maxQty: null, price: null },
    ]);
    setValidationMsg([...validationMsg, ""]);
  };

  const handleRemoveCondition = (index: number) => {
    const updatedConditions = [...conditions];
    const updatedValidationMessages = [...validationMsg];
    updatedConditions.splice(index, 1);
    updatedValidationMessages.splice(index, 1);
    setConditions(updatedConditions);
    setValidationMsg(updatedValidationMessages);
  };

  const handleConditionChange = (
    index: number,
    field: keyof Condition,
    value: string | number | null
  ) => {
    const updatedConditions = [...conditions];
    if (field === "product" && typeof value === "string") {
      updatedConditions[index][field] = value;
    } else if (
      (field === "minQty" || field === "maxQty" || field === "price") &&
      (typeof value === "number" || value === null)
    ) {
      updatedConditions[index][field] = value;
    }

    if (field === "minQty" || field === "maxQty") {
      const minQty = updatedConditions[index].minQty;
      const maxQty = updatedConditions[index].maxQty;
      const updatedConditionsMsg = [...validationMsg];

      if (minQty !== null && maxQty !== null && minQty >= maxQty) {
        updatedConditionsMsg[index] =
          "Minimum quantity must be less than maximum quantity.";
      } else {
        updatedConditionsMsg[index] = "";
      }
      setValidationMsg(updatedConditionsMsg);
    }

    setConditions(updatedConditions);
  };

  const handleSave = async () => {
    const hasErrors = validationMsg.some((msg) => msg !== "");
    if (hasErrors) {
      alert("Please fix validation errors before saving.");
    } else {
      const payload = { customer, conditions };
      if (isEditMode) {
        console.log("Updating data with ID:", id, payload);
      } else {
        console.log("Adding new data:", payload);
      }
      alert(`Conditions ${isEditMode ? "updated" : "added"} successfully!`);
      navigate("/customer/pricemanagment");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
     <div className="min-h-screen border-l border-gray-200 bg-gray-50 -mt-5 py-12 px-4 sm:px-6 lg:px-8">
   <Button color='gray' onClick={() => navigate(-1)}>
                    <span className='flex gap-2 items-center'><FaChevronLeft />Back</span>
                </Button>
      
 <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isEditMode ? "Edit Custom Pricing" : "Add Custom Pricing"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Define pricing conditions for your customers efficiently.
          </p>
        </div>
    <Card className="max-w-3xl mx-auto mt-4">
      
      
      <div className="space-y-4">
        {/* Customer Selection */}
        <div>
          <Label htmlFor="customer" value="Customer" />
          <Select
            id="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
            className="text-sm"
          >
            <option value="Purulator">Purulator</option>
            <option value="Dhruv">Dhruv</option>
            <option value="Ayush">Ayush</option>
          </Select>
        </div>

        {/* Conditions */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Conditions</h2>
          {conditions.map((condition, index) => {
            const existingPrice =
              condition.product && productPrices[condition.product]
                ? productPrices[condition.product]
                : "N/A";

            return (
              <Card key={index} className="mb-2 p-2 ">
                <div className="flex justify-between items-center mb-2">
                  <Label
                    htmlFor={`product-${index}`}
                    value={`Product ${index + 1}`}
                    className="font-medium text-sm"
                  />
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => handleRemoveCondition(index)}
                  >
                    <HiX className="h-4 w-4" />
                  </Button>
                </div>
                <Select
                  id={`product-${index}`}
                  value={condition.product}
                  onChange={(e) =>
                    handleConditionChange(index, "product", e.target.value)
                  }
                  className="text-sm mb-2"
                >
                  <option value="">Select Product</option>
                  <option value="Sweet Sleep">Sweet Sleep</option>
                  <option value="Dream Delight">Dream Delight</option>
                  <option value="Cozy Comfort">Cozy Comfort</option>
                </Select>

                <div className="flex gap-4 items-end mb-2">
                  <div>
                    <Label htmlFor={`minQty-${index}`} value="Min Qty " />
                    <TextInput
                      id={`minQty-${index}`}
                      type="number"
                      value={condition.minQty || ""}
                      onChange={(e) =>
                        handleConditionChange(index, "minQty", Number(e.target.value))
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`maxQty-${index}`} value="Max Qty " />
                    <TextInput
                      id={`maxQty-${index}`}
                      type="number"
                      value={condition.maxQty || ""}
                      onChange={(e) =>
                        handleConditionChange(index, "maxQty", Number(e.target.value))
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                  <Label htmlFor={`price-${index}`} value="Price per item " />
                  <TextInput
                    id={`price-${index}`}
                    type="number"
                    value={condition.price || ""}
                    onChange={(e) =>
                      handleConditionChange(index, "price", Number(e.target.value))
                    }
                    className="text-sm"
                  />
                </div>
                </div>

              

                <p className="text-sm text-gray-500 mt-2">
                  Existing Price: ${existingPrice}
                </p>

                {validationMsg[index] && (
                  <Alert color="failure" icon={HiInformationCircle} className="text-xs mt-2">
                    {validationMsg[index]}
                  </Alert>
                )}
              </Card>
            );
          })}
          <Button
            color="light"
            onClick={handleAddCondition}
            className="w-full  text-sm"
          >
            Add Condition
          </Button>
        </div>

        {/* Save Button */}
        <Button color="dark" onClick={handleSave} className="w-full text-sm">
          {isEditMode ? "UPDATE" : "SAVE"}
        </Button>
      </div>
    </Card>
    </div>
  );
};

export default PricingConditions;

import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Card, Label, Textarea } from "flowbite-react";

const ReportMachine: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please describe the damage or fault.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Report submitted:", { description });
      alert("Report added successfully!");
      setLoading(false);
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="min-h-screen  bg-gray-50 -mt-5 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex justify-start">
          <Button color="gray" onClick={() => navigate(-1)}>
            <FaChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      <div className="max-w-4xl mx-auto">
    

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Report Machine Issue
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please describe the issue or damage found in the machine.
          </p>
        </div>

        <Card className=" mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="description"
                  value="Describe Damage or Fault"
                />
              </div>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
                placeholder="Enter a detailed description of the damage or fault"
              />
            </div>

            <Button
              type="submit"
              color="dark"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Submitting Report..." : "Add Report"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportMachine;
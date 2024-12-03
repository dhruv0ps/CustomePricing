import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Card, Label, TextInput, FileInput } from "flowbite-react";

interface FormState {
  machineName: string;
  image: File | null;
}

const CreateMachine: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    machineName: "",
    image: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission or API call
    setTimeout(() => {
      console.log("Form Submitted:", formState);
      setLoading(false);
      // Optionally navigate back or to a success page
      // navigate(-1);
    }, 2000);
  };

  return (
    <div className="min-h-screen border-l border-gray-200 bg-gray-50 -mt-5 py-12 px-4 sm:px-6 lg:px-8">
         <Button
          color="gray"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center"
        >
          <FaChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      <div className="max-w-3xl mx-auto">
       

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Machine Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and manage machines efficiently.
          </p>
        </div>

        <Card className="bg-white shadow-2xl p-8 mt-2">

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="machineName" value="Machine Name" />
                </div>
                <TextInput
                  id="machineName"
                  name="machineName"
                  value={formState.machineName}
                  onChange={handleInputChange}
                  required
                  placeholder="Machine name"
                />
              </div>

              <div>
                <div className="mb-2 block mt-4">
                  <Label htmlFor="image" value="Upload Image (1024x1024)" />
                </div>
                <FileInput
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {formState.image && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected file: {formState.image.name}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              color="dark"
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? "Processing..." : "Create Machine"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateMachine;



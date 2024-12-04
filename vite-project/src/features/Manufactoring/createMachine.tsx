import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Card, Label, TextInput, FileInput, Alert } from "flowbite-react";
import {toast} from "react-toastify";

interface FormState {
  machineName: string;
  image: File | null;
}

const CreateMachine: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    machineName: "",
    image: null,
  });
  const[errors,setErrors] = useState<{machineName? :string ; image? :string}>({})
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const validateForm = () => {
    const newerrors :  { machineName?: string; image?: string } = {};

    if(!formState.machineName.trim()){
      newerrors.machineName = "Machine Name is required"
    }

    if(!formState.image){
      newerrors.image = "Image is required" 
    }else if(formState.image.size>2 *1024 *1024){
      newerrors.image = "Image size must not exceed 2 MB"
    }

    setErrors(newerrors);
    return Object.keys(newerrors).length === 0;
  }

 
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
  if(!validateForm()){
    return;
  }
    
    setTimeout(() => {
      console.log("Form Submitted:", formState);
      setLoading(false);
      toast.success("Machine added sucessfully")
      navigate("/manufacturer/listmachine")
    }, 1000);
  };

  return (
    <div className="min-h-screen  bg-gray-50 -mt-5 py-12 px-4 sm:px-6 lg:px-8">
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

        <Card className="bg-white  p-8 mt-2">

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
{errors.machineName && (
  <Alert color="failure" className="mt-2">{errors.machineName}</Alert>
)}
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



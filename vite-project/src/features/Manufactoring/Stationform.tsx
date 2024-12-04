import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, FileInput, Card } from 'flowbite-react';
import ObjectMultiSelectDropdown from "../../components/ObjectMultiSelectDropdown";
import { Button } from "flowbite-react";
import {toast} from "react-toastify"
type Option = {
    value: string;
    label: string;
  };
  
  // Mock Data for Machinery and Users
  const machineryOptions: Option[] = [
    { value: "1", label: "Machinery A" },
    { value: "2", label: "Machinery B" },
    { value: "3", label: "Machinery C" },
  ];
  
  const userOptions: Option[] = [
    { value: "1", label: "User X" },
    { value: "2", label: "User Y" },
    { value: "3", label: "User Z" },
  ];
  
  const StationManagement: React.FC = () => {
    const navigate = useNavigate();
  
    const [stationName, setStationName] = useState<string>("");
    const [selectedMachinery, setSelectedMachinery] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.type !== "image/png") {
          alert("Only PNG images are allowed.");
          return;
        }
        setImage(file);
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!stationName.trim() || !image) {
        toast.info("Please fill in all required fields.");
        return;
      }
  
      setLoading(true);
  
      // Simulate form submission
      setTimeout(() => {
        console.log("Station Created:", {
          stationName,
          selectedMachinery,
          selectedUsers,
          image,
        });
        alert("Station created successfully!");
        setLoading(false);
        navigate(-1);
      }, 2000);
    };
  
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Button color='gray' onClick={() => navigate(-1)}>
                    <span className='flex gap-2 items-center'><FaChevronLeft />Back</span>
                </Button>
      <div className="max-w-3xl mx-auto space-y-8">
      

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Station Management</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and manage stations efficiently.
          </p>
        </div>

        <Card className="bg-white  p-8 mt-2">
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2 block ">
                  <Label htmlFor="stationName" value="Station Name" />
                </div>
                <TextInput
                  id="stationName"
                  type="text"
                  placeholder="Enter station name"
                  required
                  value={stationName}
                  onChange={(e) => setStationName(e.target.value)}
                />
              </div>
              
              <div>
                <div className="mb-2 block mt-2">
                  <Label htmlFor="machinery" value="Select Machinery (Multi-select)" />
                </div>
                <ObjectMultiSelectDropdown
                  options={machineryOptions}
                  value={selectedMachinery}
                  placeholder="Select machinery"
                  onChange={setSelectedMachinery}
                />
              </div>

              <div>
                <div className="mb-2 block mt-2 ">
                  <Label htmlFor="users" className="" value="Allocate Users (Multi-select)" />
                </div>
                <ObjectMultiSelectDropdown
                  options={userOptions}
                  value={selectedUsers}
                  placeholder="Select users"
                  onChange={setSelectedUsers}
                />
              </div>

              <div>
                <div className="mb-2 block mt-2">
                  <Label htmlFor="image" value="Upload Image (PNG, 1024x1024)" />
                </div>
                <FileInput
                  id="image"
                  accept="image/png"
                  onChange={handleImageChange}
                />
                {image && (
                  <p className="text-sm text-gray-600 mt-2">Selected file: {image.name}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              color="dark"
              className="w-full mt-6"
            >
              {loading ? "Creating Station..." : "Create Station"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
    );
  };
  
  export default StationManagement;

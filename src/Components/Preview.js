// Preview.js
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const Preview = () => {
  const navigate = useNavigate();
  const { form1Data, form2Data } = useContext(AppContext);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleSubmitForm = () => {
    const FormData = {
      ...form1Data,
      ...form2Data,
    };
    console.log(FormData);

    localStorage.removeItem("form1Data");
    localStorage.removeItem("form2Data");

    setConfirmationModalOpen(false);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-blue-500 text-white p-4 rounded-md mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
      </div>

      <div className="bg-white p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>First Name:</strong>
            </label>
            <p>{form1Data.firstName}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Middle Name:</strong>
            </label>
            <p>{form1Data.middleName}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Last Name:</strong>
            </label>
            <p>{form1Data.lastName}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Age:</strong>
            </label>
            <p>{form1Data.age}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Gender:</strong>
            </label>
            <p>{form1Data.gender}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Phone Number:</strong>
            </label>
            <p>{form1Data.phoneNumber}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Email:</strong>
            </label>
            <p>{form1Data.email}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Work Email:</strong>
            </label>
            <p>{form1Data.workEmail}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Address Line 1:</strong>
            </label>
            <p>{form1Data.addressLine1}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Address Line 2:</strong>
            </label>
            <p>{form1Data.addressLine2}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>City:</strong>
            </label>
            <p>{form1Data.city}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>State:</strong>
            </label>
            <p>{form1Data.state}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Country:</strong>
            </label>
            <p>{form1Data.country}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Pin Code:</strong>
            </label>
            <p>{form1Data.pinCode}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Technical Skills:</strong>
            </label>
            <p>{form2Data.technicalSkills}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Verbal Languages Spoken:</strong>
            </label>
            <p>{form2Data.verbalLanguagesSpoken}</p>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Experience:</strong>
            </label>
            <div>
              {form2Data.experiences.map((experience, index) => (
                <p key={index}>{experience}</p>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Education:</strong>
            </label>
            <div>
              {form2Data.educations.map((education, index) => (
                <p key={index}>{education}</p>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <label className="text-gray-600 block">
              <strong>Github Link:</strong>
            </label>
            <p>{form2Data.githubLink}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Back
        </button>

        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => setConfirmationModalOpen(true)}
        >
          Submit Form
        </button>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleSubmitForm}
        buttonType={"submit"}
      />
    </div>
  );
};

export default Preview;

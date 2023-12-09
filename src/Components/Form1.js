import React, { useState, useContext, useEffect } from "react";
import { cities, states, countries } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ErrorComponent from "./ErrorComponent";
import ConfirmationModal from "./ConfirmationModal";

const Form1 = () => {
  const { setForm1Data } = useContext(AppContext);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [formData, setFormData] = useState(() => {
    const storedFormData = localStorage.getItem("form1Data");
    return storedFormData
      ? JSON.parse(storedFormData)
      : {
          firstName: "",
          middleName: "",
          lastName: "",
          age: "",
          gender: "",
          phoneNumber: "",
          email: "",
          workEmail: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
          pinCode: "",
        };
  });

  const handleErrors = () => {
    const error = {};
    ErrorvalidateForm(error);
    setValidationErrors(error);
  };

  const ErrorvalidateForm = (errors) => {
    const phoneNumberRegex = /^(\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4})$/;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const pincodeRegex = /^\d{6}$/;

    if (formData.firstName.trim() === "") {
      errors.firstName = "First Name is required";
    }

    if (formData.lastName.trim() === "") {
      errors.lastName = "Last Name is required";
    }

    if (formData.age.trim() === "") {
      errors.age = "Age is required";
    } else if (isNaN(formData.age) || parseInt(formData.age, 10) <= 0) {
      errors.age = "Invalid age";
    }

    if (formData.gender.trim() === "") {
      errors.gender = "Gender is required";
    }

    if (formData.phoneNumber.trim() === "") {
      errors.phoneNumber = "Phone Number is required";
    } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (formData.addressLine1.trim() === "") {
      errors.addressLine1 = "Address Line 1 is required";
    }

    if (formData.city === "someOption") {
      errors.city = "City is required";
    }

    if (formData.country === "someOption") {
      errors.country = "Country is required";
    }

    if (formData.pinCode.trim() === "") {
      errors.pinCode = "Pin Code is required";
    } else if (!pincodeRegex.test(formData.pinCode)) {
      errors.pinCode = "Invalid pin code";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateForm = () => {
    const phoneNumberRegex = /^(\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4})$/;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const pincodeRegex = /^\d{6}$/;

    if (formData.firstName.trim() === "") {
      return false;
    }

    if (formData.lastName.trim() === "") {
      return false;
    }

    if (formData.age.trim() === "") {
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age, 10) <= 0) {
      return false;
    }

    if (formData.gender.trim() === "") {
      return false;
    }

    if (formData.phoneNumber.trim() === "") {
      return false;
    } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
      return false;
    }

    if (formData.email.trim() === "") {
      return false;
    } else if (!emailRegex.test(formData.email)) {
      return false;
    }

    if (formData.addressLine1.trim() === "") {
      return false;
    }

    if (formData.city === "someOption") {
      return false;
    }

    if (formData.country === "someOption") {
      return false;
    }

    if (formData.pinCode.trim() === "") {
      return false;
    } else if (!pincodeRegex.test(formData.pinCode)) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleErrors();
    const isValid = validateForm();
    setNextButtonDisabled(!isValid);

    setForm1Data((prevForm1Data) => ({
      ...prevForm1Data,
      [name]: value,
    }));
  };

  const handleReset = () => {
    localStorage.removeItem("form1Data");
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      gender: "",
      phoneNumber: "",
      email: "",
      workEmail: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    });
    setValidationErrors({});
    setNextButtonDisabled(true);
    setForm1Data({
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      gender: "",
      phoneNumber: "",
      email: "",
      workEmail: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    });
    setConfirmationModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const isValid = validateForm();
    if (isValid) {
      setNextButtonDisabled(false);
    }
    localStorage.setItem("form1Data", JSON.stringify(formData));
  }, [formData]);

  const navigate = useNavigate();

  return (
    <div>
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label
            for="error"
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onClick={handleErrors}
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.firstName && (
              <ErrorComponent errorText={validationErrors.firstName} />
            )}
          </div>
        </div>

        {/* Middle Name */}
        <div className="mb-4">
          <label
            htmlFor="middleName"
            className="block text-sm font-medium text-gray-600"
          >
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.lastName && (
              <ErrorComponent errorText={validationErrors.lastName} />
            )}
          </div>
        </div>

        {/* Age */}
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-600"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.age && (
              <ErrorComponent errorText={validationErrors.age} />
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div>
            {validationErrors.gender && (
              <ErrorComponent errorText={validationErrors.gender} />
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.phoneNumber && (
              <ErrorComponent errorText={validationErrors.phoneNumber} />
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.email && (
              <ErrorComponent errorText={validationErrors.email} />
            )}
          </div>
        </div>

        {/* Work Email */}
        <div className="mb-4">
          <label
            htmlFor="workEmail"
            className="block text-sm font-medium text-gray-600"
          >
            Work Email
          </label>
          <input
            type="email"
            id="workEmail"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Address Line 1 */}
        <div className="mb-4">
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-600"
          >
            Address Line 1
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            required
            value={formData.addressLine1}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.addressLine1 && (
              <ErrorComponent errorText={validationErrors.addressLine1} />
            )}
          </div>
        </div>

        {/* Address Line 2 */}
        <div className="mb-4">
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-600"
          >
            Address Line 2
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-600"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="someOption">Select a city</option>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <div>
            {validationErrors.city && (
              <ErrorComponent errorText={validationErrors.city} />
            )}
          </div>
        </div>

        {/* State */}
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-600"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="someOption">Select a State</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-600"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="someOption">Select a Country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <div>
            {validationErrors.countries && (
              <ErrorComponent errorText={validationErrors.countries} />
            )}
          </div>
        </div>

        {/* Pin Code */}
        <div className="mb-4">
          <label
            htmlFor="pinCode"
            className="block text-sm font-medium text-gray-600"
          >
            Pin Code
          </label>
          <input
            type="number"
            id="pinCode"
            name="pinCode"
            required
            value={formData.pinCode}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <div>
            {validationErrors.pinCode && (
              <ErrorComponent errorText={validationErrors.pinCode} />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isNextButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isNextButtonDisabled}
            onClick={() => navigate("/form2")}
          >
            Next
          </button>

          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setConfirmationModalOpen(true)}
          >
            Reset
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleReset}
        buttonType={"reset"}
      />
    </div>
  );
};

export default Form1;

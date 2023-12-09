import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ErrorComponent from "./ErrorComponent";
import ConfirmationModal from "./ConfirmationModal";

const Form2 = () => {
  const { setForm2Data } = useContext(AppContext);
  const [validationErrors, setValidationErrors] = useState({});
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [formData, setFormData] = useState(() => {
    const storedFormData = localStorage.getItem("form2Data");
    return storedFormData
      ? JSON.parse(storedFormData)
      : {
          technicalSkills: "",
          verbalLanguagesSpoken: "",
          experiences: [""],
          educations: [""],
          githubLink: "",
        };
  });
  const navigate = useNavigate();
  const [isPreviewButtonDisabled, setPreviewButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleErrors();
    const isValid = validateForm();
    setPreviewButtonDisabled(!isValid);
    setForm2Data((prevForm2Data) => ({
      ...prevForm2Data,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isValid = validateForm();
    if (isValid) {
      setPreviewButtonDisabled(false);
    }
    localStorage.setItem("form2Data", JSON.stringify(formData));
  }, [formData]);

  const handleExperienceChange = (e, index) => {
    const { value } = e.target;
    handleErrors();
    setFormData((prevData) => {
      const updatedExperiences = [...prevData.experiences];
      updatedExperiences[index] = value;
      return { ...prevData, experiences: updatedExperiences };
    });

    validateForm();
    setForm2Data(formData);
  };

  const handleAddExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: [...prevData.experiences, ""],
    }));
    setForm2Data(formData);
  };

  const handleRemoveExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: prevData.experiences.filter((_, i) => i !== index),
    }));

    validateForm();
    setForm2Data(formData);
  };

  const handleEducationChange = (e, index) => {
    const { value } = e.target;
    handleErrors();
    setFormData((prevData) => {
      const updatedEducations = [...prevData.educations];
      updatedEducations[index] = value;
      return { ...prevData, educations: updatedEducations };
    });

    validateForm();
    setForm2Data(formData);
  };

  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      educations: [...prevData.educations, ""],
    }));
    setForm2Data(formData);
  };

  const handleRemoveEducation = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      educations: prevData.educations.filter((_, i) => i !== index),
    }));

    validateForm();
    setForm2Data(formData);
  };

  const handleErrors = () => {
    const error = {};
    ErrorvalidateForm(error);
    setValidationErrors(error);
  };

  const ErrorvalidateForm = (errors) => {
    const githubLinkRegex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    const isRequired = (value) => value.trim() !== "";

    if (!isRequired(formData.technicalSkills)) {
      errors.technicalSkills = "Technical Skills is required";
    }

    if (formData.experiences.some((experience) => !isRequired(experience))) {
      errors.experiences = "All Experience entries are required";
    }

    if (formData.educations.some((education) => !isRequired(education))) {
      errors.educations = "All Education entries are required";
    }

    if (formData.githubLink !== "") {
      if (!githubLinkRegex.test(formData.githubLink)) {
        errors.githubLink = "Invalid Github Link";
      }
    }
    const isValid = Object.keys(errors).length === 0;

    return isValid;
  };

  const validateForm = () => {
    const errors = {};
    const githubLinkRegex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    const isRequired = (value) => value.trim() !== "";

    if (!isRequired(formData.technicalSkills)) {
      return false;
    }

    if (formData.experiences.some((experience) => !isRequired(experience))) {
      return false;
    }

    if (formData.educations.some((education) => !isRequired(education))) {
      return false;
    }

    if (formData.githubLink !== "") {
      if (!githubLinkRegex.test(formData.githubLink)) {
        return false;
      }
    }
    const isValid = Object.keys(errors).length === 0;

    return isValid;
  };

  const handleReset = () => {
    localStorage.removeItem("form2Data");
    setFormData({
      technicalSkills: "",
      verbalLanguagesSpoken: "",
      experiences: [""],
      educations: [""],
      githubLink: "",
    });

    setPreviewButtonDisabled(true);
    setForm2Data({
      technicalSkills: "",
      verbalLanguagesSpoken: "",
      experiences: [""],
      educations: [""],
      githubLink: "",
    });
    setConfirmationModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {/* Technical Skills */}
        <div className="mb-4">
          <label
            htmlFor="technicalSkills"
            className="block text-sm font-medium text-gray-600"
          >
            Technical Skills
          </label>
          <input
            type="text"
            id="technicalSkills"
            name="technicalSkills"
            onClick={handleErrors}
            required
            value={formData.technicalSkills}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <ErrorComponent errorText={validationErrors.technicalSkills} />
        </div>

        {/* Verbal Languages Spoken */}
        <div className="mb-4">
          <label
            htmlFor="verbalLanguagesSpoken"
            className="block text-sm font-medium text-gray-600"
          >
            Verbal Languages Spoken
          </label>
          <input
            type="text"
            id="verbalLanguagesSpoken"
            name="verbalLanguagesSpoken"
            value={formData.verbalLanguagesSpoken}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label
            htmlFor="experiences"
            className="block text-sm font-medium text-gray-600"
          >
            Experience (Can add multiple)
          </label>
          {formData.experiences.map((experience, index) => (
            <div key={index} className="flex items-center mb-2">
              <textarea
                id={`experience-${index}`}
                name={`experience-${index}`}
                value={experience}
                onChange={(e) => handleExperienceChange(e, index)}
                className="mt-1 p-2 border rounded-md w-full"
              />
              <button
                type="button"
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => handleRemoveExperience(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex items-center">
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              onClick={handleAddExperience}
            >
              Add Experience
            </button>
          </div>
          <ErrorComponent errorText={validationErrors.experiences} />
        </div>

        {/* Education */}
        <div className="mb-4">
          <label
            htmlFor="educations"
            className="block text-sm font-medium text-gray-600"
          >
            Education (Can add multiple)
          </label>
          {formData.educations.map((education, index) => (
            <div key={index} className="flex items-center mb-2">
              <textarea
                id={`education-${index}`}
                name={`education-${index}`}
                value={education}
                onChange={(e) => handleEducationChange(e, index)}
                className="mt-1 p-2 border rounded-md w-full"
              />
              <button
                type="button"
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => handleRemoveEducation(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex items-center">
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              onClick={handleAddEducation}
            >
              Add Education
            </button>
          </div>
          <ErrorComponent errorText={validationErrors.educations} />
        </div>

        {/* Github Link */}
        <div className="mb-4">
          <label
            htmlFor="githubLink"
            className="block text-sm font-medium text-gray-600"
          >
            Github Link
          </label>
          <input
            type="text"
            id="githubLink"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <ErrorComponent errorText={validationErrors.githubLink} />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/preview")}
            type="button"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isPreviewButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isPreviewButtonDisabled}
          >
            Preview
          </button>

          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setConfirmationModalOpen(true)}
          >
            Reset
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => navigate(-1)}
          >
            Back
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

export default Form2;

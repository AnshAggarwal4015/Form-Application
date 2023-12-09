import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [form1Data, setForm1Data] = useState({
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
  const [form2Data, setForm2Data] = useState({
    technicalSkills: "",
    verbalLanguagesSpoken: "",
    experiences: [""],
    educations: [""],
    githubLink: "",
  });

  const value = {
    form1Data,
    setForm1Data,
    form2Data,
    setForm2Data,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

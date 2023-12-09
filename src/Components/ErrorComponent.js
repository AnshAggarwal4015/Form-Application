import React from "react";

const ErrorComponent = ({ errorText }) => {
  return (
    <div className="font-semibold text-red-600 drop-shadow-2xl text-sm" p-4>
      {errorText}
    </div>
  );
};

export default ErrorComponent;

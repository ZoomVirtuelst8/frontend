import React from "react";

const TextareaForm = ({ value, onChange, onSubmit, placeholder, titulo }) => {
  return (
    <div className="w-full px-20 h-80 mb-8">
      <h2 className="font-bold">{titulo}</h2>
      <textarea
        className="text-m u"
        value={value}
        onChange={onChange}
        name="adult"
        cols="100"
        rows="15"
        placeholder={placeholder}
      ></textarea>
      <div>
        <button onClick={onSubmit} className="btn-w">
          ENVIAR
        </button>
      </div>
    </div>
  );
};

export default TextareaForm;

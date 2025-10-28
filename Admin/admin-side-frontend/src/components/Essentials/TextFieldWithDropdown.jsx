import React, { useState } from "react";

const TextFieldWithDropdown = ({
  data = [],
  fieldKey,
  placeholderName,
  valueName,
  id,
  name,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(data);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredOptions(data);
    } else {
      const filtered = data.filter((option) =>
        option[valueName]?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
    setIsDropdownVisible(true);
  };

  // const handleFocus = () => {
  //   setFilteredOptions(data);
  //   setIsDropdownVisible(true);
  // };

  // const handleBlur = () => {
  //   // Delay hiding to allow option selection
  //   setTimeout(() => {
  //     setIsDropdownVisible(false);
  //   }, 200);
  // };

  const handleOptionClick = (option) => {
    setInputValue(option[valueName]); // Set input value to selected option
    setIsDropdownVisible(false); // Hide the dropdown
    if (onChange) {
      onChange(option, fieldKey); // Call the provided onChange function
    } else {
      console.warn("onChange function is not provided.");
    }
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      {/* Text Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
        placeholder={`Select ${placeholderName}`}
        className="w-full p-2 rounded ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-[#5652B7] focus:ring-inset focus:ring-2"
        id={id}
        name={name}
        required
      />

      {/* Dropdown */}
      {isDropdownVisible && (
        <ul className="absolute top-10 w-full bg-white ring-1 ring-black rounded max-h-[200px] overflow-y-auto list-none m-0 p-0 z-[1000]">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.id || `option-${index}`}
                onClick={() => handleOptionClick(option)}
                className="p-2 cursor-pointer border-b-[1px] border-[#eee] hover:bg-gray-200"
              >
                {option[valueName]}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500 cursor-default">
              No {placeholderName} Found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TextFieldWithDropdown;

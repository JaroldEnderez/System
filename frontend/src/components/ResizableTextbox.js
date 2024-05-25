import { Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

function ResizableTextbox() {
  const [value, setValue] = useState("");

  // Function to handle input change and resize the input box dynamically
  const handleInputChange = (event) => {
    setValue(event.target.value);
    resizeInput();
  };

  // Function to resize the input box
  const resizeInput = () => {
    const inputBox = document.getElementById("inputBox");
    inputBox.style.height = "auto";
    inputBox.style.height = inputBox.scrollHeight + "px";
  };

  return (
    <Textarea
      id="inputBox"
      value={value}
      onChange={handleInputChange}
      placeholder="Reply..."
      size="md" // Set the initial size of the input box
      resize="vertical" // Allow vertical resizing
    />
  );
}

export default ResizableTextbox;

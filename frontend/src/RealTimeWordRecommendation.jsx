import React, { useState } from "react";
import { debounce } from "lodash"; // Import debounce function from lodash

const RealTimeWordRecommendation = () => {
  const [inputText, setInputText] = useState(""); // To store user input
  const [recommendations, setRecommendations] = useState(""); // To store generated recommendations

  // Function to call the backend API and get word recommendations
  const fetchRecommendations = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setRecommendations(data.response); // Set the recommendations from the response
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Debounced input handler to prevent too many API calls
  const debouncedFetchRecommendations = debounce((text) => {
    fetchRecommendations(text);
  }, 500); // Adjust the debounce delay as needed (500ms in this case)

  // Handler for input changes
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text); // Update the input text

    if (text.length > 0) {
      debouncedFetchRecommendations(text); // Call debounced function
    } else {
      setRecommendations(""); // Clear recommendations if input is empty
    }
  };

  return (
    <div>
      <h1>Real-Time Word Recommendation</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      <div>
        <h3>Recommendations:</h3>
        <p>{recommendations}</p>
      </div>
    </div>
  );
};

export default RealTimeWordRecommendation;

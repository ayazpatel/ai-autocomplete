import React, { useState } from 'react';

function AutoCompleteComponent() {
    const [inputText, setInputText] = useState("");
    const [suggestion, setSuggestion] = useState("");

    const handleInputChange = async (e) => {
        const text = e.target.value;
        setInputText(text);
        
        // Send the input text to Flask API
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        setSuggestion(data.suggestion); // Set the AI suggestion from Flask
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputText} 
                onChange={handleInputChange} 
                placeholder="Start typing..." 
            />
            {suggestion && <div>Suggested text: {suggestion}</div>}
        </div>
    );
}

export default AutoCompleteComponent;

import React, { useState, useRef, useEffect } from 'react';

// Main App Component
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans p-4 text-white">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-2">
          AI Autocomplete
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Start typing and let TinyLlama complete your thoughts. Press 'Tab' to accept.
        </p>
        <AutoCompleteComponent />
      </div>
       <footer className="text-center text-gray-500 mt-12 text-sm">
            <p>Powered by Ollama & TinyLlama. UI by Gemini.</p>
        </footer>
    </div>
  );
}

// The AutoComplete Component with Inline Suggestion
function AutoCompleteComponent() {
    const [inputText, setInputText] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);

    const debounceTimeout = useRef(null);

    const fetchSuggestion = async (text) => {
        if (!text.trim()) {
            setSuggestion("");
            return;
        }
        
        setLoading(true);
        try {
            // Use the correct Flask server URL
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            // Only show the suggestion if it's not empty and different from the input
            if (data.suggestion && data.suggestion.trim().length > 0) {
                 setSuggestion(data.suggestion);
            } else {
                 setSuggestion("");
            }

        } catch (error) {
            console.error("Failed to fetch suggestion:", error);
            setSuggestion("");
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        setSuggestion(""); 

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            fetchSuggestion(text);
        }, 300); // 300ms delay
    };

    const handleKeyDown = (e) => {
        if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
            e.preventDefault();
            // Append only the part of the suggestion that is not already typed
            setInputText(inputText + suggestion);
            setSuggestion("");
        }
    };
    
    useEffect(() => {
        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, []);

    // This is the combined text for the visual suggestion layer
    const suggestionText = inputText + suggestion;

    return (
        <div className="relative w-full">
            {/* This container helps align the real input and the suggestion layer */}
            <div className="relative w-full h-14">
                {/* Layer 1: The visual suggestion text (grayed out) */}
                <input
                    type="text"
                    value={suggestion ? suggestionText : inputText}
                    readOnly
                    className="absolute inset-0 w-full h-full p-4 bg-transparent text-gray-500 text-lg pointer-events-none"
                    style={{ WebkitTextFillColor: "rgba(107, 114, 128, 0.8)" }} // For Safari/Chrome
                />
                
                {/* Layer 2: The actual, interactive input field */}
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Start typing here..." 
                    className="absolute inset-0 w-full h-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:border-purple-500 transition-colors duration-300 z-10"
                    autoComplete="off"
                    style={{ background: 'transparent' }} // Make background transparent to see the layer below
                />
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                    <svg className="animate-spin h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
}

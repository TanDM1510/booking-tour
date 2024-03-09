import { Input } from "@nextui-org/react";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

const Search = ({ search, label, initialValue = "", onSearchError, page }) => {
  const [searchParam, setSearchParam] = useState(initialValue);
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleChange = useCallback(
    debounce((value) => {
      if (search) {
        try {
          // Perform additional validation or error handling here if needed
          dispatch(search({ name: value, page: page }));
        } catch (error) {
          if (onSearchError) {
            onSearchError(error); // Call the provided error handler
          } else {
            console.error("Search failed:", error); // Fallback error logging
          }
        }
      }
    }, 500), // Set debounce delay to 500ms
    [dispatch, search, onSearchError] // Include dependencies for proper memoization
  );

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchParam(inputValue);
    debouncedHandleChange(inputValue);
  };

  return (
    <Input
      label={`${label}`}
      size="md"
      className="w-[300px]"
      value={searchParam}
      onChange={handleChange}
      placeholder="Enter search term" // Added placeholder for clarity
    />
  );
};

export default Search;

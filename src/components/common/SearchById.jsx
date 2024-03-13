import { Select, SelectItem } from "@nextui-org/react";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

const SearchById = ({ label, search, page, array = [], name }) => {
  const [searchParam, setSearchParam] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchParam(inputValue);
    debouncedHandleChange(inputValue);
  };

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
          dispatch(search({ id: value, page: page }));
        } catch (error) {
          console.log(error);
        }
      }
    }, 500), // Set debounce delay to 500ms
    [dispatch, search] // Include dependencies for proper memoization
  );
  return (
    <Select
      label={`${label}`}
      placeholder="Enter search term"
      required
      onChange={handleChange}
      value={searchParam}
      className="w-[300px]"
      defaultSelectedKeys={""}
    >
      {array.map((s) => (
        <SelectItem key={s.id} value={s.id}>
          {s.tourName}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SearchById;

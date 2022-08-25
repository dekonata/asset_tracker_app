import { useCallback, useState, useEffect } from "react";

function useRoveFocus(size) {
    // Custom hook used to change list item focus using keyboard arrows
    const [currentFocus, setCurrentFocus] = useState(-1);

    const handleKeyDown = useCallback(event => {
        if (event.keyCode === 40) {
          // Up Arrow
          event.preventDefault();
          setCurrentFocus(currentFocus === size -1 ? 0 : currentFocus + 1)
        } else if (event.keyCode === 38) {
          //Down Arrow
          event.preventDefault();
          setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1)
        }
      },
      [size, currentFocus, setCurrentFocus]
    );

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown, false)
      return () => {
        document.removeEventListener("keydown", handleKeyDown, false)
      };
    },[handleKeyDown]);

    return [ currentFocus, setCurrentFocus];
  }

  export default useRoveFocus
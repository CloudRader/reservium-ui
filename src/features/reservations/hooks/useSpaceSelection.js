import { useState } from 'react';

/**
 * Custom hook for managing additional space selection
 * Handles adding and removing spaces from a list
 */
export const useSpaceSelection = () => {
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState('');

  /**
   * Add a space to the selected spaces list
   * Prevents duplicates
   */
  const addSpace = () => {
    if (selectedSpace && !selectedSpaces.includes(selectedSpace)) {
      setSelectedSpaces([...selectedSpaces, selectedSpace]);
      setSelectedSpace('');
    }
  };

  /**
   * Remove a space from the selected spaces list
   * @param {string} space - Space to remove
   */
  const removeSpace = (space) => {
    setSelectedSpaces(selectedSpaces.filter((s) => s !== space));
  };

  /**
   * Clear all selected spaces
   */
  const clearSpaces = () => {
    setSelectedSpaces([]);
    setSelectedSpace('');
  };

  return {
    selectedSpaces,
    selectedSpace,
    setSelectedSpace,
    addSpace,
    removeSpace,
    clearSpaces,
  };
};

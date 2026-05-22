import { useState, useCallback } from 'react';

interface UseToggleActions {
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

export function useToggle(initialState = false): [boolean, UseToggleActions] {
  const [state, setState] = useState(initialState);

  // useCallback guarantee that the function is not reinitialized on every render
  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, { toggle, setTrue, setFalse }];
}

// Usage example:
/*
import { useToggle } from '../hooks/useToggle';
...
const [isModalOpen, { toggle: toggleModal, setFalse: closeModal }] = useToggle(false);
...
const handleOpen = () => {
    toggleModal();
};

const handleClose = () => {
    closeModal();
};
*/
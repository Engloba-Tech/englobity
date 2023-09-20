import { useState } from 'react';

export function useTogglingElements({ toggleProperty }) {
  const [toggledProperties, setToggledProperties] = useState([]);

  function onToggleElement(element) {
    if (toggledProperties.find(tp => tp === element[toggleProperty]))
      setToggledProperties(prevToggledProperties => prevToggledProperties.filter(tp => tp !== element[toggleProperty]));
    else setToggledProperties(prevToggledProperties => [...prevToggledProperties, element[toggleProperty]]);
  }

  const isToggled = row => {
    return toggledProperties?.some(tp => tp === row[toggleProperty]);
  };

  return {
    onToggleElement,
    isToggled
  };
}

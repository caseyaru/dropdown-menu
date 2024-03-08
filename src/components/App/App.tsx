import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

//контент для дропдауна (в данном случае - простой массив)
import { options } from '../../utils/options';

function App() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const handleToggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const closeDropdown = () => {
    setOpenDropdownIndex(null);
  };

  return (
    <div className={styles.app}>
      {options.map((_, index) => (
        <DropdownMenu
          key={index}
          isOpen={openDropdownIndex === index}
          items={options}
          handleClick={() => handleToggleDropdown(index)}
          closeDropdown={closeDropdown}
        />
      ))}
    </div>
  );
}

export default App;

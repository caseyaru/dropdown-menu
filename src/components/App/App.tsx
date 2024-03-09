import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

//контент для дропдауна (в данном случае - простой массив)
import { options } from '../../utils/options';

function App() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [lastOpenedIndex, setLastOpenedIndex] = useState<number | null>(null);

  const handleToggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
      setLastOpenedIndex(index);
    }
  };

  const closeDropdown = () => {
    setOpenDropdownIndex(null);
  };

  const openDropdown = () => {
    console.log('ты работаешь')
    setOpenDropdownIndex(lastOpenedIndex)
    // if (lastOpenedIndex !== null) {
    //   //console.log(lastOpenedIndex)
    //   setOpenDropdownIndex(lastOpenedIndex)
    //   //console.log('openDropdownIndex', openDropdownIndex)
    // }
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
          openDropdown={openDropdown}
        />
      ))}
    </div>
  );
}

export default App;

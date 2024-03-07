import React, { useState } from 'react';
import styles from './App.module.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

//контент для дропдауна (в данном случае - простой массив)
import { options } from '../../utils/options';

function App() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const handleToggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      // Если кликаем по уже открытому, закрываем
      setOpenDropdownIndex(null);
    } else {
      // Иначе открываем текущий и закрываем остальные
      setOpenDropdownIndex(index);
    }
  };

  return (
    <div className={styles.app}>
      {options.map((_, index) => (
        <DropdownMenu
          key={index}
          isOpen={openDropdownIndex === index}
          items={options}
          handleClick={() => handleToggleDropdown(index)}
        />
      ))}
      {/* <DropdownMenu isOpen={isOpen} items={options} handleClick={handleOpen} />
      <DropdownMenu isOpen={isOpen} items={options} handleClick={handleOpen} />
      <DropdownMenu isOpen={isOpen} items={options} handleClick={handleOpen} /> */}
    </div>
  );
}

export default App;

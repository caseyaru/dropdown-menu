import React from 'react';
import styles from './DropdownMenu.module.css';
import { Option } from '../../utils/options';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DropdownMenuProps {
  isOpen: boolean,
  items: Option[],
  handleClick: React.MouseEventHandler<HTMLButtonElement>
}

const DropdownMenu = ({ isOpen, items, handleClick }: DropdownMenuProps) => {
  return <div>
    <button type="button" onClick={handleClick} className={styles.button}>
      <img src="info.svg" alt="dropdown main icon" />
    </button>
    {isOpen && 
      <ul className={styles.list}>
        {items.map((item, index) =>  
        <li key={index} className={styles.option}>
          <p className={styles.text}>{item.title}</p>
          <img src={item.icon} alt="icon for option" className={styles.icon}/>
        </li>
        )}
      </ul>
      }
  </div>
};

export default DropdownMenu;
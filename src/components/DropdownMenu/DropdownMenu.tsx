import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.css';
import { Option } from '../../utils/options';

interface DropdownMenuProps {
  isOpen: boolean,
  items: Option[],
  handleClick: React.MouseEventHandler<HTMLButtonElement>
}

const DropdownMenu = ({ isOpen, items, handleClick }: DropdownMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [positionY, setPositionY] = useState<string | number>('down');
  const [positionX, setPositionX] = useState<string | number>('right');

  const calculatePosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      //проверка на пространство наверху: если его больше, отображаем наверх
      const isTopEnoughSpace = buttonRect.top > windowHeight - buttonRect.bottom;
      console.log('buttonRect.top, buttonRect.bottom', buttonRect.top, buttonRect.bottom, isTopEnoughSpace)
      isTopEnoughSpace ? setPositionY('up') : setPositionY('down');
      //если слева пространства больше, отображаем влево
      const isLeftEnoughSpace = buttonRect.left > windowWidth - buttonRect.right;
      isLeftEnoughSpace ? setPositionX('left') : setPositionX('right');
    }
  };

  useEffect(() => {
    calculatePosition();
    console.log('width & height', window.innerWidth, window.innerHeight)
    window.addEventListener('resize', calculatePosition);
    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen]);

  return <div className={styles.dropdown}>
    <button type="button" onClick={handleClick} className={styles.button} ref={buttonRef}>
      <img src="info.svg" alt="dropdown main icon" />
    </button>
    {isOpen && 
      <ul className={`${styles.content} ${styles[positionX]} ${styles[positionY]}`}>
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
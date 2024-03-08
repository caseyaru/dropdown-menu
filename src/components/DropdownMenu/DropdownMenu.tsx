import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.css';
import { Option } from '../../utils/options';

interface DropdownMenuProps {
  isOpen: boolean;
  items: Option[];
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  closeDropdown: () => void;
  openDropdown: () => void
}

const DropdownMenu = ({ isOpen, items, handleClick, closeDropdown, openDropdown }: DropdownMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null); //для высчитывания положения контента
  const contentRef = useRef<HTMLUListElement>(null); //для закрытия контента при нажатии вне его

  const [positionY, setPositionY] = useState<string | number>('down');
  const [positionX, setPositionX] = useState<string | number>('right');

  const calculatePosition = () => {
    if (buttonRef.current && isOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      //проверка на пространство наверху: если его больше, отображаем наверх
      const isTopEnoughSpace = buttonRect.top > windowHeight - buttonRect.bottom;
      isTopEnoughSpace ? setPositionY('up') : setPositionY('down');
      //если слева пространства больше, отображаем влево
      const isLeftEnoughSpace = buttonRect.left > windowWidth - buttonRect.right;
      isLeftEnoughSpace ? setPositionX('left') : setPositionX('right');
    }
  };

  const [prevScrollPos, setPrevScrollPos] = useState<number>(window.scrollY);

  const handleScroll = () => {
    if (buttonRef.current && contentRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const currentScrollPos = window.scrollY;
  
      // Проверяем, виден ли button во viewport
      const isButtonVisible =
        buttonRect.top >= 0 &&
        buttonRect.left >= 0 &&
        buttonRect.bottom <= window.innerHeight &&
        buttonRect.right <= window.innerWidth;
  
      if (!isButtonVisible && isOpen) {
        // Если button не виден и контент открыт, скрываем контент
        closeDropdown();
        console.log('батон невизибл');
      } else if (isButtonVisible) {
        // Если button виден
        calculatePosition();
        console.log('батон визибл');
        openDropdown();
      }

      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, prevScrollPos]);

  const handleOptionClick = (item: Option) => {
    item.handleSelect();
    closeDropdown();
  };

  //проверяем, чтобы клик был вне контента, но без учёта кнопки
  const handleClickOutside = (event: MouseEvent) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  //слушатели для акрытия по нажатию вне контента
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.dropdown}>
      <button type="button" onClick={handleClick} className={styles.button} ref={buttonRef}>
        <img src="info.svg" alt="dropdown main icon" />
      </button>
      {isOpen && (
        <ul
          className={`${styles.content} ${styles[positionX]} ${styles[positionY]}`}
          ref={contentRef}
        >
          {items.map((item, index) => (
            <li key={index} className={styles.option} onClick={() => handleOptionClick(item)}>
              <p className={styles.text}>{item.title}</p>
              <img src={item.icon} alt="icon for option" className={styles.icon} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;

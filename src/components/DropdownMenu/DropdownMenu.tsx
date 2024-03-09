import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.css';
import { Option } from '../../utils/options';

interface DropdownMenuProps {
  isOpen: boolean;
  items: Option[];
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  closeDropdown: () => void;
}

const DropdownMenu = ({ isOpen, items, handleClick, closeDropdown }: DropdownMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null); //для высчитывания положения контента
  const contentRef = useRef<HTMLUListElement>(null); //для закрытия контента при нажатии вне его

  const [prevScrollPos, setPrevScrollPos] = useState<number>(window.scrollY);
  const [visibility, setVisibility] = useState<string>('visible'); //демонстрация контента при скролле

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

  const handleScroll = () => {
    if (buttonRef.current && contentRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const currentScrollPos = window.scrollY;

      // виден ли button во вьюпорте
      const isButtonVisible =
        buttonRect.top >= 0 &&
        buttonRect.left >= 0 &&
        buttonRect.bottom <= window.innerHeight &&
        buttonRect.right <= window.innerWidth;

      if (!isButtonVisible && isOpen) {
        setVisibility('nonvisible');
      } else if (isButtonVisible && isOpen) {
        setVisibility('visible');
      } else {
        setVisibility('visible');
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

  //слушатели для закрытия по нажатию вне контента
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.dropdown} data-testid="dropdown-menu">
      <button
        type="button"
        onClick={handleClick}
        className={styles.button}
        ref={buttonRef}
        data-testid="dropdown-button"
        id="button"
      >
        <img src="info.svg" alt="dropdown main icon" />
      </button>
      {isOpen && (
        <ul
          className={`${styles.content} ${styles[positionX]} ${styles[positionY]} ${styles[visibility]}`}
          ref={contentRef}
          data-testid="dropdown-content"
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

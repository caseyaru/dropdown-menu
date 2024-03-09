/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';

const items = [
  { title: 'Option 1', icon: 'icon1.png', handleSelect: jest.fn() },
  { title: 'Option 2', icon: 'icon2.png', handleSelect: jest.fn() },
];
const handleClick = jest.fn();
const closeDropdown = jest.fn();

describe('DropdownMenu component', () => {
  it('DropdownMenu renders when it isnt open', () => {
    render(
      <DropdownMenu
        isOpen={false}
        items={items}
        handleClick={handleClick}
        closeDropdown={closeDropdown}
      />,
    );
    screen.debug();
  });

  it('DropdownMenu renders with the list when its open', () => {
    render(
      <DropdownMenu
        isOpen={true}
        items={items}
        handleClick={handleClick}
        closeDropdown={closeDropdown}
      />,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('handleClick works when clicking on DropdownMenu button', () => {
    const { getByTestId } = render(
      <DropdownMenu
        isOpen={true}
        items={items}
        handleClick={handleClick}
        closeDropdown={closeDropdown}
      />,
    );
    fireEvent.click(getByTestId('dropdown-button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('handleOptionClick works when an option is clicked', () => {
    const { getByText } = render(
      <DropdownMenu
        isOpen={true}
        items={items}
        handleClick={handleClick}
        closeDropdown={closeDropdown}
      />,
    );
    fireEvent.click(getByText('Option 1'));
    expect(items[0].handleSelect).toHaveBeenCalled();
  });

  it('calculatePosition works correctly with starting coordinates', () => {
    render(
      <DropdownMenu
        isOpen={true}
        items={items}
        handleClick={handleClick}
        closeDropdown={closeDropdown}
      />,
    );

    const buttonDownRight = screen.getByTestId('dropdown-button');
    fireEvent.click(buttonDownRight);

    expect(screen.getByTestId('dropdown-content')).toHaveClass('down');
    expect(screen.getByTestId('dropdown-content')).toHaveClass('right');
  });
});

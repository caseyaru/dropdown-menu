import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  it('App renders', () => {
    render(<App />);
    screen.debug();
  });

  it('renders all DropdownMenus', () => {
    const { getAllByTestId } = render(<App />);
    const dropdownMenus = getAllByTestId('dropdown-menu');
    
    dropdownMenus.forEach((menu, index) => {
      fireEvent.click(menu);
      expect(menu).toBeInTheDocument();
    });
  });

  it('handleToggleDropdown works when clicking on DropdownMenu button', () => {
    const { container } = render(<App />);
    const initialOpenDropdownIndex = null;

    const button = container.querySelector('#button') as HTMLElement;
    fireEvent.click(button);

    const updatedOpenDropdownIndex = 0;

    expect(updatedOpenDropdownIndex).not.toEqual(initialOpenDropdownIndex);
  });

  it('close active DropdownMenu when clicking outside it', () => {
    const { queryByTestId } = render(<App />);

    fireEvent.click(document.body);

    const activeDropdownContent = queryByTestId('dropdown-content');
    expect(activeDropdownContent).not.toBeInTheDocument();
  });
});
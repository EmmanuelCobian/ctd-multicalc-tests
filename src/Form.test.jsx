import { describe, expect, it } from 'vitest';
import Form from './Form';
import { OperandContext } from './context/OperandContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Form', () => {
  function setup(jsx) {
    return {
        user: userEvent.setup(),
        ...render(
            <OperandContext.Provider value={{ operand: 0, setOperand: vi.fn() }}>
                {jsx}
            </OperandContext.Provider>
        )
    }
  }

  it('disables button on empty operand', async () => {
    const { user } = setup(<Form />);
    await user.clear(screen.getByLabelText(/calculate with/i));
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

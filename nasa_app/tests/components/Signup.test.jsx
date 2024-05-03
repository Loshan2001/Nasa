import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom/extend-expect'; // Import this for toBeInTheDocument()
import Signup from './SignUp';
 


// Import the component to be tested

describe('Signup component', () => {
  it('renders the signup form correctly', () => {
    const { getByLabelText, getByText } = render(<Signup />);
    
    // Check if the form inputs and labels are rendered correctly
    expect(getByLabelText('User Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Re-Enter Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();


  });

  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = render(<Signup />);

    // Fill out the form inputs
    fireEvent.change(getByLabelText('User Name'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Re-Enter Password'), { target: { value: 'password' } });

    // Submit the form
    fireEvent.click(getByText('Sign Up'));

    // Wait for the form submission and assertion
    await waitFor(() => {
      expect(/* your assertion here */).toBe(/* expected result after successful submission */);
    });
  });

  // Add more test cases for form validation, error handling, etc.
});

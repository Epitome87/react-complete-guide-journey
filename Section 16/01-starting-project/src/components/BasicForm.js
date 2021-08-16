import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const firstNameInput = useInput((value) => value.trim() !== '');
  const lastNameInput = useInput((value) => value.trim() !== '');
  const emailInput = useInput((value) => value.includes('@'));

  let formIsValid = false;

  // Check if all the inputs are valid
  if (firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid) {
    formIsValid = true;
  }

  const formSubmissionhandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    // Reset name states
    firstNameInput.reset();
    lastNameInput.reset();

    // Reset email states
    emailInput.reset();
  };

  const firstNameInputClasses = firstNameInput.hasError
    ? 'form-control invalid'
    : 'form-control';

  const lastNameInputClasses = lastNameInput.hasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInput.hasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionhandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            onChange={firstNameInput.valueChangeHandler}
            onBlur={firstNameInput.inputBlurHandler}
            value={firstNameInput.value}
          />
          {firstNameInput.hasError && (
            <p className='error-text'>First name must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            onChange={lastNameInput.valueChangeHandler}
            onBlur={lastNameInput.inputBlurHandler}
            value={lastNameInput.value}
          />
          {lastNameInput.hasError && (
            <p className='error-text'>Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          onChange={emailInput.valueChangeHandler}
          onBlur={emailInput.inputBlurHandler}
          value={emailInput.value}
        />
        {emailInput.hasError && (
          <p className='error-text'>Please enter a valid email address.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

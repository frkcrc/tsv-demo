import { useEffect, useState } from 'react';

import styles from './InputField.module.css';
import iconLoading from '../assets/arrow-clockwise.svg';
import iconOK from '../assets/check.svg';
import iconError from '../assets/exclamation-circle.svg';

const InputField = (props) => {

  const [enteredValue, setEnteredValue ] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [validationState, setValidationState] = useState('none');
  const [validationResult, setValidationResult] = useState();

  // Our effect will run on every value/isDirty change.
  // As long as isDirty is false, validation won't happen.
  // We turn isDirty on when the element is first blurred.
  // When isDirty is true, we run the validation, debouncing
  // with a timer.
  const validator = props.validator;
  useEffect(() => {
    if (!isDirty)
      return;

    const tid = setTimeout(async () => {
      setValidationState('validating');
      const result = await validator(enteredValue); // Takes time...
      setValidationResult({value: enteredValue, result: result});
    }, 500);
  
    return () => {
      // If the effect runs again before the timer runs, the timer
      // is cleared and replaced by a new one, debouncing it.
      clearTimeout(tid); 
    };
  }, [enteredValue, isDirty, validator]);
  
  // This second effect manages the validation results.
  // It applies the validation state to the form only if the latest
  // result we have is for the *same value* currently in the input.
  // If not, then the result is ignored as its obsolete.
  // This way we discard validations for values that have since changed.
  useEffect(() => {
    if (validationResult && 
        validationResult.value === enteredValue) {
      setValidationState(
        validationResult.result ? 'valid' : 'invalid'
      );
    }
  }, [enteredValue, validationResult]);

  // The first time the field blurs, we set it dirty.
  // From now on, it will validate on change.
  const onBlurHandler = event => {
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  // On change, we update the value.
  const onChangeHandler = event => {
    setEnteredValue(event.target.value);
    setValidationState('none');
  };

  const isEmpty = enteredValue === '';

  return (
    <div className={styles.group}>
      <input
        name={props.name}
        type={props.type || 'text'}
        placeholder={props.label}
        value={enteredValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        className={styles[validationState]}
      />
      <label
        className={isEmpty ? styles.hidden : ''}
        htmlFor={props.name}
      >{props.label}</label>
      <div className={styles.icon}>
        {validationState === 'validating' &&
          <img className={styles.iconLoading} src={iconLoading} alt=''/>
        }
        {validationState === 'valid' &&
          <img src={iconOK} alt=''/>
        }
        {validationState === 'invalid' &&
          <img src={iconError} alt=''/>
        }
      </div>
    </div>
  );
};

export default InputField;
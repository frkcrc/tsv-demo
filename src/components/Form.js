import InputField from './InputField';

import styles from './Form.module.css';

// This is the callback used by inputs to validate.
// In real life, this would be a API call.
// In this case, it just waits a second and returns.
const validator = async (value) => {
  const result = await new Promise(
    resolve => {
      setTimeout(() => {
        resolve(value.length >= 6);
      }, 1000);
  });
  return result;
};

const Form = () => {

  const submitHandler = event => {
    event.preventDefault();
    // We don't really do anything with the form.
  };

  return (
    <div className={styles.container}>
      <form>
        <InputField
          name='username'
          label='USERNAME'
          validator={validator}
        />
        <InputField
          type='password' 
          name='password'
          label='PASSWORD'
          validator={validator}
        />
        <div className={styles.actions}>
          <button onClick={submitHandler}>Submit</button>
        </div>
      </form>
    </div>
    
  );

};
export default Form;
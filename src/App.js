import Form from './components/Form';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <h1>Two states validation demo</h1>
      <p>
        This is a simple demo for a two states validation pattern in
        React. The form will reject inputs shorter than 6 characters.
      </p>
      <Form />
    </div>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  return (
    <>
      <Navbar Nav="Textutils" home="Home" />
      <div className="container">
        <TextForm text="Enter Text Below" />
      </div>

    </>
  );
}

export default App;

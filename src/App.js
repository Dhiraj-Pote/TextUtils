import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';


function App() {


  return (
    <>
      <Navbar Nav={<span><b>Textutils</b>: It's all about texts</span>} home="Home" />

      <div className="container">
        <div className="input-wrapper">
          <TextForm text="Enter Text Below" />
        </div>
      </div>

    </>
  );
}

export default App;

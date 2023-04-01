import React, { useState } from 'react'
import { evaluate } from 'mathjs';
import { marriageYr } from './marriageYrs.js';

export default function TextForm(props) {

  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");

  const handleOnChange = (event) => {
    setText(event.target.value);
    setOriginalText(event.target.value);
  }

  const handleOnUpClick = (event) => {
    let newText = text.toUpperCase();
    setText(newText);
  }


  const handleOnLoClick = (event) => {
    let newText = text.toLowerCase();
    setText(newText);
  }

  const handleOnExClick = (event) => {
    try {
      let newText = evaluate(text);
      setText(newText.toString());
    } catch (error) {
      console.error(error);
      setText('Invalid Format');
    }
  }

  const handleOnMarClick = (event) => {
    try {
      let newText = text;
      setText(newText.toString());
    } catch (error) {
      console.error(error);
      setText('Invalid Format');
    }
  }

  const handleOnPerClick = (event) => {
    try {
      let newText = evaluate(text);
      setText(newText.toString());
    } catch (error) {
      console.error(error);
      setText('Invalid expression');
    }
  }



  return (
    <>
      <div className='container'>
        <div className="mb-3">
          <h1><label htmlFor="Box" className="form-label">{props.text}</label></h1>
          <textarea className="form-control" value={text} onChange={handleOnChange} id="Box" rows="7"></textarea>

          <div className="btn-group">
            <button type="button" className="btn btn-success mx-1 my-2 dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            
            <button 
  className="btn btn-success mx-1 my-2" 
  onClick={handleOnMarClick} 
  style={{ height: '5px' , transform: 'scale(1)' , position: 'relative', top: '-13.5px'}}
>
  Numerology
</button>


            </button>
            <div className="dropdown-menu">
              <button className="btn btn-success mx-1 my-2" onClick={handleOnMarClick}>check your marriage years</button>
              <button className="btn btn-success mx-1 my-2" onClick={handleOnPerClick}>check your planet</button>
            </div>
          </div>

          <button className="btn btn-info mx-2 my-2" onClick={handleOnExClick}>Solve Expression</button>
          <button className="btn btn-primary mx-2 my-2" onClick={handleOnUpClick}>Convert UPPERCASE</button>
          <button className="btn btn-primary mx-2 my-2" onClick={handleOnLoClick}>Convert lowercase</button>







        </div>
        <div className="container">
          <h2>Your Text Summary</h2>
          <p></p>
          <p>Word Count: {text === "" ? 0 : text.trim().split(" ").length}</p>
          <p>Character Count: {text.length}</p>

          <h2>Original Text Preview</h2>
          <p>{originalText}</p>

        </div>
      </div>
    </>
  )
}
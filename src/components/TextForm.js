import React, { useState } from 'react'
import { evaluate } from 'mathjs';

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
      setText('Invalid expression');
    }
  }

  return (
    <>
      <div className='container'>
        <div className="mb-3">
          <h1><label htmlFor="Box" className="form-label">{props.text}</label></h1>
          <textarea className="form-control" value={text} onChange={handleOnChange} id="Box" rows="7"></textarea>
          <button className="btn btn-primary mx-3 my-3" onClick={handleOnUpClick}>Convert to Upper</button>
          <button className="btn btn-primary mx-3" onClick={handleOnLoClick}>Convert to Lower</button>
          <button className="btn btn-info mx-3"  onClick={handleOnExClick}>Solves Expression</button>
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
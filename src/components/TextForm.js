import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { evaluate } from 'mathjs';
import { marriageYr, planet } from './marriageYrs.js';

export default function TextForm(props) {

  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showVideo, setShowVideo] = useState(false)

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetch(`https://api.textgears.com/correct?key=wRzWkBFXnVZDeMhq&ai=1&text=${text}`)
      .then((res) => res.json())
      .then((data) => {
        if (text !== "") {
          setText(data.response.corrected)
        }
      })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [clicked])


  const handleOnGPTClick = (event) => {
    try {
      fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
          prompt: text,
          max_tokens: 300,
          n: 1,
          stop: ["\n"]
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API returned error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          setText(data.choices[0].text.trim());
        });

    } catch (error) {
      console.error(error);
      setText("Invalid Format");
    }
  };


  const handleOnGraClick = (event) => {
    setShowVideo(false)
    setClicked((pre) => !pre);
  }

  const handleOnChange = (event) => {
    setText(event.target.value);
    setOriginalText(event.target.value);
  }

  const handleOnUpClick = (event) => {
    setShowVideo(false)
    let newText = text.toUpperCase();
    setText(newText);
  }


  const handleOnLoClick = (event) => {
    setShowVideo(false)
    let newText = text.toLowerCase();
    setText(newText);
  }

  const handleOnExClick = (event) => {
    try {
      setShowVideo(false)
      let newText = evaluate(text);
      setText(newText.toString());
    } catch (error) {
      console.error(error);
      setText('Invalid Format');
    }
  }

  const handleOnMarClick = (event) => {
    try {

      setShowVideo(true)

      let dateOfBirth = prompt("Enter your Birth Date in 'DD-MM-YYYY' Format:");
      let gender = prompt("Enter your gender ('f' or 'm'):");
      let years = marriageYr(dateOfBirth, gender);

      const birthDate = moment(dateOfBirth, 'DD-MM-YYYY');
      const currentDate = moment();
      const age = currentDate.diff(birthDate, 'years');

      const origin = getSum(birthDate.date());

      let newText = `By Numerology calculation your expected marriage year's are: ${years}`;
      setDateOfBirth(dateOfBirth);

      if (dateOfBirth === "20-11-2005" && gender === "f") {
        setText(`Hello Raina!! 
Your Birthdate is 20Nov 2005
Age: ${age}
Marriage Status: Raina 💞 Dhiraj
Psychic number: ${origin}
${newText}
`)
      }

      else {
        setText(`Birth date: ${birthDate.format('DD MMM YYYY')}
Age: ${age}
Psychic number: ${origin}
${newText}
`);

      }
    } catch (error) {
      console.error(error);
      setText('Invalid Format');
    }
  }


  const handleOnPlaClick = (event) => {
    try {
      setShowVideo(false)
      if (dateOfBirth) {
        let newText = planet(getSum(dateOfBirth.slice(0, 2)));
        setText(newText);
      }
      else {
        let dob = prompt("Enter your Birth Date in 'DD-MM-YYYY' Format:");
        let newText = planet(getSum(dob.split("-")[0]));
        setText(newText);
      }
    } catch (error) {
      console.error(error);
      setText('Invalid format');
    }
  }


  function getSum(number) {
    let sum = 0;
    sum = String(number).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    while (sum > 9) {
      sum = getSum(sum);
    }
    return sum;
  }

  return (
    <>
      <div className='container'>
        <div className="mb-3">
          <h1><label htmlFor="Box" className="form-label">{props.text}</label></h1>
          <textarea className="form-control" value={text} onChange={handleOnChange} id="Box" rows="7"></textarea>
          {showVideo && (
            <div><a href="https://youtu.be/OKxvloNmcZY" className="ps-2" target="_blank" rel="noreferrer">ref video</a></div>
          )}

          <button className="btn btn-success dropdown-toggle mx-2 my-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Numerology
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><button className="btn btn-success mx-1 my-2" onClick={handleOnMarClick}>check your marriage years</button></li>
            <li><button className="btn btn-success mx-1 my-2" onClick={handleOnPlaClick}>check your planet</button></li>
          </ul>

          <button className="btn btn-warning mx-2 my-2" onClick={handleOnGraClick}>Correct Grammer</button>
          <button className="btn btn-info mx-2 my-2" onClick={handleOnExClick}>Solve Expression</button>
          <button className="btn btn-darkgreen mx-2 my-2" onClick={handleOnGPTClick}>Chat with GPT</button>
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
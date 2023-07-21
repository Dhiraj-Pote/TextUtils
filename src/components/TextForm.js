import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { evaluate } from 'mathjs';
import { marriageYr, planet } from './marriageYrs.js';
import { Configuration, OpenAIApi } from "openai"
import API_KEY from './key.js';

export default function TextForm(props) {

  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showVideo, setShowVideo] = useState(false)
  const [clicked, setClicked] = useState(false);


  const handleOnChange = (event) => {
    setText(event.target.value);
    setOriginalText(event.target.value);
  }

  const handleOnClearScreen = (event) => {
    setText("");
  }

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

  const handleOnWeaClick = async (event) => {
    try {
      let city = prompt("Enter Your City Name")
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01041cb4cf4d18a798e5fb0af0a848ed&units=metric`);
      const data = await response.json();
      const weather = `Weather in ${data.name}: ${data.main.temp} °C, ${data.weather[0].description}`;
      setText(weather);
    } catch (error) {
      console.error(error);
      setText("Sorry, we could not find the weather information for the entered city.");
    }
  }

  const handleOnGPTClick = (event) => {
    try {
      const openAi = new OpenAIApi(
        new Configuration({
          apiKey: API_KEY,
        })
      )

      openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
      }).then(res => {
        setText(res.data.choices[0].message.content)
      })

    } catch (error) {
      console.error(error);
      setText("Invalid Format");
    }
  };

  const handleOnTxtClick = (event) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = speechSynthesis.getVoices().find(v => v.lang === 'en-IN' && v.name === 'Microsoft Heera - English (India)');
    synth.speak(utterance);
  }


  const handleOnGraClick = (event) => {
    setShowVideo(false)
    setClicked((pre) => !pre);
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
Future Marriage Status: Raina 💞 Dhiraj
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

  const handleOnFlamesClick = (event) => {
    let yourName = prompt('Enter Your Name');
    let partnerName = prompt('Enter your crush\'s name');

    let yourNamelow = yourName.toLowerCase();
    let partnerNamelow = partnerName.toLowerCase();

    let remainingLetters = '';

    yourNamelow.split('').forEach(letter => {
      if (!partnerNamelow.includes(letter)) {
        remainingLetters += letter;
      }
    });

    partnerNamelow.split('').forEach(letter => {
      if (!yourNamelow.includes(letter)) {
        remainingLetters += letter;
      }
    });
    console.log(remainingLetters)
    let num = 0;
    if (remainingLetters.length % 6 === 0)
      num = 1;
    else
      num = remainingLetters.length % 6;

    switch (num) {
      case 1:
        setText(`Friendship: Hurray! ${yourName} and ${partnerName} share a bond of friendship that will last a lifetime. 💙`)
        break;
      case 2:
        setText(`Love: Congratulations, ${yourName} and ${partnerName} are a perfect match made in heaven. ❤️`)
        break;
      case 3:
        setText(`Affection: ${yourName} and ${partnerName} have a special kind of affection that is truly heartwarming. 💕`)
        break;
      case 4:
        setText(`Marriage: The future looks bright for ${yourName} and ${partnerName}. They'll build a strong and successful life together. 💍`)
        break;
      case 5:
        setText(`Enemy: Unfortunately, it seems that ${yourName} and ${partnerName} won't get along very well.😔`)
        break;
      case 6:
        setText(`Sibling: ${yourName} and ${partnerName} have a deep connection that can withstand the test of time. 👨‍❤️‍👨`)
        break;
      default:
        setText("Oops, there seem an error")
        break;
    }
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

          <button className="btn btn-danger mx-2 my-2" id="flames" onClick={handleOnFlamesClick}>FLAMES</button>
          <button className="btn btn-darkgreen mx-2 my-2" onClick={handleOnGPTClick}>Chat with GPT</button>
          <button className="btn btn-success mx-2 my-2" id="wea" onClick={handleOnWeaClick} >Check Weather</button>
          <button className="btn btn-danger mx-2 my-2" onClick={handleOnTxtClick}>Text to Speech</button>
          <button className="btn btn-info mx-2 my-2" onClick={handleOnExClick}>Calculate</button>
          <button className="btn btn-warning mx-2 my-2" onClick={handleOnGraClick}>Correct Grammer</button>

          <button className="btn btn-secondary dropdown-toggle mx-2 my-2" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            Change CASE
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            <li><button className="btn btn-secondary mx-1 my-2" onClick={handleOnUpClick}>Convert to UPPERCASE</button></li>
            <li><button className="btn btn-secondary mx-1 my-2" onClick={handleOnLoClick}>Convert to lowercase</button></li>
          </ul>
        </div>
        <button className="clr-btn" onClick={handleOnClearScreen} >clear screen</button>


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

import React, { useState, useEffect} from 'react';
import './App.css'
import Manager from './components/Manager.jsx';
import Button from './components/Button.jsx'
import Origin from './origin.png'

function App() {

  //samples stores the randomized text
  const [sample, setSample] = useState('')
  //typed matches what the user input so far
  const [typed, setTyped] = useState('')
  //display Timer is what number the timer shows
  const [displayTimer, setDisplayTimer] = useState(-500)
  //timer is the actually interval that's set up, it's cleared when the text matches
  const [timer, setTimer] = useState(null)
  //start starts the timer (makes a new one) if true
  const [start, setStart] = useState(false)
  // this is the data sent to the API that contains the time between each keystroke
  const [data, setData] = useState()
  // this randomizes the text if it's true
  const [randomize, setRandomize] = useState(true)
  // this stores the base64 string of the image displayed
  const [source, setSource] = useState(false)
  // 
  const [sourceData, setSourceData] = useState(null)

  

  useEffect(()=>{
    if(randomize===true){
    fetch('/API/sample').then(res=>res.json()).then(data=>
      setSample(data['sample']))
    setRandomize(false)
    }
  },[randomize])

  useEffect(()=>{ 
    if (start === true){
    const timer = window.setInterval(()=>{setDisplayTimer((prev)=> prev+1)},10)
    setTimer(timer)
    setData({})
    return (()=>clearInterval(timer))
    }}
      ,[start])

  useEffect(()=>
  {
    if (source===false)
      {
        setSourceData(Origin)
        setSource(true)
      }
    if (typed===sample && start===true){
    clearInterval(timer)
    fetch('/API', {method: 'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify(data)}).then(res=>res.json()).then(data=>{
    console.log(data)})
    fetch('/API', {method: 'GET'}).then(data=>{
      data.text().then(data=>setSourceData(data))
    })
    setStart(false)
  }},[typed])

  useEffect(
    ()=>{setData({...data, [displayTimer/100]:typed.substring(typed.length-2,typed.length)})}
  ,[typed])


  return (
    <div className="App">
      <div style={{'display':'flex', 'position':'relative'}}>
        <h3 className='timer'>Timer: {displayTimer/100}</h3>
        <h3 className='timer WPM'>WPM: {displayTimer>0?(typed.length*6000/(displayTimer*5)).toFixed(0):0}</h3>
      </div>
      <div className='mid'>
        <div className='mid1'>
          <div className='promptbox'>
            <p className = 'prompt' style={{marginLeft:'20px', marginRight: '24px'}}>{sample}</p>
          </div>
          <br></br>
          <br></br>
          {displayTimer<0?<Manager value =" "></Manager>:<Manager value ={null} typed={typed} setTyped={arg=>setTyped(arg)} sample={sample}></Manager>}
          <br></br>
        </div>
        <div className='mid2'>
          <div>{sourceData === Origin? <img src={sourceData}></img>:<img src={"data:image/png;base64, "+sourceData}></img>}</div>
          <div><p className='graphText'>This graph displays your time average taken for each character. Higher bars for a character could indicate that you are weak at typing that certain character, and should consider extra practice with the words containing said character.</p></div>
        </div>
      </div>
      <div id='buttoncontainer'>
        <Button type='START' setStart={arg=>setStart(arg)}></Button>
        <Button type='RESET' setRandomize={arg=>setRandomize(arg)} setTyped={arg=>setTyped(arg)}
        setDisplayTimer={arg=>setDisplayTimer(arg)} setStart={arg=>setStart(arg)} setSource={arg=>setSource(arg)}
        setData={arg=>setData(arg)}></Button>
      </div>
    </div>
  )
}


export default App;

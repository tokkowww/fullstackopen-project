import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}> 
  {props.text} 
  </button>
)


const StatisticsLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  
  }
  const handleBadClick = () => {
    setBad(bad + 1)
   
  }
  
  const total = good + neutral + bad

  const avg = total === 0 ? 0 : (good * 1 + bad * -1) / total

  const pos = total === 0 ? 0 : good / total


  return (
<div>
      <p>give feedback</p>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      
      {total === 0 ? (
        <div>No feedback given</div>
      ) : (
          
            <table>
              <tbody>
                <StatisticsLine label="Good" value={good} />
                <StatisticsLine label="Neutral" value={neutral} />
                <StatisticsLine label="Bad" value={bad} />
                <StatisticsLine label="Average" value={avg} />
                <StatisticsLine label="Positive" value={`${pos * 100}%`} />
              </tbody>
            </table>
          )}
    </div>
  )
    
}

export default App
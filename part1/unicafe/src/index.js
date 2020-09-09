import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// render button
const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

// render single statistic
const Statistic = ({text, value}) => {
  return (
      <tr>
        <td>{text} {value}</td>
      </tr>
  )
}

// render all statistics
const Statistics = ({clicks, stats}) => {
  if(clicks.total > 0) return (
    <div>
      <h1>Statistics</h1>
          <table>
            <tbody>
              <Statistic text="Good" value={clicks.good}/>
              <Statistic text="Neutral" value={clicks.neutral}/>
              <Statistic text="Bad" value={clicks.bad}/>
              <Statistic text="All" value={clicks.total}/>
              <Statistic text="Average" value={stats.average}/>
              <Statistic text="Positive" value={stats.positive}/>
            </tbody>
          </table>
    </div>
    ) 
    return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </div>    
    )
}

const App = () => {
  // save clicks of each button to single object
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, total: 0, cumulative: 0
  })

  // save average to own state
  const [stats, setStats] = useState({
    average: 0, positive: 0
  })

  // handle good clicks
  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1, 
      total: clicks.total + 1,
      cumulative: clicks.cumulative + 1
    }
    const newStats = {
      ...stats,
      average: newClicks.cumulative / newClicks.total,
      positive: (newClicks.good / newClicks.total) * 100 + '%'
    }
    setClicks(newClicks)
    setStats(newStats)
  }
  
  // handle neutral clicks
  const handleNeutralClick = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1, 
      total: clicks.total + 1
    }
    const newStats = {
      ...stats,
      positive: (newClicks.good / newClicks.total) * 100 + '%'
    }
    setClicks(newClicks)
    setStats(newStats)
  }

  // handle bad clicks
  const handleBadClick = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1, 
      total: clicks.total + 1,
      cumulative: clicks.cumulative - 1,
    }
    const newStats = {
      ...stats,
      average: newClicks.cumulative / newClicks.total,
      positive: (newClicks.good / newClicks.total) * 100 + '%'
    }
    setClicks(newClicks)
    setStats(newStats)
  }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text="Good"/>
      <Button onClick={handleNeutralClick} text="Neutral"/>
      <Button onClick={handleBadClick} text="Bad"/>        
      <Statistics clicks={clicks} stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

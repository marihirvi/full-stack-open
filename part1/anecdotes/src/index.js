import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// render button
const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({text, votes}) => {
  return(
    <div>
      <p><i>{text}</i></p>
      <p>Votes for this anecdote: {votes}</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  const [leader, setLeader] = useState(0)

  const updateAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(newAnecdote)
  }

  const updatePoints = () => {
    const newPoints = [...points]
    // add point to selected anecdote
    newPoints[selected] += 1
    setPoints(newPoints)
    // compare points to leading anecdote
    if (newPoints[selected] > newPoints[leader]){
      setLeader(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={points[selected]}/>
      <Button onClick={updateAnecdote} text='Next anecdote'/>
      <Button onClick={updatePoints} text='Vote for this anecdote'/>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[leader]} votes={points[leader]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
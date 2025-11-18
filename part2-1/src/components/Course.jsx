import React from 'react'

const Course = ({ course }) => {
  return (
   <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (<li key={part.id}>{part.name} {part.exercises}</li>))}
      </ul>
      <strong>
        total of {course.parts.reduce((acc, part) => acc + part.exercises , 0)}
      </strong>
    </div>
  )
}

export default Course
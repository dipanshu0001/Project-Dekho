import React from 'react'
import ProjectCard from '../Pages/ProjectCard/ProjectCard'

const Cards = () => {
  return (
    <div className='flex gap-[3rem] p-4 flex-wrap'>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
    </div>
  )
}

export default Cards
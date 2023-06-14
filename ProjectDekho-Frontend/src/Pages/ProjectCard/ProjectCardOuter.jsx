import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { Set_Projects } from '../../Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFunction } from '../../Common_function_context/ContextProvide'
import { Button as TailwindButton } from "@material-tailwind/react";
import styled from 'styled-components'

function ProjectCardOuter() {
    const [counter, setcounter] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Projectcounter } = useFunction()
    const projects = useSelector(state => state.ProjectReducers.payload)
    // console.log(projects)
    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const result = await axios.get("http://localhost:4000/Api/Projects/allProjects/6");
                // console.log(result.data)
                dispatch(Set_Projects({ projects: result.data }));
                // console.log(projects)
            } catch (e) {
                console.log(e.message)
            }
        }
        getAllProjects();
    }, [Projectcounter])
    return (
        <Cards>
            <div className="project-outer-main text-center">
                <h3 className='line-title'>Recommended For You</h3>

                <div className='w-[90vw] rounded-[1rem] p-4' >
                    <div className='w-4/5 m-auto grid grid-cols-2 text-left p-0 gap-4'>

                        {   
                            projects && projects.map((data, index) =>
                                <ProjectCard {...data} setcounter={setcounter} key={index} />
                            )

                        }
                    </div>
                </div>
                {/* <button class="discover-loadbtn" onClick={() => navigate('/ViewAll')}>SHOW MORE</button> */}
                {/* <TailwindButton className='w-1/5 mx-1' onClick={() => navigate('/ViewAll')}>Show More..</TailwindButton> */}
            </div>
        </Cards>
    )
}


const Cards = styled.div`

.project-outer-main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    margin: 2rem;
}

.line-title {
    position: relative;
    width: 50vw;
    // height: 3rem;
    margin: 2rem;
    font-family: Poppins;
    font-style: normal;
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 40px;
    line-height: 72px;
}

.line-title::before {
    width: 100%;
    background: #f2f2f2;
}
.line-title::before, .line-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    border-radius: 2px;
}

.line-title::after {

    width: 86%;
    position: absolute;
    left: 7%;
    background: #e73700;
}


`;

export default ProjectCardOuter
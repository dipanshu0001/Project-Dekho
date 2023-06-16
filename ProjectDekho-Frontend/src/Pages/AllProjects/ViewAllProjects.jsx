import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import { useFunction } from '../../Common_function_context/ContextProvide'
import ProjectCard from '../ProjectCard/ProjectCard'
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button as TailwindButton } from "@material-tailwind/react";
import { CiLight } from 'react-icons/ci'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ViewAllProjectSkeleton from './ViewAllProjectSkeleton'



function ViewAllProjects() {
  const { setProjectcounter } = useFunction()
  const navigate = useNavigate();
  const [allproject, setproject] = useState([])
  const [isloading, setloading] = useState(false);
  const [isarrayloading, setarrayloading] = useState(true);
  const [Industry, setIndustry] = useState([]);
  const [filters, setfilters] = useState({
    Industry: [],
    Monetized: "",
    Maxprice: "",
    Minprice: "",
    sort: "high to low"
  })
  useEffect(() => {
    const get_distinct_Industry = async () => {
      try {
        setloading(true)
        const result = await axios.get("http://localhost:4000/Api/Projects/DistinctIndustry");
        setIndustry(result.data);
        setloading(false);
      } catch (err) {
        console.log(err.message, "Industry ka error")
      }
    }
    const get_all_project = async () => {
      try {
        // setloading(true)
        setarrayloading(true);
        const result = await axios.post("http://localhost:4000/Api/Projects/FilteredData",
          {
            params: {
              ...filters,
              // Industries: filters.Industry.join(',')
            }
          })
        // console.log(result.data)
        setproject(result.data.result);
        setarrayloading(false)

      } catch (err) {
        console.log(err.message)
      }
    }

    get_distinct_Industry();
    get_all_project();
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target)
    setfilters(prev => ({ ...prev, [name]: value }));
  }
  function valuetext(value) {
    return `${value}`;
  }
  const handlearraychange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setfilters(prev => ({ ...prev, Industry: [...prev.Industry, value] }))
    }
    else {
      setfilters(prev => ({ ...prev, Industry: prev.Industry.filter(val => val !== value) }))

    }
  }
  const handleSubmit = async () => {
    try {
      // console.log(filters)
      setarrayloading(true)
      const result = await axios.post("http://localhost:4000/Api/Projects/FilteredData",
        {
          params: {
            ...filters,
            // Industries: filters.Industry.join(',')
          }
        })
      setproject(result.data.result);
      setarrayloading(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleClear = async () => {
    try {
      setarrayloading(true)

      setfilters({
        Industry: [],
        Monetized: "",
        Maxprice: "",
        Minprice: "",
        sort: "high to low"
      })
      const result = await axios.post("http://localhost:4000/Api/Projects/FilteredData",
        {
          params: {
            Industry: [],
            Monetized: "",
            Maxprice: "",
            Minprice: "",
            sort: "high to low"
          }
        })
      setproject(result.data.result);
      setarrayloading(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleMinChange=(e)=>{
    const{value,name}=e.target;
    if(value<=filters.Maxprice){
      setfilters(prev => ({ ...prev, [name]: value }));
    }
  }
  const handleMaxChange=(e)=>{
    const{value,name}=e.target;
    if(value>=filters.Minprice){
      setfilters(prev => ({ ...prev, [name]: value }));
    }
  }
  // console.log(allproject)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <>
      {
        !isloading ? (
          <div style={{ width: "100%", backgroundImage: "linear-gradient(to right bottom, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))", color: "white" }}>
            <div className="view-outer">
              <div className="view-main">
                <div className="filter-main">
                  <div className="filter-div-section">
                    <h4>Filters</h4>
                    <div className="filter-div">
                      <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: filters.Industry.length > 0 ? 'green' : 'inherit' }}>Industry</FormLabel>
                      <ul>
                        {
                          Industry.map((ele, index) => (
                            <li key={index}>
                              {/* <input type="checkbox" /> */}
                              <Checkbox
                                color="success"
                                onChange={handlearraychange}
                                value={ele}
                              />

                              <label>{ele}</label>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div className="filter-div">
                      <FormControl >
                        <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: filters.Monetized ? 'green' : 'inherit' }}>Monetized</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="Monetized"
                          value={filters.Monetized}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="false" control={<Radio color="success" />} label="No" style={{ color: filters.Monetized === false ? "green" : "inherit" }} />
                          <FormControlLabel value="true" control={<Radio color="success" />} label="Yes" style={{ color: filters.Monetized === true ? "green" : "inherit" }} />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="filter-div">
                      <Box sx={{ width: 300 }}>
                        <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: filters.Minprice !== "" ? 'green' : 'inherit' }}>Minimum Price</FormLabel>
                        <Slider
                          aria-label="Small steps"
                          defaultValue={0}
                          getAriaValueText={valuetext}
                          name="Minprice"
                          onChange={handleMinChange}
                          step={500}
                          marks
                          min={0}
                          max={3500}
                          color={filters.Minprice !== "" ? 'success' : 'info'}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    </div>
                    <div className="filter-div">
                      <Box sx={{ width: 300 }}>
                        <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: filters.Minprice !== "" ? 'green' : 'inherit' }}>Maximum Price</FormLabel>
                        <Slider
                          aria-label="Small steps"
                          defaultValue={3500}
                          name="Maxprice"
                          getAriaValueText={valuetext}
                          onChange={handleMaxChange}
                          step={500}
                          marks
                          min={0}
                          max={3500}
                          color={filters.Maxprice !== "" ? 'success' : 'info'}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    </div>
                    <div className="filter-div">
                      <FormControl >
                        <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: filters.Monetized ? 'green' : 'inherit' }}>Sort By</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="sort"
                          // defaultValue={"low to high"}
                          value={filters.sort}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="Viewcount low to high" control={<Radio color="success" />} label="Viewscount low to high" style={{ color: filters.sort === "Viewcount" ? "green" : "inherit" }} />
                          <FormControlLabel value="Viewcount high to low" control={<Radio color="success" />} label="Viewscount high to low" style={{ color: filters.sort === "Followercount" ? "green" : "inherit" }} />
                          <FormControlLabel value="low to high" control={<Radio color="success" />} label="Price Low to High" style={{ color: filters.sort === "low to high" ? "green" : "inherit" }} />
                          <FormControlLabel value="high to low" control={<Radio color="success" />} label="Price High to Low" style={{ color: filters.sort === "high to low" ? "green" : "inherit" }} />

                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="flex justify-between">

                      <TailwindButton onClick={handleSubmit} >Apply</TailwindButton>
                      <TailwindButton onClick={handleClear} >Clear Filter</TailwindButton>
                    </div>
                  </div>
                </div>
                <div className="project-display-main">
                  <center>
                    <h2> All Projects</h2>
                  </center>
                  <div className="project-div">
                    {
                      !isarrayloading ? (allproject.map((ele, index) => {
                        {/* console.log(ele.originalFields) */ }
                        return <ProjectCard {...ele.originalFields} key={index} />
                      })) : (
                        <ViewAllProjectSkeleton/>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (<Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isloading}>
                        <CircularProgress color="inherit" />
                      </Backdrop>)
      }
    </>
  )
}
// :(<img src={require('../../image/no-product.png')}/>)

export default ViewAllProjects
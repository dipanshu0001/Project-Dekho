import { useState,useEffect } from "react";
import UserDetails from "./UserDetails";
import AllProjects from "./AllProjects"
import './UserDashboard.css'
import { useSelector } from "react-redux";
import UserChat from "../../components/UserChat";
import SavedProjects from "./SavedProjects";
const UserDashboard = () => {
  
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };
  const state = useSelector(state => state.UserReducer)
  let menuItems = [
    {
      name: `Hi ${state && state.Username}`,
      iconName: "menu",
    },
    {
      name: "Home",
      iconName: "home",
      type: "solid",
    },
    {
      name: "Explore",
      iconName: "compass",
      type: "solid",
    },
    {
      name: "Messages",
      iconName: "envelope",
      type: "solid",
    },
,
    {
      name: "Starred",
      iconName: "star",
      type: "solid",
    },
    {
      name: "Settings",
      iconName: "cog",
      type: "solid",
    },
    {
      name: "Log Out",
      iconName: "log-out",
      color: "red",
      rotate: "180",
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const changeSmall = useMediaQuery("(max-height: 550px)");
  let delay = 1;
  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);

  return (
    <>
    <div style={{display:'flex' , maxHeight:'100vh'}}>
    <div  className={`sidebar ${expanded && "expanded"}`} >
      {menuItems.map((item, index) => {
        let middle = false;
        if (!(index === 0 || index === menuItems.length - 1)) {
          middle = true;
        }
        return (
          <div 
         
            className={`boxicon-container ${
              expanded && "expanded-boxicon-container"
            }`}
            onMouseEnter={() => {
              if (middle) {
                setHovered(index);
              }
            }}
            onMouseLeave={() => {
              if (middle) {
                setHovered(null);
              }
            }}
            onClick={() => {
              if (middle) {
                setActive(index);
              }
              if (index === 0) {
                setExpanded(!expanded);
              }
            }}
            key={index}
          >

            <box-icon
              class={`${middle && "boxicon"} 
                      ${!middle && "first-and-last-trash-fix"}
                      ${active === index && "active"}
                      `}
              size={changeSmall ? "sm" : "md"}
              name={item.iconName}
              type={item.type}
              color={
                hovered === index || active === index ? "white" : item.color
              }
              animation={active === index && animate ? "tada" : ""}
              rotate={item.rotate}
            ></box-icon>
            <p
              className={`description 
            ${expanded && "show-description"}
            ${active === index && "active-description"}`}
            >
              {item.name}
            </p>
          </div>
        );
      })}
      
    </div>
    <div className="content">
    {active===1 && <UserDetails/>}
    {active===2 && <AllProjects state={state}/>}
    {active===3 &&  <UserChat />}
    {active===4 && "All projects sold by you"}
    {active===5 && <SavedProjects state={state && state.SavedProjects}/>}
    {active===6 && "Settings"}
      
    </div>
    </div>
    </>
    
  );
};

export default UserDashboard;

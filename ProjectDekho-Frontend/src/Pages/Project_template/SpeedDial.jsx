
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { AiOutlineDislike, AiFillDislike, AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";

import Modal_form from '../Modal-form/Modal_form';

function SpeedDials() {
    const [direction, setDirection] = React.useState("Right");
    const [hidden, setHidden] = React.useState(false);


    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };
    const handleLike=()=>{
        console.log("hello ");  
    }
    const actions = [
        { icon: 
        <button onClick={handleLike}>
            <AiOutlineDislike />
        </button>, name: 'Like', function:handleLike},
        { icon: <AiFillDislike />, name: 'Save',function:handleLike },
        { icon: <AiFillLike/>, name: 'Print' ,function:handleLike},
        { icon: <AiOutlineLike/>, name: 'Share' ,function:handleLike},
    ];
    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'absolute',
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(-10),

        },
    }));
    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <Box sx={{ position: 'relative', mt: 5,backgroundColor:'limeGreen' }}>
                <StyledSpeedDial
                    //  sx={{backgroundColor:'limeGreen'}}
                    ariaLabel="SpeedDial playground example"
                    // hidden={hidden}s
                    icon={<SpeedDialIcon/>}
                    direction="Right"
                    style={{width:"fit-content",borderRadius: "100px"}}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.function}
                            style={{backgroundColor: "white"}}
                        />
                    ))}
                </StyledSpeedDial>
            </Box>
        </Box>
    );

}

export default SpeedDials
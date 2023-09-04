import React, { useContext, useEffect, useState } from 'react'
import calenderLogo from "../../assets/icons/calendar-line.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Navigation.scss"
import axios from 'axios';
import { MapContext } from '../../Context';


const Navigation = ({ props1, openCalender }) => {
    const [showCalender, setShowCalender] = useState(false)
    const [cal, setCal] = useState(new Date());
    const {updateResponseData} =useContext(MapContext)
    const [uiDate,setUIDate]= useState("Select Date:")

    useEffect(() => {
        showCalendersHandler()
        handleDateformat(cal);
        fetchAxiosdata();
    }, [openCalender]);


    let dateFormat;

    function handleDateformat(event) {
        const year = event.getFullYear();
        const month = String(event.getMonth() + 1).padStart(2, 0);
        const date = String(event.getDate()).padStart(2, 0);
        dateFormat = `${year}-${month}-${date}`;
        setUIDate(dateFormat)

    };


    const fetchAxiosdata = async () => {
        if (props1 === '') {
            console.log("no selected id");
        }
        else {
            await axios
                .post("https://crm.star-ind.com/index.php?entryPoint=dtTimeline", {
                    props1,
                    dateFormat
                })
                .then((res) => {
                    updateResponseData(res.data)
                    
                    // console.log("USERDATA after post", res.data);

                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }

    }


    const showCalendersHandler =  () => {

        setShowCalender((prevState) => {
            return !prevState
        });
    }
    const handleCalendar =  (event) => {
       
        setCal(event);
        handleDateformat(event);
        fetchAxiosdata();
        showCalendersHandler()
    };






    return (
        <div className='navigation'>


            <button className='navigation-button' onClick={showCalendersHandler}>{uiDate}  <img src={calenderLogo} alt="" /> </button>
            <Calendar className={showCalender ? "navigation-calender active" : "navigation-calender"} onChange={handleCalendar} value={cal} maxDate={new Date()}/>

        </div>

    )
}

export default Navigation
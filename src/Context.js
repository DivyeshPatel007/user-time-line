import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [addressdata, setAddressdata] = useState(null);
    const [totalSum, setTotalSum] = useState({})
    const [responseData, setResponseData] = useState(['']);
    const [timelineData, setTimelineData] = useState([''])

    useEffect(() => {
        setTimelineData(responseData)
    }, [responseData])


    useEffect(()=>{
       async function postDistance()  {
          
                await axios
                    .post("https://crm.star-ind.com/index.php?entryPoint=dtTimelineTotalKm&eventType=totalKm", {
                       totalSum
                    })
                    .then((res) => {
                        // console.log(res);
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            
    
        }
        postDistance()
    
    },[totalSum]);

    const updateResponseData = (data) => {
        setResponseData(data)
    };



    const totals = (data) => {
        setTotalSum(data)
    }
    const SendAddress = (data) => {
        setAddressdata(data);

    };
  

    return (
        <MapContext.Provider value={{ updateResponseData, timelineData, SendAddress, addressdata, totals, totalSum }}>
            {children}
        </MapContext.Provider>
    );
};
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {
    const [data , setData] = useState();

    const fetchData = async () =>{
   
        try{

            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setData(res.data);
            // console.log(res);
        }
        catch(e){

            console.log(e);
        }   

    }

    useEffect(()=>{
        console.log("usCallback");
        fetchData();
    },[]);

  return (
 
    <div>
        {/* <ul> */}
      {
        // console.log(data)

        data.map((obj , index)=>{
            return <div key={index}>
                <h2>{obj.id}</h2>
                <h4>{obj.name}</h4>
                <h4>{obj.address.city}</h4>
            </div>   
        })
      }
        {/* </ul> */}
    </div>
  )
}

export default App

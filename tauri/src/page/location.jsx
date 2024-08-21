import React from 'react'
import { API } from '../utility/api';

const Location = () => {


    const fetchData = async () => {
        try {
            const res = await fetch(`${API}/getlocation/${490020}`);

            const resData = await res.json();
            console.log(resData)
        } catch (error) {
            console.error('Signin error:', error);
        }
    }


   
  return (
    <div>
      Location

      <button onClick={fetchData}>Fetch</button>
    </div>
  )
}

export default Location

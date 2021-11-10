import React, { useEffect, useState } from "react";
import { Drawer,JoinedClasses } from "..";
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        //'https://midtermclassapi.herokuapp.com/user',
        'https://api-new-demo.herokuapp.com/api/classroom/'
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  
  return (
    <div>
        <Drawer />
            <ol className="joined">
            {data.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>
    </div>
  );
}

export default Home;

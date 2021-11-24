import React, { useEffect, useState } from "react";
import { JoinedClasses } from "..";
import { useLocalContext } from "../../context/context";
import classApi from '../../apis/class.api';

const Home = () => {
  const { dataClassJoined, setDataClassJoined } = useLocalContext();
  const { dataClassCreate, setDataClassCreate } = useLocalContext();
  const [reloadClass, setReloadClass] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setReloadClass(false);
    }, 5000);
  }, [])

  useEffect(() => { 
    const fetchData = async () => {
      try {
        let response = await classApi.getClasses()
  
        // set response.data to global state user
        setDataClassCreate(response.data.classOwner)
        setDataClassJoined(response.data.classMember)
      }
      catch (err) {
        console.log("ERROR login, err: ", err)
      }
    };
    fetchData();
    setReloadClass(true);
  }, [reloadClass]);

  return (
    <div>
      {/* <Drawer /> */}
      <ol className="joined">
        {[...dataClassCreate, ...dataClassJoined].map((item, index) => (
          <JoinedClasses key={index} classData={item} />
        ))}

      </ol>
    </div>
  );
}

export default Home;

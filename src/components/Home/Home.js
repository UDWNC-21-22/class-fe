import React, { useEffect, useState } from "react";
import JoinedClasses from "../JoinedClasses/JoinedClasses";
import { useLocalContext } from "../../context/context";
import classApi from "../../apis/class.api";

const Home = () => {
  const [dataClassJoined, setDataClassJoined] = useState([]);
  const [dataClassCreate, setDataClassCreate] = useState([]);
  const { setClassId } = useLocalContext();
  const [isEmpty,setIsEmpty]=useState(false)

  setClassId("");

  useEffect(()=>{
    const fetchData =async () => {
      try {
        let response = await classApi.getClasses();
  
        // set response.data to global state user
        setDataClassCreate(response.data.classOwner);
        setDataClassJoined(response.data.classMember);

        if (response.data.classOwner.length===0 && response.data.classMember.length===0){
          setIsEmpty(true)
        }
        console.log(isEmpty)
      } catch (err) {
        console.log("ERROR login, err: ", err);
      }
  }
  fetchData()
  }, []);

  return (
    <>
      {isEmpty ? (
        <div style={{margin:'2rem'}}>
          <h1>You have not in any class</h1>
          <h2>Please join or create new class</h2>
        </div>
      ) : (
        <div style={{margin:'2rem'}}>
          <h1>List of classes created</h1>
          <ol className="joined">
            {[...dataClassCreate].map((item, index) => (
              <div key={index}>
                <JoinedClasses classData={item} />
              </div>
            ))}
          </ol>
          <h1>List of classes attended</h1>
          <ol className="joined">
            {[...dataClassJoined].map((item, index) => (
              <div key={index}>
                <JoinedClasses classData={item} />
              </div>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default Home;

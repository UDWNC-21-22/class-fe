import React, { useEffect, useState } from "react";
import JoinedClasses from "../JoinedClasses/JoinedClasses";
import { useLocalContext } from "../../context/context";
import classApi from "../../apis/class.api";

const Home = () => {
  const {
    setClassId,
    dataClassJoined,
    setDataClassJoined,
    dataClassCreate,
    setDataClassCreate,
  } = useLocalContext();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptyCreate, setIsEmptyCreate] = useState(false);
  const [isEmptyJoin, setIsEmptyJoin] = useState(false);

  setClassId("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await classApi.getClasses();

        // set response.data to global state user
        setDataClassCreate(response.data.classOwner);
        setDataClassJoined(response.data.classMember);

        if (
          response.data.classOwner.length === 0 &&
          response.data.classMember.length === 0
        ) {
          setIsEmpty(true);
        }

        if (response.data.classOwner.length === 0) {
          setIsEmptyCreate(true);
        }

        if (response.data.classMember.length === 0) {
          setIsEmptyJoin(true);
        }
      } catch (err) {
        console.log("ERROR login, err: ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isEmpty ? (
        <div style={{ margin: "2rem" }}>
          <h1>You have not in any class</h1>
          <h2>Please join or create new class</h2>
        </div>
      ) : (
        <div style={{ margin: "2rem" }}>
          {!isEmptyCreate ? (
            <div>
              <h1>List of classes created</h1>
              <ol className="joined">
                {[...dataClassCreate].map((item) => (
                  <div key={item?.id.toString()}>
                    <JoinedClasses classData={item} key={item?.id.toString()}/>
                  </div>
                ))}
              </ol>
            </div>
          ) : (
            <></>
          )}

          {!isEmptyJoin ? (
            <div>
              <h1 style={{ margin: "2rem 0 0 0" }}>List of classes attended</h1>
              <ol className="joined">
                {[...dataClassJoined].map((item) => (
                  <div key={item?.id.toString()}>
                    <JoinedClasses classData={item} key={item?.id.toString()} />
                  </div>
                ))}
              </ol>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Home;

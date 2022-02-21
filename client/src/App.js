import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Table from "./Table";

const App = () => {
        const [data, setData] = useState([]);

        // helper function for fetching users using axios
        const fetchData = async (query) => {
              const res = await axios.get(`http://localhost:5500?q=${query}`);
              setData(res.data);
              console.log(query);
        };
        // the first fetch
          useEffect(()=>{
              fetchData("");
              console.log('first fetch !');
          },[]);
        // the deboucne function 
        const debounce = (ourFunc) => {
              let timer;
              return (...args) => {
                const context = this;
                timer && clearTimeout(timer);
                timer = setTimeout(() =>{
                      timer=null;
                      ourFunc.apply(context, args);
                }, 1000);
              };
        };
        const updateQuery = useCallback(debounce(fetchData),[]);
       
  return (
        <div className="app">
            <input className="search" placeholder="Search..." onChange={e=>updateQuery(e.target.value.toLowerCase())}/>
              {<Table data={data} />}
        </div>
  );
}
export default App;

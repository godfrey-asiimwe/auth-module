import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa';
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri';
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';
import API from "../API"
import auth from "../auth"
import '../App.css'
import '../coupon.css'
import Rprojects from './Rprojects'
import Apiprojects from '../Apiprojects'
import Datatable from "../components/RprojectsTable";
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["name","type"]);

  useEffect(()=>{
    fetch("https://mocki.io/v1/a4a7c946-72cc-4f71-8861-2137393351fa")
    .then((response) => response.json())
    .then((json) => setData(json));
  },[]);

  function search(rows){
    return rows.filter(
    (row)=> 
    searchColumns.some((column)=>row[column].toString().toLowerCase().indexOf(q.toLocaleLowerCase()) > -1)

     );
  }

  const columns = data[0] && Object.keys(data[0]);

  return (
    <div>
      <div>
      <div>
      <h3>Projects Report</h3>
        </div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
        {columns && columns.map((column)=> <label style={{marginTop: 20, marginLeft:20}}>
          <input type="checkbox" placeholder="Search Report}" checked={searchColumns.includes(column)}
          onChange={(e)=>{
            const checked = searchColumns.includes(column)
            setSearchColumns(prev => checked
              ?prev.filter(sc =>  sc !== column)
              :[...prev, column])
          }}
          />
          {column}
        </label>)}
      </div>

      <div>
        <Datatable data={search(data)}/>
      </div>
  </div>
  );  
}

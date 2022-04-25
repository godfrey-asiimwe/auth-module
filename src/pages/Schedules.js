import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa';
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri';
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';
import sheduleAPI from "../sheduleAPI"
import '../App.css'
import '../coupon.css'


const AddSchedule = ({ onAdd }) => {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [projectId, setProjectId] = useState("");
  const [schedules, setSchedules] = useState([]);

  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  //fetching users from the system
  const fetchData = () => {
    sheduleAPI.get("/api/schedules")
      .then((res) => {
        setSchedules(res.data);
      })
      .catch(console.error);
  }

   //refreshing the schedule list
  const refreshSchedules = () => {
    sheduleAPI.get("/api/schedules")
      .then((res) => {
        setSchedules(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    refreshSchedules();
    fetchData();
  }, []);


  return (
     <>
        <div class="d-flex align-items-center mb-4">
            <h4 class="card-title">List of Schedules</h4>
            <div class="ml-auto">
                <div class="dropdown sub-dropdown">
                    <button class="btn btn-link text-muted dropdown-toggle" type="button"
                        id="dd1" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i data-feather="more-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd1">
                        <a class="dropdown-item" data-toggle="modal"
                            data-target="#login-modal">Create</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table no-wrap v-middle mb-0">
                <thead>
                    <tr class="border-0">
                        <th class="border-0 font-14 font-weight-medium text-muted px-2">
                        Name
                        </th>
                        <th class="border-0 font-14 font-weight-medium text-muted">Description</th>
                        <th class="border-0 font-14 font-weight-medium text-muted text-left">
                        Start Date
                        </th>
                        <th class="border-0 font-14 font-weight-medium text-muted text-left">
                         End Date
                        </th>
                        <th class="border-0 font-14 font-weight-medium text-muted">Project Id</th>
                        <th class="border-0 font-14 font-weight-medium text-muted">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule, index) => {
                        return (
                          <tr key="">
                            <th hidden="true" scope="row">{schedule.id}</th>
                            <td>
                            <ContextMenuTrigger id="contextmenu">
                            {schedule.schedule_name}
                            </ContextMenuTrigger>
                            </td>
                            <td>
                            <ContextMenuTrigger id="contextmenu">
                            {schedule.description}
                            </ContextMenuTrigger>
                            </td>
                            <td>
                            <ContextMenuTrigger id="contextmenu">
                            {schedule.startDate}
                            </ContextMenuTrigger>
                            </td>
                            <td>
                            <ContextMenuTrigger id="contextmenu">
                            {schedule.endDate}
                            </ContextMenuTrigger>
                            </td>
                            <td>
                             <ContextMenuTrigger id="contextmenu">
                            {schedule.projectId}
                             </ContextMenuTrigger>
                            </td>
                            <td>
                            <ContextMenuTrigger id="contextmenu">
                            </ContextMenuTrigger>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
            </table>
        </div>
 </>
  );
};

export default AddSchedule;
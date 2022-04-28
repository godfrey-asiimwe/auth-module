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
import API from "../API"
import '../App.css'
import '../coupon.css'


const AddSchedule = ({ onAdd }) => {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  const [scheduleName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [projectId, setProjectId] = useState("");
  const [scheduleId, setScheduleId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectsbyId, setProjectById] = useState([]);

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

   //refreshing the project list
  const refreshProjects = () => {
    API.get("/all/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    refreshSchedules();
    refreshProjects();
    fetchData();
  }, []);


  //on saving the task
  const onSubmit = (event) => {
    event.preventDefault();
    let item = { scheduleName,description,startDate,endDate,projectId};
    sheduleAPI.post("/api/schedules/", item).then(() => refreshSchedules());

    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setProjectId("");

  };

  const onUpdate = (id) => {
    let item = {scheduleName,description,startDate,endDate,projectId};
    sheduleAPI.put('/api/schedules/'+id, item).then((res) => refreshSchedules());

    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setProjectId("");
  };

  const onDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this schedule?")) {
        sheduleAPI.delete('/api/schedules/'+id).then((res) => refreshSchedules())
        .then()
        .catch((err) => {
          console.log(err.response);
        });
      alert("Task with ID " + id + " was deleted successfully");
    }
  };


  function selectSchedule(id) {
    let item = schedules.filter((schedule) => schedule.id === id)[0];
    setName(item.scheduleName);
    setDescription(item.description);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setProjectId(item.projectId);
    setScheduleId(item.id);

  }

  function selectProject(id) {
    let item = projects.filter((project) => project.id === id)[0];
    setName(item.name);
  }


  return (
     <>
         <div class="card">
            <div class="card-body">
            <div id="login-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="text-center mt-2 mb-4">
                            <a href="index.html" class="text-success">
                                <span></span>
                            </a>
                        </div>

                       <Form onSubmit={onSubmit} className="mt-4">
                            <Form.Group className="mb-3" controlId="formBasicName">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={scheduleName}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </Form.Group>

                            <div class="form-group">
                                <textarea class="form-control" rows="3" placeholder="Text Here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicStarring">
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="Enter Start_date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicStarring">
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="Enter End Date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicName">
                              <Form.Label>Select Project</Form.Label>
                               <select class="form-control" id="exampleFormControlSelect1"  onChange={(e) => setProjectId(e.target.value)}
                                         >
                                {projects.map((project, index) => {
                                   return (
                                    <option value={project.id} >{project.name}
                                    </option>
                                   );
                                })}
                                </select>
                            </Form.Group>

                            <div className="float-right">
                              <Button
                                variant="primary"
                                type="submit"
                                onClick={onSubmit}
                                className="mx-2"
                              >
                                Save
                              </Button>
                              <Button
                                variant="primary"
                                type="button"
                                onClick={() => onUpdate(scheduleId)}
                                className="mx-2"
                              >
                                Update
                              </Button>
                            </div>
                       </Form>
                    </div>
                </div>
            </div>
        </div>



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
                            {schedule.scheduleName}
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
                                <a data-toggle="modal" data-target="#login-modal" onClick={() => selectSchedule(schedule.id)}>
                                <i class="icon-pencil mr-2 text-success" ></i></a>
                                <a data-toggle="modal" data-target="#adduser-modal" onClick={() => selectSchedule(schedule.id)}>
                                </a>
                                <a onClick={() => onDelete(schedule.id)}>
                                <i class="fa fa-times" ></i></a>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
            </table>
        </div>
     </div>
  </div>
 </>
  );
};

export default AddSchedule;
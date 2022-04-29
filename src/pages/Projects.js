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


const AddProject = ({ onAdd }) => {

  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [projects, setProjects] = useState([]);

  const [first_name, setFirstname]=useState("")
  const [last_name, setLastname]=useState("")
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [projectusers, setProjectUsers] = useState([]);
  const [userId, setUserId] = useState(null);
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
    auth.get("/users/")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    refreshProjects();
    fetchData();
  }, []);

  //select users per project
  const onViewUsers = (id) => {
    let item = {first_name,last_name,role};
    auth.get("/prousers/"+id)
      .then((res) => {
        setProjectUsers(res.data);
      })
      .catch(console.error);
  };

 //attach a user to a project
  const onUserSubmit = (projectId,userId,role) => {
    let item = {userId,projectId,role};
    if (window.confirm("Are you sure you want to add a user to this project?")) {
       auth.post("/create/", item).then((res) => fetchData())
        .then()
        .catch((err) => {
          alert("user already exits");
        });
    }
  };

  //refreshing the project list
  const refreshProjects = () => {
    API.get("/all/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch(console.error);
  };

  //on saving the project
  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, description, start_date,end_date,type };
    API.post("/create/", item).then(() => refreshProjects());

    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setType("");

  };

  //on editing the project
  const onUpdate = (id) => {
    let item = {name,description,start_date,end_date,type};
    API.post('/update/'+id, item).then((res) => refreshProjects());

    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setType("");
  };

  //deleting the project
  const onDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this project?")) {
       API.delete('/delete/'+id).then((res) => refreshProjects())
        .then()
        .catch((err) => {
          console.log(err.response);
        });

      alert("Project with ID " + id + " was deleted successfully");

    }
  };

  //on selecting the project
  function selectProject(id) {
    let item = projects.filter((project) => project.id === id)[0];
    setName(item.name);
    setDescription(item.description);
    setStartDate(item.start_date);
    setEndDate(item.end_date);
    setType(item.type);
    setProjectId(item.id);
  }

   const copyCoupon = (e, data) => {
    var coupon = data.copy
    navigator.clipboard.writeText(coupon)
    alert(`Coupon code ${coupon} copied to your clipboard`)
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
                                        value={name}
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
                                        value={start_date}
                                        onChange={(e) => setStartDate(e.target.value)}
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicStarring">
                                      <Form.Label>End Date</Form.Label>
                                      <Form.Control
                                        type="date"
                                        placeholder="Enter End Date"
                                        value={end_date}
                                        onChange={(e) => setEndDate(e.target.value)}
                                      />
                                    </Form.Group>

                                     <Form.Group className="mb-3" controlId="formBasicStarring">
                                      <Form.Label>Type</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                      />
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
                                        onClick={() => onUpdate(projectId)}
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

                 <div id="adduser-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="text-center mt-2 mb-4">
                                    <a href="" class="text-success">
                                        <span>Add User</span>
                                    </a>
                                </div>

                               <Form onSubmit={onUserSubmit} className="mt-4">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                     <div className="col-md-12">
                                        <div class="form-group mb-4">
                                            <label for="exampleFormControlSelect1">Select User</label>
                                            <select class="form-control" id="exampleFormControlSelect1"  onChange={(e) => setUserId(e.target.value)}>
                                                {users.map((user, index) => {
                                                   return (
                                                    <option value={user.id} >
                                                    {user.username}
                                                    </option>
                                                   );
                                                })}
                                            </select>
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="exampleFormControlSelect1">Select Role</label>
                                            <select class="form-control" id="exampleFormControlSelect1"  onChange={(e) => setUserId(e.target.value)}>
                                                <option value="admin" >Admin</option>
                                                <option value="user" >User</option>
                                                <option value="developer" >Developer</option>
                                            </select>
                                        </div>
                                     </div>
                                    </Form.Group>
                                    <div className="float-right">
                                      <Button
                                        variant="primary"
                                        type="button"
                                        onClick={() => onUserSubmit(projectId,userId,role)}
                                        className="mx-2"
                                        >
                                        Add
                                      </Button>
                                    </div>
                               </Form>
                            </div>
                        </div>
                    </div>
                </div>

                 <div id="viewUser-modal" class="modal fade viewUser-modal" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                 <div class="table-responsive">
                                    <table class="table no-wrap v-middle mb-0">
                                        <thead>
                                            <tr class="border-0">
                                                <th class="border-0 font-14 font-weight-medium text-muted">First name</th>
                                                <th class="border-0 font-14 font-weight-medium text-muted">Last Name</th>
                                                <th class="border-0 font-14 font-weight-medium text-muted">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projectusers.map((user, index) => {
                                                return (
                                                  <tr key="">
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.role}</td>
                                                  </tr>
                                                );
                                              })}
                                        </tbody>
                                    </table>
                                 </div>
                            </div>
                        </div>
                    </div>
                 </div>
            <div class="d-flex align-items-center mb-4">
                <h4 class="card-title" >List of Projects</h4>
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
                            <th class="border-0 font-14 font-weight-medium text-muted">Type</th>
                            <th class="border-0 font-14 font-weight-medium text-muted">Members</th>
                            <th class="border-0 font-14 font-weight-medium text-muted">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => {
                            return (
                              <tr key="" data-toggle="collapse" data-target={"#demo"} class="accordion-toggle">
                                <th hidden="true" scope="row">{project.id}</th>
                                <td>
                                <ContextMenuTrigger id="contextmenu">
                                {project.name}
                                </ContextMenuTrigger>
                                </td>
                                <td>
                                <ContextMenuTrigger id="contextmenu">
                                {project.description}
                                </ContextMenuTrigger>
                                </td>
                                <td>
                                <ContextMenuTrigger id="contextmenu">
                                {project.start_date}
                                </ContextMenuTrigger>
                                </td>
                                <td>
                                <ContextMenuTrigger id="contextmenu">
                                {project.end_date}
                                </ContextMenuTrigger>
                                </td>
                                <td>
                                 <ContextMenuTrigger id="contextmenu">
                                {project.type}
                                 </ContextMenuTrigger>
                                </td>
                                <td>
                                <ContextMenuTrigger id="contextmenu">
                                    <a data-toggle="modal" data-target="#viewUser-modal" onClick={() => onViewUsers(project.id)}>
                                        <i class="icon-user" ></i> View members
                                    </a>
                                    <a data-toggle="modal" data-target="#adduser-modal" onClick={() => selectProject(project.id)}>
                                    <i class="icon-plus mr-2 text-success" ></i> add members </a>
                                    <a data-toggle="modal" data-target="#adduser-modal" onClick={() => selectProject(project.id)}>
                                     View budget </a>
                                </ContextMenuTrigger>
                                </td>
                                <td>
                                 <ContextMenuTrigger id="contextmenu">
                                    <a data-toggle="modal" data-target="#login-modal" onClick={() => selectProject(project.id)}>
                                    <i class="icon-pencil mr-2 text-success" ></i></a>
                                    <a onClick={() => onDelete(project.id)}>
                                    <i class="fa fa-times" ></i></a>
                                 </ContextMenuTrigger>
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

export default AddProject;
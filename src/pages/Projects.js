import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';
import API from "../API"
import auth from "../auth"



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

  const [items, setItems] = useState([]);
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

  const fetchData = () => {
    return  auth.get('/users/').then(result => {
      const res =  result.data.data;
      return res;
    }).catch(console.error);
  }

  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = () => {
    API.get("/all/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch(console.error);
  };

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

  const onUpdate = (id) => {
    let item = {name,description,start_date,end_date,type};
    API.post('/update/'+id, item).then((res) => refreshProjects());

    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setType("");
  };

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

  function selectProject(id) {
    let item = projects.filter((project) => project.id === id)[0];
    setName(item.name);
    setDescription(item.description);
    setStartDate(item.start_date);
    setEndDate(item.end_date);
    setType(item.type);
    setProjectId(item.id);

  }

  return (
   <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
        <header class="topbar" data-navbarbg="skin6">
            <nav class="navbar top-navbar navbar-expand-md">
                <div class="navbar-header" data-logobg="skin6">
                    <a class="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)"><i
                            class="ti-menu ti-close"></i></a>

                    <div class="navbar-brand">

                        <a href="index.html">
                            <b class="logo-icon" >
                                <img src="../assets/images/logo.png" alt="homepage" class="dark-logo" />

                                <img src="../assets/images/logo.png" alt="homepage" class="light-logo" />
                            </b>
                            <span class="logo-text">
                            </span>
                        </a>
                    </div>
                    <a class="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)"
                        data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i
                            class="ti-more"></i></a>
                </div>
                <div class="navbar-collapse collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav float-left mr-auto ml-3 pl-1">


                    </ul>
                    <ul class="navbar-nav float-right">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span class="ml-2 d-none d-lg-inline-block"><span>Hello,</span> <span
                                        class="text-dark">{user.username}</span> <i data-feather="chevron-down"
                                        class="svg-icon"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                <a class="dropdown-item" href="javascript:void(0)"><i data-feather="user"
                                        class="svg-icon mr-2 ml-1"></i>
                                    My Profile</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" onClick={logout} ><i data-feather="power"
                                        class="svg-icon mr-2 ml-1"></i>
                                    Logout</a>
                                <div class="dropdown-divider"></div>
                                <div class="pl-4 p-3"><a href="javascript:void(0)" class="btn btn-sm btn-info">View
                                        Profile</a></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
         <aside class="left-sidebar" data-sidebarbg="skin6">
            <div class="scroll-sidebar" data-sidebarbg="skin6">
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="sidebar-item"> <a class="sidebar-link sidebar-link" href="/"
                                aria-expanded="false"><i data-feather="home" class="feather-icon"></i><span
                                    class="hide-menu">Dashboard</span></a></li>
                        <li class="list-divider"></li>
                        <li class="nav-small-cap"><span class="hide-menu">Project Plan</span></li>

                        <li class="sidebar-item">
                                <a class="sidebar-link" href="/projects"
                                aria-expanded="false">
                                    <i data-feather="tag" class="feather-icon"></i><span
                                        class="hide-menu">
                                        Projects
                                    </span>
                                </a>
                        </li>
                        <li class="sidebar-item">
                                <a class="sidebar-link sidebar-link" href="app-chat.html"
                                aria-expanded="false">
                                <i data-feather="message-square" class="feather-icon"></i>
                                <span class="hide-menu">Plan
                                </span></a></li>
                        <li class="sidebar-item">
                        <a class="sidebar-link sidebar-link" href="app-calendar.html"
                                aria-expanded="false">
                                <i data-feather="calendar" class="feather-icon"></i><span
                                    class="hide-menu">Schedule</span>
                                    </a></li>
                        <li class="list-divider"></li>
                    </ul>
                </nav>
            </div>
         </aside>
         <div class="page-wrapper">
            <div class="page-breadcrumb">
                <div class="row">
                    <div class="col-7 align-self-center">
                        <h3 class="page-title text-truncate text-dark font-weight-medium mb-1">Projects</h3>
                    </div>
                </div>
            </div>

             <div class="container-fluid">


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

                               <Form onSubmit={onSubmit} className="mt-4">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                       <div>
                                       Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}
                                       </div>
                                     <div className="col-md-12">
                                        <AsyncSelect
                                        cacheOptions
                                        defaultOptions
                                        value={selectedValue}
                                        getOptionLabel={value => value.first_name + ' ' + value.last_name}
                                        getOptionValue={value => value.id}
                                        loadOptions={fetchData}
                                        onInputChange={handleInputChange}
                                        onChange={handleChange}
                                      />
                                     </div>

                                    </Form.Group>
                                        <div className="float-right">
                                          <Button
                                            variant="primary"
                                            type="submit"
                                            onClick={onSubmit}
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


                 <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-4">
                                    <h4 class="card-title">List of Projects</h4>
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
                                                 <a class="dropdown-item" data-toggle="modal"
                                                    data-target="#adduser-modal">Add User</a>
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
                                                <th class="border-0 font-14 font-weight-medium text-muted">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projects.map((project, index) => {
                                                return (
                                                  <tr key="">
                                                    <th hidden="true" scope="row">{project.id}</th>
                                                    <td>{project.name}</td>
                                                    <td>{project.description}</td>
                                                    <td>{project.start_date}</td>
                                                    <td>{project.end_date}</td>
                                                    <td>
                                                    {project.type}
                                                    </td>
                                                    <td>
                                                        <a data-toggle="modal" data-target="#login-modal" onClick={() => selectProject(project.id)}>
                                                        <i class="icon-pencil mr-2 text-success" ></i></a>
                                                        <a data-toggle="modal" data-target="#adduser-modal" onClick={() => selectProject(project.id)}>
                                                        <i class="icon-plus mr-2 text-success" ></i></a>
                                                        <a onClick={() => onDelete(project.id)}>
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
                    </div>
                </div>
             </div>
         </div>
           <footer class="footer text-center text-muted">
                All Rights Reserved by Coseke. Designed and Developed by <a
                    href="">Coseke U LTD</a>.
            </footer>
      </div>

  );
};

export default AddProject;
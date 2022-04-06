import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';
import tasksapi from '../tasksapi';
import auth from "../auth"




const AddTask = ({ onAdd }) => {


  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [responsible_person, setResponsiblePerson] = useState("")
  const [start_date, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [created_by, setCreatedBy] = useState("");
  const [project_name, setProjectName] = useState("");
  const [taskId, setTaskId] = useState(null); 
  const [tasks, setTasks] = useState([]);

  const [first_name, setFirstname]=useState("")
  const [last_name, setLastname]=useState("")
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
    refreshTasks();
    fetchData();
  }, []);

    //select users per project
    const onViewUsers = (id) => {
      let item = {first_name,last_name};
      auth.get("/prousers/"+id)
        .then((res) => {
          setProjectUsers(res.data);
        })
        .catch(console.error);
    };

  const onUserSubmit = (taskId,userId) => {

    let item = {userId,taskId};

    if (window.confirm("Are you sure you want to add a user to this project?")) {
       auth.post("/create/", item).then((res) => fetchData())
        .then()
        .catch((err) => {
          alert("user already exits");
        });
    }

  };

  //refeshing the task list
  const refreshTasks = () => {
    tasksapi.get("")
      .then((res) => {
        setTasks(res.data);
      })
      .catch(console.error);
  };

  //on saving the task
  const onSubmit = (event) => {
    event.preventDefault();
    let item = { title, details, responsible_person, start_date,deadline, created_by, project_name};
    tasksapi.post("/post", item).then(() => refreshTasks());

    setTitle("");
    setDetails("");
    setResponsiblePerson("")
    setStartDate("");
    setDeadline("");
    setCreatedBy("");
    setProjectName("")
  };  

  const onUpdate = (id) => {
    let item = {title, details, responsible_person, start_date,deadline, created_by, project_name};
    tasksapi.post('/update/'+id+'/', item).then((res) => refreshTasks());

    setTitle("");
    setDetails("");
    setResponsiblePerson("")
    setStartDate("");
    setDeadline("");
    setCreatedBy("");
    setProjectName("")
  };

  const onDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this task?")) {
        tasksapi.delete('delete/'+id+'/').then((res) => refreshTasks())
        .then()
        .catch((err) => {
          console.log(err.response);
        });

      alert("Task with ID " + id + " was deleted successfully");

    }

  };

  function selectTask(id) {
    let item = tasks.filter((task) => task.id === id)[0];
    setTitle(item.title);
    setDetails(item.details);
    setResponsiblePerson(item.responsible_person);
    setStartDate(item.start_date);
    setDeadline(item.deadline)
    setCreatedBy(item.created_by);
    setProjectName(item.project_name)
    setTaskId(item.id);

  }


  return (

        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center mb-4">
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
                                          <Form.Label>Title</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Enter Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                          />
                                        </Form.Group>

                                        <div class="form-group">
                                            <textarea class="form-control" rows="3" placeholder="Text Here..."
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                          <Form.Label>Responsible Person</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Enter Title"
                                            value={responsible_person}
                                            onChange={(e) => setResponsiblePerson(e.target.value)}
                                          />
                                        </Form.Group>

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
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)}
                                          />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                          <Form.Label>Created By</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Enter Created By"
                                            value={created_by}
                                            onChange={(e) => setCreatedBy(e.target.value)}
                                          />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formBasicName">
                                          <Form.Label>Project Name</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Enter Project Name"
                                            value={project_name}
                                            onChange={(e) => setProjectName(e.target.value)}
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
                                            onClick={() => onUpdate(taskId)}
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
                                                <select class="form-control" id="exampleFormControlSelect1"  onChange={(e) => setUserId(e.target.value)}
                                                         >
                                                {users.map((user, index) => {
                                                   return (
                                                    <option value={user.id} >{user.username}
                                                    </option>
                                                   );
                                                })}
                                                </select>
                                            </div>
                                         </div>

                                        </Form.Group>
                                            <div className="float-right">
                                              <Button
                                                variant="primary"

                                               type="button"
                                                onClick={() => onUserSubmit(taskId,userId)}
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
                    <h4 class="card-title">List of Tasks</h4>
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
                                Title
                                </th>
                                <th class="border-0 font-14 font-weight-medium text-muted">Details</th>
                                <th class="border-0 font-14 font-weight-medium text-muted px-2">
                                Responsible Person
                                </th>
                                <th class="border-0 font-14 font-weight-medium text-muted text-left">
                                Start Date
                                </th>
                                <th class="border-0 font-14 font-weight-medium text-muted text-left">
                                 End Date
                                </th>
                                <th class="border-0 font-14 font-weight-medium text-muted px-2">
                                Created By
                                </th>
                                <th class="border-0 font-14 font-weight-medium text-muted px-2">
                                Project Name
                                </th>
                                <th class="border-0 font-14 font-weight-medium text-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => {
                                return (
                                  <tr key="">
                                    <th hidden="true" scope="row">{task.id}</th>
                                    <td>{task.title}</td>
                                    <td>{task.details}</td>
                                    <td>{task.responsible_person}</td>
                                    <td>{task.start_date}</td>
                                    <td>{task.deadline}</td>
                                    <td>{task.created_by}</td>
                                    <td>{task.project_name}</td>
                                    <td>
                                        <a data-toggle="modal" data-target="#login-modal" onClick={() => selectTask(task.id)}>
                                        <i class="icon-pencil mr-2 text-success" ></i></a>
                                        <a data-toggle="modal" data-target="#adduser-modal" onClick={() => selectTask(task.id)}>
                                        </a>
                                        <a onClick={() => onDelete(task.id)}>
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

  );
};

export default AddTask;
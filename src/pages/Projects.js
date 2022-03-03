import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import API from "../API"




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
  };

  const onUpdate = (id) => {
    let item = { name };
    API.patch('update/${id}/', item).then((res) => refreshProjects());
  };

  const onDelete = (id) => {
    API.delete('item/${id}/delete/').then((res) => refreshProjects());
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a Project</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{projectId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Start_date"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="text"
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
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Name</th>
                <th scope="col">Description</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Type</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                return (
                  <tr key="">
                    <th scope="row">{project.id}</th>
                    <td> {project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td>{project.type}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectProject(project.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(project.id)}
                      >
                      </i>
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

export default AddProject;
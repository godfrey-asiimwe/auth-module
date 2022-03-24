import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';
import API from "../API"
import auth from "../auth"
import '../App.css'

const AddProject = ({ onAdd }) => {
const { user } = useAuthUser()
const { logout } = useAuthActions()
const [password, setPassword] = useState("");
const [password2, setPassword2] = useState("");
const [old_password, setOldpassword] = useState("");
const [users, setUsers] = useState([]);
const [userId, setUserId] = useState(null);
const [inputValue, setValue] = useState('');
const [selectedValue, setSelectedValue] = useState(null);
const [accessToken, setAccessToken] = useState(null);


  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  //on saving the project
  const onSubmit = (e) => {

    e.preventDefault();
    let item = { password, password2, old_password};
    auth.put("/change_password/"+user.id+"/", item,{
      Authorization: `Bearer ${user.accessToken}`,
    });


    setPassword("");
    setPassword2("");
    setOldpassword("");

  };


  return (
            <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Change password</h4>
                                <Form onSubmit={onSubmit} className="mt-4">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                      <Form.Label>Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicStarring">
                                      <Form.Label>Confirm Password</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Re-Enter Password"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicStarring">
                                      <Form.Label>Old Password</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Re-Enter Old password"
                                        value={old_password}
                                        onChange={(e) => setOldpassword(e.target.value)}
                                      />
                                    </Form.Group>

                                    <div className="float-right">
                                      <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={onSubmit}
                                        className="mx-2"
                                      >
                                        Submit
                                      </Button>
                                    </div>
                               </Form>
                            </div>
                        </div>
                    </div>
            </div>
  );
};

export default AddProject;
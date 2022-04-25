import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa';
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri';
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';

import auth from "../auth"

import '../App.css'


const AddProfile = ({ onAdd }) => {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()

  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setUserID] = useState("");
  const [contactId, setContactId] = useState(null);
  const [contacts, setContacts] = useState([]);

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
    auth.get("/contact/"+user.id)
      .then((res) => {
        setContacts(res.data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onUpdate = (id) => {
    let item = {phone,email,notes};
    auth.post('/update/'+id, item).then((res) => fetchData());
  };

  return (
     <>
        <div class="section-body">
            <h2 class="section-title">Hi, {user.username}!</h2>
            <p class="section-lead">
              Change information about yourself on this page.
            </p>

            {contacts.map((contact, index) => {
                            return (
             <div class="row mt-sm-4">
                  <div class="col-md-4">
                    <div class="card profile-widget">
                      <div class="profile-widget-header">
                        <div class="profile-widget-items">
                          <div class="profile-widget-item">
                               <div class="profile-widget-item-label">Projects</div>
                               <div class="profile-widget-item-value">18</div>
                          </div>
                          <div class="profile-widget-item">
                               <div class="profile-widget-item-label">Tasks</div>
                               <div class="profile-widget-item-value">10</div>
                          </div>
                          <div class="profile-widget-item">
                                <div class="profile-widget-item-label">Budgets</div>
                                <div class="profile-widget-item-value">30</div>
                          </div>
                        </div>
                      </div>
                      <div class="profile-widget-description">
                    <div class="profile-widget-name">
                    {user.first_name} {user.last_name}

                    <div class="text-muted d-inline font-weight-normal">
                    <div class="slash">
                        </div> Web Developer</div>
                    </div>
                       {contact.notes}
                  </div>
                    </div>
                  </div>

                   <div class="col-md-7">
                        <div class="card">
                          <form class="needs-validation" novalidate="">
                            <div class="card-header">
                              <h4>Edit Profile</h4>
                            </div>
                            <div class="row">

                                <div class="form-group col-md-6">
                                    <label>First Name</label>
                                    <input
                                        placeholder={user.first_name}
                                        className="form-control"
                                        type="text"
                                      />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        placeholder={user.last_name}
                                        className="form-control"
                                        type="text"
                                      />
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label>Email</label>
                                    <input
                                       placeholder={contact.email}
                                          onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        type="email"
                                      />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Phone</label>
                                    <input
                                        placeholder={contact.phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        type="text"
                                      />
                                </div>
                            </div>
                            <div class="row">
                                <label>Bio </label>
                                <div class="form-group">
                                    <textarea class="form-control" rows="3" placeholder={contact.notes}
                            onChange={(e) => setNotes(e.target.value)}>

                                    </textarea>
                                </div>
                                <div class="card-footer text-right">
                                  <button class="btn btn-primary" onClick={() => onUpdate(contact.id)}>Save Changes</button>
                                </div>
                            </div>

                          </form>
                        </div>
                   </div>
             </div>
             );
            })}
        </div>
     </>
  );
};

export default AddProfile;
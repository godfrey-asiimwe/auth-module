import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa';
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri';
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';

import '../App.css'


const AddProfile = ({ onAdd }) => {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()


  return (
     <>

        <div class="section-body">
            <h2 class="section-title">Hi, {user.username}!</h2>
            <p class="section-lead">
              Change information about yourself on this page.
            </p>

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
                    Ujang maman is a superhero name in <b>Indonesia</b>,
                    especially in my family. He is not a fictional character but an original hero in my family, a hero for his children and for his wife. So, I use the name as a user in this template. Not a tribute, I'm just bored with <b>'John Doe'</b>.
                  </div>
                    </div>
                  </div>

                   <div class="col-md-7">
                        <div class="card">
                          <form method="post" class="needs-validation" novalidate="">
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
                                        placeholder={user.email}
                                        className="form-control"
                                        type="text"
                                      />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Phone</label>
                                    <input
                                        placeholder=""
                                        className="form-control"
                                        type="text"
                                      />
                                </div>
                            </div>
                            <div class="row">
                                <label>Bio </label>
                                <div class="form-group">
                                    <textarea class="form-control" rows="3" placeholder="Text Here..."

                                    ></textarea>
                                </div>
                                <div class="card-footer text-right">
                                  <button class="btn btn-primary">Save Changes</button>
                                </div>
                            </div>

                          </form>
                        </div>
                   </div>
             </div>



        </div>
     </>
  );
};

export default AddProfile;
import { useState } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import ContactCard from '../components/ContactCard'
import API from "../API"
import Projects from './Projects'
import Tasks from './Taskss'
import Budget from './Budget'
import Schedules from './Schedules'
import Profile from './Profile'
import Rprojects from './Rprojects'
import Rtasks from './Rtasks'




const ContactsState = rj({
  effectCaller: rj.configured(),
  effect: (token) => (search = '') =>
    ajax.getJSON(`/contacts/?search=${search}`, {
      Authorization: `Bearer ${token}`,
    }),
})

export default function AddressBook() {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  const [search, setSearch] = useState('')
  const [{ data: contacts }] = useRunRj(ContactsState, [search], false)
  const [state, setState] = useState('start')

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
                                <img src="../assets/images/coseke.png" alt="homepage" class="dark-logo" />

                                <img src="../assets/images/coseke.png" alt="homepage" class="light-logo" />
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
                                <a class="dropdown-item" onClick={() => setState('profile') }><i data-feather="user"
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
                        <li class="sidebar-item"> <a class="sidebar-link sidebar-link pointer-link"  onClick={() => setState('start')}
                                aria-expanded="false"><i data-feather="home" class="feather-icon"></i><span
                                    class="hide-menu">Dashboard</span></a></li>
                        <li class="list-divider"></li>
                        <li class="nav-small-cap"><span class="hide-menu">Project Plan</span></li>

                        <li class="sidebar-item"> <a class="sidebar-link pointer-link " onClick={() => setState('projects') }
                                aria-expanded="false"><i data-feather="tag" class="feather-icon"></i><span
                                    class="hide-menu">Projects
                                </span></a>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link pointer-link " onClick={() => setState('budgets') }
                                aria-expanded="false"><i data-feather="tag" class="feather-icon"></i><span
                                    class="hide-menu">Budgets
                                </span></a>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link sidebar-link pointer-link" onClick={() => setState('tasks') }
                                aria-expanded="false"><i data-feather="message-square" class="feather-icon"></i><span
                                    class="hide-menu">Tasks</span></a></li>
                        <li class="sidebar-item">
                        <a class="sidebar-link sidebar-link" onClick={() => setState('schedules')}
                                aria-expanded="false">
                                <i data-feather="calendar" class="feather-icon"></i><span
                                    class="hide-menu">Schedule</span>
                                    </a></li>
                        <li class="list-divider"></li>
                    </ul>
                    

                    <ul id="sidebarnav">
                    <li class="nav-small-cap"><span class="hide-menu">Project Reports</span></li> 
                        <li class="sidebar-item"> <a class="sidebar-link sidebar-link pointer-link"  onClick={() => setState('Rprojects')}
                                aria-expanded="false"><i data-feather="home" class="feather-icon"></i><span
                                    class="hide-menu">Projects</span></a></li>
                        
                        <li class="sidebar-item"> <a class="sidebar-link sidebar-link pointer-link"  onClick={() => setState('Rtasks')}
                                aria-expanded="false"><i data-feather="home" class="feather-icon"></i><span
                                    class="hide-menu">Tasks</span></a></li>





                        <li class="list-divider"></li>
                        
                    </ul>
                </nav>
            </div>
         </aside>

         <div class="page-wrapper">
             <div class="container-fluid">
              {state === 'start' && (
                <div class="card-group">
                    <div class="card border-right">
                        <div class="card-body">
                            <div class="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <div class="d-inline-flex align-items-center">
                                        <h2 class="text-dark mb-1 font-weight-medium">36</h2>
                                    </div>
                                    <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Tasks</h6>
                                </div>
                                <div class="ml-auto mt-md-3 mt-lg-0">
                                    <span class="opacity-7 text-muted"><i data-feather="user-plus"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card border-right">
                        <div class="card-body">
                            <div class="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <h2 class="text-dark mb-1 w-100 text-truncate font-weight-medium">18</h2>
                                    <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Ongoing
                                    </h6>
                                </div>
                                <div class="ml-auto mt-md-3 mt-lg-0">
                                    <span class="opacity-7 text-muted"><i data-feather="dollar-sign"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card border-right">
                        <div class="card-body">
                            <div class="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <div class="d-inline-flex align-items-center">
                                        <h2 class="text-dark mb-1 font-weight-medium">3</h2>
                                    </div>
                                    <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Active Projects</h6>
                                </div>
                                <div class="ml-auto mt-md-3 mt-lg-0">
                                    <span class="opacity-7 text-muted"><i data-feather="file-plus"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <h2 class="text-dark mb-1 font-weight-medium">5</h2>
                                    <h6 class="text-muted font-weight-normal mb-0 w-100 text-truncate">Projects</h6>
                                </div>
                                <div class="ml-auto mt-md-3 mt-lg-0">
                                    <span class="opacity-7 text-muted"><i data-feather="globe"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               )}
              {state === 'projects' && <Projects />}
              {state === 'tasks' && <Tasks />}
              {state === 'budgets' && <Budget />}
              {state === 'schedules' && <Schedules />}
              {state === 'profile' && <Profile />}
              {state === 'Rprojects' && <Rprojects/>}
              {state === 'Rtasks' && <Rtasks/>}
          </div>
         
         </div>

       <footer class="footer text-center text-muted" >
            All Rights Reserved by Coseke.
            <a class="sec2"> Designed and Developed by  Coseke U LTD</a>.
       </footer>

      </div>
  )
}

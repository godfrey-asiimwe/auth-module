import React,{ useState, useEffect } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import { useAuthActions, useAuthUser } from 'use-eazy-auth'
import AsyncSelect from 'react-select/async';
import API from "../API"
import auth from "../auth"
import '../App.css'
import budgetAPI from "../budgetAPI"

// import accordion packages




const AddBudget = ({ onAdd }) => {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  const [item_name, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [item_cost, setAmount] = useState("");
  const [budget_id, setBudgetId] = useState(null);
  const [budgets, setBudgets] = useState([]);
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
    budgetAPI.get("/budgetapi/v1/get_budgets")
      .then((res) => {
        setBudgets(res.data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchData();
  }, []);



  //assign budget item to a project
  const onSubmit = (e) => {
    e.preventDefault();
    let item = {budget_id, item_name, description, item_cost};
    budgetAPI.post("/budgetapi/v1/create_budget_item", item).then(() => fetchData());
   
    setItem("");
    setAmount("");
    setDescription("");
    setBudgetId("");

  };

  return (

    <div class="card">
        <div class="card-body">
        <div id="budget-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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
                          <Form.Label>Budget</Form.Label>
                          <select class="form-control" id="exampleFormControlSelect1"  onChange={(e) => setBudgetId(e.target.value)}>
                          {budgets.map((budget, index) => {
                            return (
                              
                                
                                <option value={budget.budget_id}>{budget.budgetName}</option>
                                
                            );
                          })}
                          </select>
                                
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Item</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Item"
                            value={item_name}
                            onChange={(e) => setItem(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Description</Form.Label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            type="text"
                            placeholder="Enter Item"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Item Cost</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Amount"
                            value={item_cost}
                            onChange={(e) => setAmount(e.target.value)}
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
                <h4 class="card-title">List of Budgets</h4>
                <div class="ml-auto">
                    <div class="dropdown sub-dropdown">
                        <button class="btn btn-link text-muted dropdown-toggle" type="button"
                            id="dd1" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <i data-feather="more-vertical"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dd1">
                            <a class="dropdown-item" data-toggle="modal"
                                data-target="#budget-modal">Create Budget Item</a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                
            
                            
                    {/* display budget data */}
                        
                           
                           <div>
                              <table class="table"> 
                              
                                              <thead>
                                                <tr>
                                                  
                                                  <th scope="col">Budget</th>
                                                  <th scope="col">Project</th>
                                                  
                                                </tr>
                                              </thead>
                                              <tbody>
                                              
                                                 
                                                      
                                              {budgets.map((budget, index) => {
                                                  return(
                                                    
                                                    <>
                                                    <tr colspan="6" data-toggle="collapse" data-target={"#demo" + budget.budget_id} class="accordion-toggle">
                                                    
                                                        <td>{budget.budgetName}</td>
                                                        <td>{"#demo" + budget.budget_id}</td>
                                                        
                                                    </tr>
                                                    
                                                    <tr class="p">
                                                      <td colspan="6" class="hiddenRow">
                                                      <div class="accordian-body collapse p-3" id={"demo" + JSON.stringify(budget.budget_id)}>
                                                      <p>No : <span>{budget.budget_id}</span></p>
                                                      <p>Date : <span>12 Jan 2018</span> </p>
                                                      <p>Description : <span>Good</span> </p>
                                                      <p>Credit : <span>$150.00</span> </p>
                                                      <p>Debit : <span></span></p>
                                                      <p>Balance : <span>$150.00</span></p>
                                                      </div>
                                                      </td>
                                                      </tr>
                                                    
                                                    
                                                    
                                                    
                                                    </>
                                                    
                                                    
                                                  );
                                              }
                                            )}
                                             
                                                
                                                
                                           </tbody>
                                     </table>  
                                     
                                      
                                            
                                </div>

                                {/* accordion */}
                               
                                

 {/* end of accordons */}</div>
             
                
            </div>
        </div>
        
    

  );
};

export default AddBudget;
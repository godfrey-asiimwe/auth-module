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
import { ContextMenu, MenuItem} from "react-contextmenu";
import {RiDeleteBin6Line} from 'react-icons/ri';

// import accordion packages




const AddBudget = () => {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  
  const [itemName, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [itemCost, setAmount] = useState("");
  const [item_id, setItemId] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [items, setBudgetItems] = useState([]);
  
  
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState("");


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
    refreshBudgetItems();
    fetchData();
  }, []);

  //fetching budget item data from the system
  const fetchItemData = (id) => {
    budgetAPI.get("/budgetapi/v1/get_single_budget_item/" + id )
      .then((res) => {
        setBudgetItems(res.data);
      })
      .catch(console.error);

  }

  

  useEffect(() => {
    refreshBudgetItems();
    fetchItemData();
  }, []);



  //assign budget item to a project
  const onSubmit = (e) => {
    e.preventDefault();
    let item = {budgetId, description, itemCost, itemName};
    budgetAPI.post("/budgetapi/v1/create_budget_item", item);
   
    setItem("");
    setAmount("");
    setDescription("");
    setBudgetId("");

  };

   //refreshing the budget item list
   const refreshBudgetItems = (id) => {
    budgetAPI.get("/budgetapi/v1/get_single_budget_item/" + id)
      .then((res) => {
        setBudgetItems(res.data);
      })
      .catch(console.error);
  };

  //deleting the budget item
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
     budgetAPI.delete('/budgetapi/v1/delete_budget_item/'+ id).then((res) => refreshBudgetItems())
      .then()
      .catch((err) => {
        console.log(err.response);
      });

    alert("Item with ID " + id + " was deleted successfully");

  }
}

//on selecting the
function selectItems(id) {
  let item = items.filter((item) => item.itemId === id)[0];
  setItem(item.itemName);
  setDescription(item.description);
  setAmount(item.itemCost);
  setItemId(item.itemId);
  setBudgetId(item.budgetId);
}


//update budget item
const updateItem = (id) => {
  let item = {itemName,description,itemCost, budgetId};
  //console.warn(item)
  budgetAPI.put('/budgetapi/v1/update_budget_item/'+ id, item).then((res) => refreshBudgetItems());

  setItem("");
  setDescription("");
  setAmount("");
  setBudgetId("");
};





  return (

    <div class="card">
        {/* add budget item form */}
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
                            value={itemName}
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
                            value={itemCost}
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

    {/*update budget item form */}
    <div id="budget_item-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="text-center mt-2 mb-4">
                        <a href="index.html" class="text-success">
                            <span></span>
                        </a>
                    </div>

                   <Form  className="mt-4">
                          <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Item</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Item"
                            value={itemName}
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
                            value={itemCost}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </Form.Group>
                       
                     
                        <div className="float-right">
                          
                          <Button
                            variant="primary"
                            type="button"
                            className="mx-2"
                            onClick={() => updateItem(item_id)}>
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
                                                    <tr colspan="6" data-toggle="collapse" data-target={"#demo" + budget.budget_id} class="accordion-toggle" onClick = {()=>fetchItemData(budget.budget_id)}>
                                                    
                                                        <td>{budget.budgetName}</td>
                                                        <td>{"#demo" + budget.budget_id}</td>
                                                        
                                                    </tr>
                                                    
                                                    <tr class="p">
                                                      <td colspan="6" class="hiddenRow">
                                                      
                                                      <div class="accordian-body collapse p-3" id={"demo" + JSON.stringify(budget.budget_id)}  > 
                                                     
                                                      {items.map((item, i) => {
                                                            {
                                                              return(
                                                                <>
                                                                <tr>
                                                                  <th>Item</th>
                                                                  <th>Description</th>
                                                                  <th>Cost</th>
                                                                  <th>Actions</th>
                                                                </tr>
                                                                <tr key={i}>
                                                                  <td>Item: {item.itemName} </td>
                                                                  <td>Description: {item.description} </td>
                                                                  <td>Item Cost: {item.itemCost} </td>
                                                                  <td>
                                                                      <button onClick={() => onDelete(item.itemId)}>Delete</button>
                                                                  </td>
                                                                      <td><button class="dropdown-item" data-toggle="modal"
                                                                          data-target="#budget_item-modal" onClick={() => selectItems(item.itemId)}>Update</button>
                                                                  </td>
                                                                  
                                                                  </tr>
                                                                  </>
                                                              )
                                                            }
                                                          })

                                                          }
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
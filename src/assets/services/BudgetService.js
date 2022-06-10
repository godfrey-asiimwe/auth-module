import axios from 'axios';

//point to budget list url
const BUDGET_API_BASE_URL = "http://localhost:8080/api/v1/budget";



class BudgetService{

    createBudgetItem(budget){
        // pass the entire employee object
        return axios.post(BUDGET_API_BASE_URL, budget);
    }

    getBudget(){
        return axios.get(BUDGET_API_BASE_URL);
    }

    deleteBudget(budget_id){
        return axios.delete(BUDGET_API_BASE_URL + "/" + budget_id);
    }

    getBudgetById(budget_id){
        return axios.get(BUDGET_API_BASE_URL + "/" + budget_id);
    }

    updateBudget(budgetDetails, budgetId){
        return axios.put(BUDGET_API_BASE_URL + "/" + budgetId, budgetDetails);
    }


}

// export class object
export default new BudgetService();
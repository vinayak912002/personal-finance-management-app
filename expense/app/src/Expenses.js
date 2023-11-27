    import React, { useState, useEffect } from 'react';
    import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
    import DatePicker from 'react-datepicker';
    import Moment from 'react-moment';
    import { Link, useNavigate } from 'react-router-dom';


    import "react-datepicker/dist/react-datepicker.css";

    const Expenses = () => {
        const emptyItem = {
            id: '103',
            expensedate: new Date(),
            description: '',
            location: '',
            category: { id: 1, name: 'Travel' }
        };

        const [item, setItem] = useState(emptyItem);
        const [categories, setCategories] = useState([]);
        const [expenses, setExpenses] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        const navigate = useNavigate();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    // Fetch categories
                    const categoriesResponse = await fetch('/api/categories');
                    const categoriesData = await categoriesResponse.json();
                    setCategories(categoriesData);

                    // Fetch expenses
                    const expensesResponse = await fetch('/api/expenses');
                    const expensesData = await expensesResponse.json();
                    setExpenses(expensesData);

                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();

        }, []);

        const handleSubmit = async (event) => {
            try {
                event.preventDefault();
                const response = await fetch('/api/expenses', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                });
        
                if (!response.ok) {
                    // If the response status is not OK (e.g., 4xx or 5xx), handle the error
                    throw new Error(`Failed to add expense. Status: ${response.status}`);
                }
        
                // Fetch updated expenses and update state
                const updatedExpensesResponse = await fetch('/api/expenses');
                const updatedExpensesData = await updatedExpensesResponse.json();
                setExpenses(updatedExpensesData);
        
                // Navigate to expenses page if needed
                navigate("/expenses");
            } catch (error) {
                console.error('Error adding expense:', error);
                // Handle the error, show a message to the user, or perform any necessary actions
            }
        };
        

        const handleChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            setItem(prevItem => ({ ...prevItem, [name]: value }));
        };

        const handleDateChange = (date) => {
            setItem(prevItem => ({ ...prevItem, expensedate: date }));
        };

        const remove = async (id) => {
            try {
                await fetch(`/api/expenses/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
        
                // After deleting an expense, re-fetch the expenses to update the list
                const updatedExpensesResponse = await fetch('/api/expenses');
                const updatedExpensesData = await updatedExpensesResponse.json();
                setExpenses(updatedExpensesData);
            } catch (error) {
                console.error('Error deleting expense:', error);
            }
        };
        

        if (isLoading) {
            return <div>Loading...</div>;
        }

        let optionList = categories.map(category =>
            <option key={category.id} value={category.name}>
                {category.name}
            </option>
        );
        let rows = expenses.map(expense =>
            <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format='YYYY/MM/DD' /></td>
                <td>{expense.category.name}</td>
                <td><Button size='sm' color='danger' onClick={() => remove(expense.id)}>Delete</Button></td>
            </tr>
        );
        

        return (
            <div>
                <Container>
                    <h3>Add Expense</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="description">Description:</Label>
                            <Input type="text" name="description" id="description" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location:</Label>
                            <Input type="text" name="location" id="location" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category:</Label>
                            <select name="category" id="category" onChange={handleChange}>
                                {optionList}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="expensedate">Expense Date:</Label>
                            <DatePicker selected={item.expensedate} onChange={handleDateChange} dateFormat={"yyyy/MM/dd"}/>
                        </FormGroup>
                        <Button color="primary" type="submit">Save</Button>{" "}
                        <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
                    </Form>
                </Container>

                <Container>
                    <h3>Expense List</h3>
                    <Table className='mt-4'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Expense Date</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    };

    export default Expenses;

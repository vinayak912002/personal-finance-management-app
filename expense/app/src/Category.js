import React, { useState, useEffect } from 'react';
import AppNav from './AppNav';

const Category = () => {
    // State variables using the useState hook
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    // Effect to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function

    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <AppNav />
            <h2>Categories</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : Array.isArray(categories) ? (
                categories.map(category => (
                    <div key={category.id} id={category.id}>
                        {category.name}
                    </div>
                ))
            ) : (
                <div>No categories available.</div>
            )}
        </div>
    );
};

export default Category;

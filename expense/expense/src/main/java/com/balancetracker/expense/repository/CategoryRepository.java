package com.balancetracker.expense.repository;

import com.balancetracker.expense.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

//since this is an interface which extends JpaRepository all the connection  handling will be done by jpa
public interface CategoryRepository extends JpaRepository<Category, Long>//the datatype of the Id i.e. the primary key is long in category
//here the java class category is being mapped to a database table
//the first argument is the class name and the second argument is the type of the primary key of the table of the mentioned java object
{
    //the find field in JPA works like is findBy + fieldName
    //now in the category table we have a field name, so we need to put that and the first letter would be caps
    Category findByName(String name);
}

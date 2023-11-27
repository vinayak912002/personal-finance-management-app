package com.balancetracker.expense.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor //Generate constructors with one argument for every field in the class
@NoArgsConstructor //Generate constructors with no arguments for every field in the class
@Entity //to make jpa know that our intention is to make a table out of this class
@Data //generate getters for all fields
@Table(name = "USERS")
public class Users {
    @Id//the below field is a primary key
    private Long id;
    private String name;
    private String email;

    /*
    @OneToMany //this defines a one to many relation between user and category
    private Set<Category> category;
    */
}

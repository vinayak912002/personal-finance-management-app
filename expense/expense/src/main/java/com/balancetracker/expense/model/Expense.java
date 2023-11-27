package com.balancetracker.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "EXPENSE")

public class Expense {

    @Id
    private Long id;

    private Instant expensedate;

    private String description;

    private String location;

    @ManyToOne//many expenses go in a category
    private Category category;


    //we do not want to send user info back in response for security reasons
    @JsonIgnore//this annotation makes sure that this part is not included in the response
    @ManyToOne//many expenses go to one user
    private Users users;

}

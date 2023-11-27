package com.balancetracker.expense.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "CATEGORY")
public class Category {
    @Id
    private Long id;
    private String name;
    /*
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;
     */
}

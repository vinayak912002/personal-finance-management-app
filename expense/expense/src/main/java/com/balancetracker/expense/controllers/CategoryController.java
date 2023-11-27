package com.balancetracker.expense.controllers;

import com.balancetracker.expense.model.Category;
import com.balancetracker.expense.repository.CategoryRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository){
        super();
        this.categoryRepository = categoryRepository;
    }
    @GetMapping("/categories")
    Collection<Category> categories(){
        return categoryRepository.findAll();//this means select * form category
    }
    @GetMapping("/category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id) { //pathvariable basically says that the id that we are passing is basically a part of the path of the url which is passed to getmapping
         Optional<Category> category = categoryRepository.findById(id);
         return category.map(response -> ResponseEntity.ok().body(response))
                 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
         //the return statement returns a http entity with response in the body
        //if the response is empty i.e. there is no response then a response entity with error 404 will be returned
    }
    @PostMapping("/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException{
        Category result = categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result);
    }
    //notice that the above method and the below one are the same but in spite of that one of them create an entry while the other updates the values in existing entries
    //this is the magic of using springboot, it knows that if entry exists and the http request method is put it has to update the table
    @PutMapping("/category/{id}")
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category){
        Category result = categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }
    @DeleteMapping("/category/{id}")
    ResponseEntity<?> deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();//.build() means that there is no body in this response, just return the success code
    }
}

package ru.kata.spring.boot_security.demo.controllers;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AdminRestController {
    private UserService userService;
    private RoleService roleService;


    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public List<User> allUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/admin/{id}")
    public User showUser(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/admin")
    @ResponseStatus(HttpStatus.CREATED)
    public List<User> addUser(@RequestBody User user) {
        userService.saveUser(user);
        return userService.getAllUsers();
    }

    @PatchMapping("/admin/{id}")
    public List<User> update(@PathVariable long id, @RequestBody User user) {
        user.setId(id);
        userService.saveUser(user);
        return userService.getAllUsers();
    }

    @DeleteMapping("/admin/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public List<User> deleteUser(@PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
        return userService.getAllUsers();
    }

    @GetMapping("/admin/roles")
    public List<Role> showRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/user")
    public User pageForUser(Principal principal) {
        return userService.findByUsername(principal.getName());
    }
}

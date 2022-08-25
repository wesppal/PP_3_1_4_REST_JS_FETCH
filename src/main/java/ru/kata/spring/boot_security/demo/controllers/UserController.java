package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
public class UserController {
    UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginUser() {
        return "login";
    }

    @GetMapping("/user")
    public String pageForUser(Model model, Principal principal) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        return "user_panel";
    }
}
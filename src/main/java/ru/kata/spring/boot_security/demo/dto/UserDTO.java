package ru.kata.spring.boot_security.demo.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.Collection;

@Getter
@Setter
@RequiredArgsConstructor
public class UserDTO  {

    private String firstName;
    private String lastName;
    private int age;
    private String username;
    private String password;
    private Collection<Role> roles;

}

package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.entities.Role;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RoleService {
    private final RoleDao roleDao;

    @Autowired
    public RoleService(RoleDao roleDao) {
        this.roleDao = roleDao;
    }


    public List<Role> getAllRoles() {
        return roleDao.findAll();
    }


    public Role getRole(String userRole) {
        return roleDao.getRole(userRole);
    }


    public Role getRoleById(Integer id) {
        return roleDao.getById(id);
    }


    @Transactional
    public void addRole(Role role) {
        roleDao.addRole(role);
    }
}

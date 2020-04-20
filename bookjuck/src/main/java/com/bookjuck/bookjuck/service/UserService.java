package com.bookjuck.bookjuck.service;

import com.bookjuck.bookjuck.DAO.UserDao;
import com.bookjuck.bookjuck.DTO.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserDao userDao;

    @Autowired
    public UserService(UserDao userDao){
        this.userDao = userDao;
    }

    public User selectMember(String email, String password) throws Exception {
        User user = userDao.selectUserByEmail(email);
        if(user == null) {
            throw new Exception();
        }
        if(!user.matchPassword(password)) {
            throw new Exception();
        }
        return user;
    }

    public int insertMember(User user) {
        return userDao.insert(user);
    }

}

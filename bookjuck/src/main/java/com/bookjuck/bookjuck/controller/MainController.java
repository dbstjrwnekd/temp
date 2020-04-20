package com.bookjuck.bookjuck.controller;

import com.bookjuck.bookjuck.DTO.User;
import com.bookjuck.bookjuck.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MainController {
    private UserService userService;

    @Autowired
    public MainController(UserService userService){
        this.userService = userService;
    }

    @RequestMapping("logout")
    public ModelAndView logout(HttpSession session) {
        ModelAndView mav = new ModelAndView();
        session.setAttribute("loginInfo", null);
        mav.setViewName("redirect:/");
        return mav;
    }

    @RequestMapping("addmember")
    public ModelAndView addmember() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("addmember");
        return mav;
    }

    @RequestMapping(value = "/loginMember", method = RequestMethod.POST)
    public ModelAndView login(User user, HttpSession session, HttpServletRequest request)
            throws Exception{
        ModelAndView mav = new ModelAndView();
        mav.setViewName("redirect:/");

        User loginUser = userService.selectMember(user.getEmail(), user.getPassword());

        if(loginUser !=null) {
            session.setAttribute("loginUser", loginUser);
        }else {
            throw new Exception();
        }
        return mav;
    }

    @RequestMapping(value = "/insertMember", method = RequestMethod.POST)
    public ModelAndView enrollment(User user) throws Exception{
        ModelAndView mav = new ModelAndView();
        mav.setViewName("redirect:/");
        if(!user.matchPassword(user.getPasswordConfirm())) {
            throw new Exception();
        }
        userService.insertMember(user);
        return mav;
    }

}

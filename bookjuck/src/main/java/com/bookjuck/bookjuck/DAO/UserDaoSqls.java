package com.bookjuck.bookjuck.DAO;

public class UserDaoSqls {

    public static final String SELECT_USER = "select * from user where id = :id";
    public static final String SELECT_USER_BY_NAME = "select * from user where email = :email";
}

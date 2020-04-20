package com.bookjuck.bookjuck.DTO;

public class User {
    private int id;
    private String password;
    private String passwordConfirm;
    private String email;
    private String name;
    private String profileImage;

    public User() {
        super();
    }

    public User(int id, String password, String passwordConfirm, String email, String name) {
        super();
        this.id = id;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.email = email;
        this.name = name;
    }

    public User(int id, String password, String passwordConfirm, String email, String name, String profileImage) {
        super();
        this.id = id;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.email = email;
        this.name = name;
        this.profileImage = profileImage;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPasswordConfirm() {
        return passwordConfirm;
    }
    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getProfileImage() {
        return profileImage;
    }
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", password=" + password + ", passwordConfirm=" + passwordConfirm + ", email=" + email
                + ", name=" + name + ", profileImage=" + profileImage + "]";
    }

    public boolean matchPassword(String password) {
        return this.password.equals(password);
    }

}

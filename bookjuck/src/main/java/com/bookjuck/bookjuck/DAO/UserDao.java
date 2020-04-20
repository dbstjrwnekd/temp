package com.bookjuck.bookjuck.DAO;

import com.bookjuck.bookjuck.DTO.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bookjuck.bookjuck.DAO.UserDaoSqls.*;

@Repository
public class UserDao {
    private NamedParameterJdbcTemplate jdbc;
    private SimpleJdbcInsert insertAction;
    private RowMapper<User> rowMapper = BeanPropertyRowMapper.newInstance(User.class);

    public UserDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
        this.insertAction = new SimpleJdbcInsert(dataSource)
                .withTableName("user");
    }

    public User selectUser(int id){
        Map<String, Integer> params = new HashMap<>();
        params.put("id", id);
        return jdbc.query(SELECT_USER, params, rowMapper).get(0);
    }

    public User selectUserByEmail(String email) {
        Map<String, String> params = new HashMap<>();
        params.put("email", email);
        List<User> user = jdbc.query(SELECT_USER_BY_NAME, params, rowMapper);
        if(user.size()==0) {
            return null;
        }
        return user.get(0);
    }

    public int insert(User user) {
        SqlParameterSource params = new BeanPropertySqlParameterSource(user);
        return insertAction.execute(params);
    }

}

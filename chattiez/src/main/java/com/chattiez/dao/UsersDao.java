package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Users;

public interface UsersDao {
	void registerUser(Users user);

	List<Users> listUsers();
	List<Users> findFriends(String email);
	int validateUser(String email,String password);
	 void logout(String email);
}

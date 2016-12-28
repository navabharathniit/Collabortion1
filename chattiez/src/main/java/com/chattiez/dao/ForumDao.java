package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Forum;



public interface ForumDao {
	void createForum(Forum forum);
	List<Forum> viewForums();
	List<Forum> viewMyForums(String posted_By);
	void updateForums(Forum forum);
	void deleteForum(Forum forum);
	
}

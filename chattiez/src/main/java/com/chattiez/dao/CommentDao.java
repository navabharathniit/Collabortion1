package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Comment;
import com.chattiez.model.Friend;

public interface CommentDao {
	void addComment(Comment comment);
	void updateComment(Comment comment);
	void removeComment(Comment comment);

	List<Comment> viewComments(int blog_Id);

	
}

package com.chattiez.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
@Id@GeneratedValue
 private int comment_Id;
 private int blog_Id;
 private String comment;
 private String email;
 
 
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public int getComment_Id() {
	return comment_Id;
}
public void setComment_Id(int comment_Id) {
	this.comment_Id = comment_Id;
}
public String getComment() {
	return comment;
}
public int getBlog_Id() {
	return blog_Id;
}
public void setBlog_Id(int blog_Id) {
	this.blog_Id = blog_Id;
}
public void setComment(String comment) {
	this.comment = comment;
}
 
 
	
	
	
}

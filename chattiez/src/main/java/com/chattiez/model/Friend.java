package com.chattiez.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Friend {
@Id@GeneratedValue
private int friend_id;
 private String email;
 private String friendName;
 private boolean online;
 
public boolean isOnline() {
	return online;
}
public void setOnline(boolean online) {
	this.online = online;
}
public int getFriend_id() {
	return friend_id;
}
public void setFriend_id(int friend_id) {
	this.friend_id = friend_id;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getFriendName() {
	return friendName;
}
public void setFriendName(String friendName) {
	this.friendName = friendName;
}
 
}

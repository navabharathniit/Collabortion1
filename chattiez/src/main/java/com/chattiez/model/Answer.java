package com.chattiez.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Answer {
@Id@GeneratedValue

   private int ansId;

   private  int forum_Id;
   
   private String answer;
   
   private String email;

public int getAnsId() {
	return ansId;
}

public void setAnsId(int ansId) {
	this.ansId = ansId;
}

public int getForum_Id() {
	return forum_Id;
}

public void setForum_Id(int forum_Id) {
	this.forum_Id = forum_Id;
}

public String getAnswer() {
	return answer;
}

public void setAnswer(String answer) {
	this.answer = answer;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}
   
}

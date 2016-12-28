package com.chattiez.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Forum {
@Id@GeneratedValue
private int forum_Id;
private String question;
private String answer;
private String posted_By;


public int getForum_Id() {
	return forum_Id;
}
public void setForum_Id(int forum_Id) {
	this.forum_Id = forum_Id;
}
public String getQuestion() {
	return question;
}
public void setQuestion(String question) {
	this.question = question;
}
public String getAnswer() {
	return answer;
}
public void setAnswer(String answer) {
	this.answer = answer;
}
public String getPosted_By() {
	return posted_By;
}
public void setPosted_By(String posted_By) {
	this.posted_By = posted_By;
}


}

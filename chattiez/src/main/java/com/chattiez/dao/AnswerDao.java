package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Answer;

public interface AnswerDao {
	void addAnswer(Answer answer);
	void updateAnswer(Answer answer);
	void removeAnswer(Answer answer);

	List<Answer> viewAnswers(int forum_Id);

}

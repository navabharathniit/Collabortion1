package com.chattiez.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chattiez.model.Answer;
import com.chattiez.model.Comment;

@Transactional
@Repository
public class AnswerDaoImpl implements AnswerDao{

	@Autowired
	SessionFactory sessionfactory;
	public void addAnswer(Answer answer) {
		
		sessionfactory.getCurrentSession().save(answer);
	}

	public void updateAnswer(Answer answer) {
		sessionfactory.getCurrentSession().update(answer);
	}

	public void removeAnswer(Answer answer) {
		sessionfactory.getCurrentSession().delete(answer);
		
	}

	public List<Answer> viewAnswers(int forum_Id) {
		Criteria crt=sessionfactory.getCurrentSession().createCriteria(Answer.class);
		crt.add(Restrictions.eq("forum_Id",forum_Id));
		List list=crt.list();
		return list;
		
	}

}

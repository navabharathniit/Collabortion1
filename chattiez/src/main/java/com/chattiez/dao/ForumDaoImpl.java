package com.chattiez.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chattiez.model.Blog;
import com.chattiez.model.Forum;

@Repository
@Transactional
public class ForumDaoImpl implements ForumDao {

	@Autowired
	SessionFactory sessionfactory;
	public void createForum(Forum forum) {
		sessionfactory.getCurrentSession().save(forum);
		
		}

	public List<Forum> viewForums() {
		Session session=sessionfactory.getCurrentSession();
		List<Forum> list=session.createCriteria(Forum.class).list();
		return list;
		
	}

	public List<Forum> viewMyForums(String posted_By) {
		System.out.println("Inside the  viewMyForums(String posted_By)");
		Session session=sessionfactory.getCurrentSession();
		Criteria crit=session.createCriteria(Forum.class);
		crit.add(Restrictions.eq("posted_By",posted_By));
		crit.add(Restrictions.eq("status",true));
		List list=crit.list();
		System.out.println("list:"+list);
		return list;
	}

	public void updateForums(Forum forum) {
		sessionfactory.getCurrentSession().update(forum);
		
	}

	public void deleteForum(Forum forum) {
		sessionfactory.getCurrentSession().delete(forum);
		
	}

	
}

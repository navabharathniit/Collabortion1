package com.chattiez.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chattiez.model.Friend;

@Repository
@Transactional
public class FriendDaoImpl implements FriendDao {

	@Autowired
	SessionFactory sessionfactory;
	
	public void addFriend(Friend friend) {
		
		sessionfactory.getCurrentSession().save(friend);
		
	}

	public void removeFriend(Friend friend) {
		
		sessionfactory.getCurrentSession().delete(friend);
	}

	public List<Friend> viewFriends(String email) {
		Criteria crt=sessionfactory.getCurrentSession().createCriteria(Friend.class);
		crt.add(Restrictions.eq("email",email));
		List list=crt.list();
		
		return list;
	}

	public void updateFriend(Friend friend) {
		
		sessionfactory.getCurrentSession().update(friend);
		
	}

	
}

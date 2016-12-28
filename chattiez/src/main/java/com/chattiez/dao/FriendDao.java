
	package com.chattiez.dao;

	import java.util.List;

	import com.chattiez.model.Friend;

	public interface FriendDao {
		void addFriend(Friend friend);
		void removeFriend(Friend friend);
		List<Friend> viewFriends(String email);
		
		
	}



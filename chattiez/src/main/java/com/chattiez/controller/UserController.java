package com.chattiez.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.chattiez.dao.AnswerDao;
import com.chattiez.dao.BlogDao;
import com.chattiez.dao.CommentDao;
import com.chattiez.dao.ForumDao;
import com.chattiez.dao.FriendDao;
import com.chattiez.dao.JobsDao;
import com.chattiez.dao.UsersDao;
import com.chattiez.model.Answer;
import com.chattiez.model.Blog;
import com.chattiez.model.Comment;
import com.chattiez.model.Forum;
import com.chattiez.model.Friend;
import com.chattiez.model.Jobs;
import com.chattiez.model.Users;


@RestController
public class UserController {
	
	
	@Autowired
	UsersDao usersdao;
	
	@RequestMapping(value="/getUsers",headers="accept=Application/json",method=RequestMethod.GET)
	public List <Users> getUsers()
	{
		List<Users> users=usersdao.listUsers();
return users;
}
	
	@RequestMapping(value="/authenticate", method=RequestMethod.POST,headers="Accept=application/json")
	 public int authenticateUser(@RequestBody Users users)
	 {
		 System.out.println("email:"+users.getEmail());
		 System.out.println("password:"+users.getPassword());
	int result=0;
		 result=usersdao.validateUser(users.getEmail(),users.getPassword());
		 System.out.println("result we have got is:"+result);
		 return result;
	 }
	
	
	@RequestMapping(value="/fileUpload", method=RequestMethod.POST)
	public void saveUser(@RequestParam("file") MultipartFile file,@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("username") String username,@RequestParam("mobile") String mobile) 
	{
		System.out.println("Inside");
		System.out.println("file:"+file);
		System.out.println("Email:"+email+"\t"+password+"\t"+username+"\t"+mobile);
	Users user=new Users();
	user.setEmail(email);
	user.setPassword(password);	
	user.setUsername(username);
	user.setMobile(mobile);
	usersdao.registerUser(user);
	Path path=Paths.get("D://me//Chatify//WebContent//images//"+email+".jpg");
	if(file!=null)
	{
		try {
			file.transferTo(new File(path.toString()));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	}
	
	@RequestMapping(value="/logout/{email}",headers="accept=Application/json",method=RequestMethod.POST)
	public void logout(@PathVariable String email)
	{
	       usersdao.logout(email);
		}
	
	
	
	@Autowired
	BlogDao blogdao;
	
	@RequestMapping(value="/viewBlogs/{posted_By}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Blog> viewBlogs(@PathVariable("posted_By") String posted_By)
	{
		System.out.println("given name:"+posted_By);
		List<Blog> blogs= blogdao.viewMyBlogs(posted_By);
		return blogs;
	}
	
	@RequestMapping(value="/viewAllBlogs",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Blog> viewAllBlogs()
	{
		List<Blog> blogs=blogdao.viewBlogs();
		return blogs;
	}
	
	
	@RequestMapping(value="/createBlog",headers="accept=Application/json",method=RequestMethod.POST)
	public void saveBlog(@RequestBody Blog blog)
	{
		blogdao.createBlog(blog);
	}
	

	
	@RequestMapping(value="/deleteBlog",headers="accept=Application/json",method=RequestMethod.POST)
	public void deleteBlog(@RequestBody Blog blog){
		blogdao.deleteBlog(blog);
	}
	
	@RequestMapping(value="/updateBlogs",headers="accept=Application/json",method=RequestMethod.PUT)
	public void updateBlogs (@RequestBody Blog blog){
		blogdao.updateBlogs(blog);
	}
	
	
	
	
	@Autowired
	FriendDao frienddao;

	
	@RequestMapping(value="/addFriend",headers="accept=Application/json",method=RequestMethod.POST)
	public void addFriend(@RequestBody Friend friend)
	{
		frienddao.addFriend(friend);
	}
	
	@RequestMapping(value="/removeFriend",headers="accept=Application/json",method=RequestMethod.POST)
	public void removeFriend(@RequestBody Friend friend)
	{
		frienddao.removeFriend(friend);
		
	}
	@RequestMapping(value="/findFriends/{email}",method=RequestMethod.GET,headers="accept=Application/json")
	public List<Users> findFriends(@PathVariable String email)
	{
		List<Users> user=usersdao.findFriends(email);
		return user;
	}
	
	@RequestMapping(value="/viewFriends/{email}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Friend> viewFriends(@PathVariable("email") String email)
		
		{
			return frienddao.viewFriends(email);
		}
	
	
	@Autowired
	JobsDao jobsdao;
	
	@RequestMapping(value="/addJobs",headers="accept=Application/json",method=RequestMethod.POST)
	public void saveJobs(@RequestBody Jobs jobs)
	{
		jobsdao.addJobs(jobs);

	}
	
	@RequestMapping(value="/getJobs",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Jobs> getJobs()
	{
		List<Jobs> jobs=jobsdao.viewJobs();
		return jobs;
	}
	
	
	@RequestMapping(value="/deleteJob",headers="accept=Application/json",method=RequestMethod.POST)
	public void deleteJob(@RequestBody Jobs jobs){
		jobsdao.deleteJob(jobs);
	}
	
	@RequestMapping(value="/updateJobs",headers="accept=Application/json",method=RequestMethod.PUT)
	public void updateJobs (@RequestBody Jobs jobs){
		jobsdao.updateJobs(jobs);
	}
	
	
	@Autowired
	ForumDao forumdao;
	
	@RequestMapping(value="/saveForum",headers="accept=Application/json", method=RequestMethod.POST)
public void saveForum(@RequestBody Forum forum ){
 forumdao.createForum(forum);
	}
	
	@RequestMapping(value="/updateForum",headers="accept=Application/json", method=RequestMethod.POST)
public void updateForum(@RequestBody Forum forum){
		forumdao.updateForums(forum);
	}
	
	@RequestMapping(value="/removeForum",headers="accept=Application/json",method=RequestMethod.POST)
public void deleteForum(@RequestBody Forum forum){
		forumdao.deleteForum(forum);
	}
	
	@RequestMapping(value="/viewForums",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Forum>viewForums(){
		List<Forum> forums=forumdao.viewForums();
		return forums;
	}
	
	@RequestMapping(value="/viewForums/{posted_By}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Forum> viewForums(@PathVariable("posted_By") String posted_By)
	{
		System.out.println("given name:"+posted_By);
		List<Forum> forums= forumdao.viewMyForums(posted_By);
		return forums;
	}
	
	
	@Autowired
	CommentDao commentdao;
	
	@RequestMapping(value="/makeComment",headers="accept=Application/json",method=RequestMethod.POST)
	public void makeComment(@RequestBody Comment comment )
	{
		commentdao.addComment(comment);
			}
	@RequestMapping(value="/viewComments/{blog_Id}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Comment> viewComments(@PathVariable int blog_Id)
		{
			
			return commentdao.viewComments(blog_Id);
		}
	
	
	@Autowired
	AnswerDao answerdao;
	
	@RequestMapping(value="/sayAnswer",headers="accept=Application/json",method=RequestMethod.POST)
	public void addAnswer(@RequestBody Answer answer  )
	{
		answerdao.addAnswer(answer );
			}
	@RequestMapping(value="/viewAnswers/{forum_Id}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Answer> viewAnswers(@PathVariable int forum_Id)
		{
			
			return answerdao.viewAnswers(forum_Id);
		}
	
	
}
	




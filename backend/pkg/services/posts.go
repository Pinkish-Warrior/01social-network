package services

import (
	"Social/pkg/db"
	"Social/pkg/models"
	"database/sql"
	"fmt"
	"time"
)

type PostWithUser struct {
	models.Post
	User     models.User      `json:"author"`
	Comments []models.Comment `json:"comments"`
}

func CreatePost(post models.Post) error {
	query := `INSERT INTO posts (user_id, group_id, content, image, privacy, created_at, updated_at) 
              VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`

	_, err := db.DB.Exec(query, post.UserID, post.GroupID, post.Content, post.Image, post.Privacy)
	if err != nil {
		return fmt.Errorf("failed to create post: %w", err)
	}
	return nil
}

func GetPost(postID int) (models.Post, error) {
	query := `
		SELECT id, user_id, group_id, content, image, privacy, created_at, updated_at, 
		       (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes
		FROM posts p 
		WHERE id = ?`

	row := db.DB.QueryRow(query, postID)
	var post models.Post
	err := row.Scan(&post.ID, &post.UserID, &post.GroupID, &post.Content, &post.Image, &post.Privacy, &post.CreatedAt, &post.UpdatedAt, &post.Likes)
	if err == sql.ErrNoRows {
		return post, fmt.Errorf("post not found")
	} else if err != nil {
		return post, fmt.Errorf("failed to retrieve post: %w", err)
	}
	return post, nil
}

func GetAllPostsWithUser() ([]PostWithUser, error) {
	query := `
	SELECT p.id, p.user_id, p.group_id, p.content, p.image, p.privacy, p.created_at, p.updated_at, 
	       (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes,
	       u.id, u.first_name, u.last_name, u.nickname, u.avatar, u.about_me, u.is_private, u.created_at, u.updated_at
	FROM posts p
	LEFT JOIN users u ON p.user_id = u.id
	ORDER BY p.created_at DESC;`

	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query posts with user info: %w", err)
	}
	defer rows.Close()

	var postsWithUsers []PostWithUser

	for rows.Next() {
		var post models.Post
		var user models.User

		err := rows.Scan(&post.ID, &post.UserID, &post.GroupID, &post.Content, &post.Image, &post.Privacy, &post.CreatedAt, &post.UpdatedAt, &post.Likes,
			&user.ID, &user.FirstName, &user.LastName, &user.Nickname, &user.Avatar, &user.AboutMe, &user.IsPrivate, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to scan post and user: %w", err)
		}

		comments, err := getCommentsForPost(post.ID)
		if err != nil {
			return nil, fmt.Errorf("failed to fetch comments for post %d: %w", post.ID, err)
		}

		postsWithUsers = append(postsWithUsers, PostWithUser{
			Post:     post,
			User:     user,
			Comments: comments,
		})
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over posts: %w", err)
	}

	return postsWithUsers, nil
}

func getCommentsForPost(postID int) ([]models.Comment, error) {
	// SQL query to fetch comments for a specific post
	query := `
	SELECT id, user_id, post_id, content, created_at, updated_at
	FROM comments
	WHERE post_id = ?
	ORDER BY created_at ASC;
	`

	// Query the database
	rows, err := db.DB.Query(query, postID)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch comments for post %d: %w", postID, err)
	}
	defer rows.Close()

	// Initialize a slice to store the comments
	var comments []models.Comment

	// Iterate over the rows and scan each row into a Comment struct
	for rows.Next() {
		var comment models.Comment
		err := rows.Scan(&comment.ID, &comment.UserID, &comment.PostID, &comment.Content, &comment.CreatedAt, &comment.UpdatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to scan comment: %w", err)
		}
		comments = append(comments, comment)
	}

	// Check for errors from iterating over the rows
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over comments: %w", err)
	}

	return comments, nil
}

// UpdatePost updates the content of a post
func UpdatePost(postID int, updatedPost models.Post) error {
	_, err := db.DB.Exec(`UPDATE posts SET content = ?, image = ?, privacy = ?, updated_at = ? 
		WHERE id = ?`, updatedPost.Content, updatedPost.Image, updatedPost.Privacy, time.Now(), postID)
	if err != nil {
		return fmt.Errorf("failed to update post: %w", err)
	}
	return nil
}

// DeletePost removes a post from the database
func DeletePost(postID int) error {
	_, err := db.DB.Exec(`DELETE FROM posts WHERE id = ?`, postID)
	if err != nil {
		return fmt.Errorf("failed to delete post: %w", err)
	}
	return nil
}

func GetPostsByGroupID(groupID int) ([]models.Post, error) {
	query := `
		SELECT id, user_id, group_id, content, image, privacy, created_at, updated_at, 
		       (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes
		FROM posts p
		WHERE group_id = ?
		ORDER BY created_at DESC`

	rows, err := db.DB.Query(query, groupID)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve posts for group %d: %w", groupID, err)
	}
	defer rows.Close()

	var posts []models.Post
	count := 0
	for rows.Next() {
		count++
		var post models.Post
		if err := rows.Scan(&post.ID, &post.UserID, &post.GroupID, &post.Content, &post.Image, &post.Privacy, &post.CreatedAt, &post.UpdatedAt, &post.Likes); err != nil {
			return nil, fmt.Errorf("failed to scan post: %w", err)
		}
		posts = append(posts, post)
	}
	if count == 0 {
		fmt.Println("No posts found for group ID:", groupID)
	}
	return posts, nil

}

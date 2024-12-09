package services

import (
	"Social/pkg/db"
	"Social/pkg/models"
	"database/sql"
	"fmt"
	"log"
	"time"
)

// GetComment retrieves a specific comment by its ID
func GetComment(commentID int) (models.Comment, error) {
	var comment models.Comment

	query := `
		SELECT id, user_id, post_id, content, created_at, updated_at
		FROM comments
		WHERE id = ?`

	row := db.DB.QueryRow(query, commentID)
	err := row.Scan(&comment.ID, &comment.UserID, &comment.PostID, &comment.Content, &comment.CreatedAt, &comment.UpdatedAt)
	if err == sql.ErrNoRows {
		return comment, fmt.Errorf("comment not found")
	} else if err != nil {
		return comment, fmt.Errorf("failed to retrieve comment: %w", err)
	}

	return comment, nil
}

// GetCommentsByPostID retrieves all comments for a given post
func GetCommentsByPostID(postID int) ([]models.Comment, error) {
	var comments []models.Comment

	query := `
		SELECT id, user_id, post_id, content, created_at, updated_at
		FROM comments
		WHERE post_id = ?`

	rows, err := db.DB.Query(query, postID)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve comments: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var comment models.Comment
		if err := rows.Scan(&comment.ID, &comment.UserID, &comment.PostID, &comment.Content, &comment.CreatedAt, &comment.UpdatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan comment: %w", err)
		}
		comments = append(comments, comment)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error reading rows: %w", err)
	}

	return comments, nil
}

func CreateComment(comment models.Comment) error {
	query := `
        INSERT INTO comments (user_id, post_id, content, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
    `
	_, err := db.DB.Exec(query, comment.UserID, comment.PostID, comment.Content, time.Now(), time.Now())
	if err != nil {
		log.Printf("Error inserting comment into database: %v", err)
		return fmt.Errorf("could not insert comment: %w", err)
	}
	return nil
}

// UpdateComment updates an existing comment
func UpdateComment(commentID int, updatedComment models.Comment) error {
	// Check if the comment exists before updating
	row := db.DB.QueryRow(`SELECT 1 FROM comments WHERE id = ?`, commentID)
	var exists int
	err := row.Scan(&exists)
	if err == sql.ErrNoRows {
		return fmt.Errorf("comment not found")
	}
	if err != nil {
		return fmt.Errorf("failed to check comment existence: %w", err)
	}

	// Update the comment
	_, err = db.DB.Exec(`UPDATE comments SET content = ?, updated_at = ? WHERE id = ?`,
		updatedComment.Content, time.Now(), commentID)
	if err != nil {
		return fmt.Errorf("failed to update comment: %w", err)
	}
	return nil
}

// DeleteComment removes a comment from the database
func DeleteComment(commentID int) error {
	// Check if the comment exists before deleting
	row := db.DB.QueryRow(`SELECT 1 FROM comments WHERE id = ?`, commentID)
	var exists int
	err := row.Scan(&exists)
	if err == sql.ErrNoRows {
		return fmt.Errorf("comment not found")
	}
	if err != nil {
		return fmt.Errorf("failed to check comment existence: %w", err)
	}

	// Delete the comment
	_, err = db.DB.Exec(`DELETE FROM comments WHERE id = ?`, commentID)
	if err != nil {
		return fmt.Errorf("failed to delete comment: %w", err)
	}
	return nil
}

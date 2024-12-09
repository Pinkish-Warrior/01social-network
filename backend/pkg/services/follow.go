package services

import (
	"Social/pkg/db"
	"Social/pkg/models"
	"database/sql"
	"fmt"
	"time"
)

func CreateFollowRequest(request models.FollowRequest) error {
	request.CreatedAt = time.Now()

	_, err := db.DB.Exec(`INSERT INTO follow_requests (sender_id, recipient_id, status, created_at)
		VALUES (?, ?, ?, ?)`, request.SenderID, request.RecipientID, request.Status, request.CreatedAt)
	if err != nil {
		return fmt.Errorf("failed to create follow request: %w", err)
	}
	return nil
}
func GetFollowRequestsByUserID(userID int) ([]models.FollowRequest, error) {
	// Prepare the query to fetch follow requests where the user is the recipient
	rows, err := db.DB.Query(`
        SELECT id, sender_id, recipient_id, status, created_at
        FROM follow_requests
        WHERE recipient_id = ?`, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch follow requests: %w", err)
	}
	defer rows.Close()

	// Slice to hold the results
	var followRequests []models.FollowRequest

	// Iterate over the rows
	for rows.Next() {
		var request models.FollowRequest
		if err := rows.Scan(&request.ID, &request.SenderID, &request.RecipientID, &request.Status, &request.CreatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan follow request: %w", err)
		}
		followRequests = append(followRequests, request)
	}

	// Check for errors from iteration
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error occurred during iteration: %w", err)
	}

	if len(followRequests) == 0 {
		return nil, fmt.Errorf("no follow requests found for user ID: %d", userID)
	}

	return followRequests, nil
}

func GetFollowRequest(id int) (models.FollowRequest, error) {
	row := db.DB.QueryRow(`SELECT id, sender_id, recipient_id, status, created_at
		FROM follow_requests WHERE id = ?`, id)

	var request models.FollowRequest
	if err := row.Scan(&request.ID, &request.SenderID, &request.RecipientID, &request.Status, &request.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return request, fmt.Errorf("follow request not found")
		}
		return request, fmt.Errorf("failed to get follow request: %w", err)
	}
	return request, nil
}

func UpdateFollowRequest(id int, status string) error {
	// First, update the follow request status
	_, err := db.DB.Exec(`UPDATE follow_requests SET status = ? WHERE id = ?`, status, id)
	if err != nil {
		return fmt.Errorf("failed to update follow request: %w", err)
	}

	// If the request was accepted, add the follower
	if status == "accepted" {
		// Fetch the follow request details to get sender and recipient IDs
		row := db.DB.QueryRow(`SELECT sender_id, recipient_id FROM follow_requests WHERE id = ?`, id)
		var senderID, recipientID int
		if err := row.Scan(&senderID, &recipientID); err != nil {
			return fmt.Errorf("failed to fetch follow request details: %w", err)
		}

		// Insert the record into the followers table
		err := AddFollower(senderID, recipientID)
		if err != nil {
			return fmt.Errorf("failed to add follower: %w", err)
		}
	}

	return nil
}

func DeleteFollowRequest(id int) error {
	_, err := db.DB.Exec(`DELETE FROM follow_requests WHERE id = ?`, id)
	if err != nil {
		return fmt.Errorf("failed to delete follow request: %w", err)
	}
	return nil
}

func AddFollower(followerID int, followedID int) error {
	_, err := db.DB.Exec("INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)", followerID, followedID)
	if err != nil {
		return fmt.Errorf("failed to add follower: %w", err)
	}
	return nil
}

// GetFollowersByUserID retrieves all followers of a user by their userID
func GetFollowersByUserID(userID int) ([]models.User, error) {
	rows, err := db.DB.Query(`
        SELECT u.id, u.first_name,u.last_name,u.email
        FROM followers f
        JOIN users u ON f.follower_id = u.id
        WHERE f.followed_id = ?`, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch followers: %w", err)
	}
	defer rows.Close()

	var followers []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email); err != nil {
			return nil, fmt.Errorf("failed to scan follower: %w", err)
		}
		followers = append(followers, user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error occurred during iteration: %w", err)
	}

	return followers, nil
}

// GetFollowingByUserID retrieves all users that a given user is following
func GetFollowingByUserID(userID int) ([]models.User, error) {
	rows, err := db.DB.Query(`
        SELECT u.id, u.first_name, u.last_name, u.email
        FROM followers f
        JOIN users u ON f.followed_id = u.id
        WHERE f.follower_id = ?`, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch following: %w", err)
	}
	defer rows.Close()

	var following []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email); err != nil {
			return nil, fmt.Errorf("failed to scan following user: %w", err)
		}
		following = append(following, user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error occurred during iteration: %w", err)
	}

	return following, nil
}

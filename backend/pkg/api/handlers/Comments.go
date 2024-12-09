package handlers

import (
	"Social/pkg/models"
	"Social/pkg/services"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

func CreateComment(w http.ResponseWriter, r *http.Request, postIDStr string) {
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var comment models.Comment
	if err := json.NewDecoder(r.Body).Decode(&comment); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	comment.PostID = postID
	userID, ok := r.Context().Value("userID").(int)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	comment.UserID = userID

	if err := services.CreateComment(comment); err != nil {
		log.Printf("Error creating comment for postID %d, userID %d: %v", comment.PostID, comment.UserID, err)
		http.Error(w, "Failed to create comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Comment created successfully",
	})
}

// GetCommentsForPost handles GET requests to retrieve all comments for a post
func GetCommentsForPost(w http.ResponseWriter, r *http.Request, postIDStr string) {
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	comments, err := services.GetCommentsByPostID(postID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(comments); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// UpdateComment handles PUT requests to update a specific comment
func UpdateComment(w http.ResponseWriter, r *http.Request, postIDStr, commentIDStr string) {
	// Convert commentID to integer
	commentID, err := strconv.Atoi(commentIDStr)
	if err != nil {
		http.Error(w, "Invalid comment ID", http.StatusBadRequest)
		return
	}

	// Decode the request body into the Comment model
	var comment models.Comment
	if err := json.NewDecoder(r.Body).Decode(&comment); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Assign postID and userID to the comment
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}
	comment.PostID = postID

	userID, ok := r.Context().Value("userID").(int)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	comment.UserID = userID

	// Call service to update the comment
	if err := services.UpdateComment(commentID, comment); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Comment updated successfully",
	})
}

// DeleteComment handles DELETE requests to delete a specific comment
func DeleteComment(w http.ResponseWriter, r *http.Request, commentIDStr string) {
	// Convert commentID to integer
	commentID, err := strconv.Atoi(commentIDStr)
	if err != nil {
		http.Error(w, "Invalid comment ID", http.StatusBadRequest)
		return
	}

	// Call service to delete the comment
	if err := services.DeleteComment(commentID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Comment deleted successfully",
	})
}

package handlers

import (
	"Social/pkg/models"
	"Social/pkg/services"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	// Validate the logged-in user
	userID, userOk := r.Context().Value("userID").(int)
	groupIDStr := r.FormValue("group_id")
	var groupID *int

	if groupIDStr != "" {
		groupIDParsed, err := strconv.Atoi(groupIDStr)
		if err != nil {
			http.Error(w, "Invalid group ID", http.StatusBadRequest)
			return
		}
		groupID = &groupIDParsed
	}

	if !userOk && groupID == nil {
		http.Error(w, "Either user or group context is required", http.StatusBadRequest)
		return
	}

	content := r.FormValue("content")
	privacy := r.FormValue("privacy")
	if content == "" || (privacy != "public" && privacy != "private" && privacy != "almost_private") {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var filePath string
	if file, handler, err := r.FormFile("image"); err == nil {
		defer file.Close()
		filePath = saveUploadedFile(file, handler)
		if filePath == "" {
			http.Error(w, "File upload failed", http.StatusInternalServerError)
			return
		}
	}

	post := models.Post{
		UserID:  &userID,
		GroupID: groupID,
		Content: content,
		Image:   filePath,
		Privacy: privacy,
	}

	if err := services.CreatePost(post); err != nil {
		http.Error(w, "Failed to create post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	response := map[string]string{"message": "Post created successfully"}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func saveUploadedFile(file multipart.File, handler *multipart.FileHeader) string {
	uploadDir := "../uploads"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		log.Printf("Error creating upload directory: %v", err)
		return ""
	}

	// Generate a sanitized filename
	filePath := fmt.Sprintf("%s/%s", uploadDir, sanitizeFileName(handler.Filename))
	outFile, err := os.Create(filePath)
	if err != nil {
		log.Printf("Error saving file %s: %v", handler.Filename, err)
		return ""
	}
	defer outFile.Close()

	_, err = io.Copy(outFile, file)
	if err != nil {
		log.Printf("Error copying file %s: %v", handler.Filename, err)
		return ""
	}

	return filePath
}
func sanitizeFileName(name string) string {
	// Basic sanitization to prevent path traversal
	return filepath.Base(name)
}

func CreateGroupPost(w http.ResponseWriter, r *http.Request, groupIDStr string) {
	groupID, err := strconv.Atoi(groupIDStr)
	if err != nil || groupID <= 0 {
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		return
	}

	// Parse form data for post creation
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	userID, userOk := r.Context().Value("userID").(int)
	content := r.FormValue("content")
	privacy := r.FormValue("privacy")

	if !userOk || content == "" || (privacy != "public" && privacy != "private" && privacy != "almost_private") {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var filePath string
	if file, handler, err := r.FormFile("image"); err == nil {
		defer file.Close()
		filePath = saveUploadedFile(file, handler)
		if filePath == "" {
			http.Error(w, "File upload failed", http.StatusInternalServerError)
			return
		}
	}

	post := models.Post{
		UserID:  &userID,
		GroupID: &groupID,
		Content: content,
		Image:   filePath,
		Privacy: privacy,
	}

	if err := services.CreatePost(post); err != nil {
		http.Error(w, "Failed to create post", http.StatusInternalServerError)
		return
	}

	// Send the response
	w.WriteHeader(http.StatusCreated)
	response := map[string]interface{}{
		"message": "Post created successfully",
		"post":    post,
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

// GetPost handles GET requests to retrieve a specific post
func GetPost(w http.ResponseWriter, r *http.Request, postIDStr string) {
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	post, err := services.GetPost(postID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(post); err != nil {
		http.Error(w, "Failed to encode post", http.StatusInternalServerError)
	}
}

// GetAllPosts handles retrieving all posts with user information
func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	// Retrieve all posts with user data from the service layer
	postsWithUsers, err := services.GetAllPostsWithUser()
	if err != nil {
		http.Error(w, "Failed to retrieve posts", http.StatusInternalServerError)
		return
	}

	// Encode posts and user info as JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(postsWithUsers); err != nil {
		http.Error(w, "Failed to encode posts", http.StatusInternalServerError)
	}
}

// UpdatePost handles PUT requests to update a post
func UpdatePost(w http.ResponseWriter, r *http.Request, postIDStr string) {
	var post models.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	err = services.UpdatePost(postID, post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Post Updated successfully"})
}

// DeletePost handles DELETE requests to delete a post
func DeletePost(w http.ResponseWriter, r *http.Request, postIDStr string) {
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	err = services.DeletePost(postID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Delete Post successfully"})
}

func GetGroupPosts(w http.ResponseWriter, r *http.Request, groupIDStr string) {
	groupID, err := strconv.Atoi(groupIDStr)
	if err != nil || groupID <= 0 {
		log.Printf("Invalid group ID: %s", groupIDStr) // Log the invalid value
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		return
	}

	posts, err := services.GetPostsByGroupID(groupID)
	if err != nil {
		http.Error(w, "Failed to retrieve group posts", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(posts); err != nil {
		http.Error(w, "Failed to encode posts", http.StatusInternalServerError)
	}
}

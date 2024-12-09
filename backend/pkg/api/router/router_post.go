package router

import (
	"Social/pkg/api/handlers"
	"log"
	"net/http"
	"strings"
)

func HandlePostRoutes(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/post/")
	parts := strings.Split(path, "/")

	log.Printf("Path parts: %v", parts)
	var action, groupIDStr, postIDStr string

	if len(parts) > 0 {
		action = parts[0] // First part of the path is the action (e.g., "group")
	}
	if len(parts) > 1 {
		groupIDStr = parts[1] // "1"
	}
	if len(parts) > 2 {
		postIDStr = parts[2] // Third part of the path is the post ID
	}

	// Route the request based on HTTP method and URL structure
	switch r.Method {
	case "GET":
		if action == "group" && groupIDStr != "" {
			// Fetch posts by group ID
			handlers.GetGroupPosts(w, r, groupIDStr)
		} else if postIDStr != "" {
			// Fetch a specific post by ID
			handlers.GetPost(w, r, postIDStr)
		} else {
			// Fetch all posts
			handlers.GetAllPosts(w, r)
		}

	case "POST":
		if action == "group" && groupIDStr != "" {
			// Create a post in a specific group
			handlers.CreateGroupPost(w, r, groupIDStr)
		} else {
			// Create a general post
			handlers.CreatePost(w, r)
		}

	case "PUT":
		if postIDStr != "" {
			// Update a specific post by ID
			handlers.UpdatePost(w, r, postIDStr)
		} else {
			http.Error(w, "Post ID is required", http.StatusBadRequest)
		}

	case "DELETE":
		if postIDStr != "" {
			// Delete a specific post by ID
			handlers.DeletePost(w, r, postIDStr)
		} else {
			http.Error(w, "Post ID is required", http.StatusBadRequest)
		}

	default:
		// Respond with 405 for unsupported methods
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

package router

import (
	"Social/pkg/api/handlers"
	"net/http"
	"strings"
)

func HandleCommentRoutes(w http.ResponseWriter, r *http.Request) {
	// Extract the postID and commentID from the URL path for POST, PUT, GET, DELETE
	path := r.URL.Path
	// Extract postID from URL (e.g., "/posts/{postID}/comments")
	if strings.HasPrefix(path, "/posts/") {
		// Split the URL into segments
		segments := strings.Split(path, "/")
		if len(segments) < 4 {
			http.Error(w, "Invalid URL", http.StatusBadRequest)
			return
		}

		postIDStr := segments[2]
		// Handle different HTTP methods
		switch r.Method {
		case "POST":
			handlers.CreateComment(w, r, postIDStr)
		case "GET":
			handlers.GetCommentsForPost(w, r, postIDStr)
		case "PUT":
			if len(segments) < 5 {
				http.Error(w, "Comment ID is required", http.StatusBadRequest)
				return
			}
			commentIDStr := segments[4]
			handlers.UpdateComment(w, r, postIDStr, commentIDStr)
		case "DELETE":
			if len(segments) < 5 {
				http.Error(w, "Comment ID is required", http.StatusBadRequest)
				return
			}
			commentIDStr := segments[4]
			handlers.DeleteComment(w, r, commentIDStr)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	} else {
		http.Error(w, "Not found", http.StatusNotFound)
	}
}

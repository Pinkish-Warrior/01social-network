package router

import (
	"Social/pkg/api/handlers"
	"log"
	"net/http"
	"strings"
)

func HandleFollowRequestRoutes(w http.ResponseWriter, r *http.Request) {
	log.Printf("Request Method: %s, Request Path: %s", r.Method, r.URL.Path)

	// Check for specific follow request ID in the path
	trimmedPath := strings.TrimPrefix(r.URL.Path, "/follow-requests")
	trimmedPath = strings.Trim(trimmedPath, "/") // Extract any potential ID

	switch r.Method {
	case http.MethodPost: // Create a follow request
		handlers.CreateFollowRequest(w, r)

	case http.MethodGet:
		// Check if path is for followers or following
		if strings.HasSuffix(r.URL.Path, "/followers") {
			// Fetch followers
			handlers.GetFollowers(w, r)
		} else if strings.HasSuffix(r.URL.Path, "/following") {
			// Fetch following
			handlers.GetFollowing(w, r)
		} else if trimmedPath != "" { // Path contains an ID
			log.Printf("Fetching specific follow request with ID: %s", trimmedPath)
			handlers.GetFollowRequest(w, r, trimmedPath)
		} else { // No ID in path, process query parameters
			userID := r.URL.Query().Get("userID") // Fetch userID query parameter
			if userID != "" {
				log.Printf("Fetching follow requests for userID: %s", userID)
				handlers.GetFollowRequestsByUserID(w, r, userID)
			} else {
				http.Error(w, "userID query parameter is required to fetch follow requests", http.StatusBadRequest)
			}
		}

	case http.MethodPut: // Update a follow request
		if trimmedPath != "" {
			handlers.UpdateFollowRequest(w, r, trimmedPath)
		} else {
			http.Error(w, "ID is required to update a follow request", http.StatusBadRequest)
		}

	case http.MethodDelete: // Delete a follow request
		if trimmedPath != "" {
			handlers.DeleteFollowRequest(w, r, trimmedPath)
		} else {
			http.Error(w, "ID is required to delete a follow request", http.StatusBadRequest)
		}

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

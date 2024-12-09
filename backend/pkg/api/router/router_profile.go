package router

import (
	"Social/pkg/api/handlers"
	"net/http"
	"strings"
)

func HandleProfileRoutes(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/profile/")
	parts := strings.Split(path, "/")
	if len(parts) < 1 || parts[0] == "" {
		http.Error(w, "User ID is required", http.StatusBadRequest)
		return
	}

	userIDStr := parts[0]
	switch r.Method {
	case "GET":
		if len(parts) > 1 && parts[1] == "info" {
			handlers.GetProfileInfo(w, r, userIDStr)
		} else {
			handlers.GetProfile(w, r, userIDStr)
		}
	case "PUT":
		handlers.UpdateProfile(w, r, userIDStr)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func HandleProfileInfo(w http.ResponseWriter, r *http.Request) {
	// Extract userID from URL path
	userIDStr := strings.TrimPrefix(r.URL.Path, "/profile/")

	// Check if userID is not empty
	if userIDStr == "" {
		http.Error(w, "User ID is required", http.StatusBadRequest)
		return
	}

	// Separate the "info" part from the URL path
	parts := strings.Split(userIDStr, "/")
	if len(parts) < 1 {
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}

	userIDStr = parts[0]

	// Call handler with extracted userID
	handlers.GetProfileInfo(w, r, userIDStr)
}

package router

import (
	"Social/pkg/api/handlers"
	"net/http"
	"strconv"
	"strings"
)

// HandleGroupRoutes handles all routes related to groups
func HandleGroupRoutes(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/groups/")
	pathSegments := strings.Split(path, "/")

	switch r.Method {
	case http.MethodGet:
		handleGroupGetRequests(pathSegments, w, r)
	case http.MethodPost:
		handleGroupPostRequests(pathSegments, w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// handleGroupGetRequests processes GET requests for group-related actions
func handleGroupGetRequests(pathSegments []string, w http.ResponseWriter, r *http.Request) {
	switch len(pathSegments) {
	case 1:
		// GET /groups (list all groups)
		handlers.ListGroups(w, r)
	case 2:
		if pathSegments[1] == "members" {
			// GET /groups/{groupID}/members (fetch group members)
			handlers.GetGroupMembers(w, r)
		} else {
			http.Error(w, "Bad request: Invalid group path", http.StatusBadRequest)
		}
	default:
		http.Error(w, "Bad request: Invalid group path", http.StatusBadRequest)
	}
}

// handleGroupPostRequests processes POST requests for group-related actions
func handleGroupPostRequests(pathSegments []string, w http.ResponseWriter, r *http.Request) {
	if len(pathSegments) == 1 {
		// POST /groups (create a new group)
		handlers.CreateGroup(w, r)
	} else if len(pathSegments) == 2 {
		switch pathSegments[1] {
		case "join":
			// POST /groups/{groupID}/join
			handlers.JoinGroup(w, r)
		case "leave":
			// POST /groups/{groupID}/leave
			handlers.LeaveGroup(w, r)
		case "events":
			// POST /groups/{groupID}/events
			handlers.CreateGroupEvent(w, r)
		default:
			http.Error(w, "Bad request: Invalid action", http.StatusBadRequest)
		}
	} else if len(pathSegments) == 3 && pathSegments[2] == "rsvp" {
		// POST /groups/{groupID}/events/{eventID}/rsvp
		handlers.RSVPEvent(w, r)
	} else {
		http.Error(w, "Bad request: Invalid path", http.StatusBadRequest)
	}
}

// HandleInvitationRoutes handles routes related to invitations
func HandleInvitationRoutes(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/invitations/")
	pathSegments := strings.Split(path, "/")

	switch len(pathSegments) {
	case 1:
		if r.Method == http.MethodGet {
			// GET /invitations (list all invitations for the user)
			handlers.ListInvitations(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	case 2:
		if pathSegments[1] == "response" {
			// POST /invitations/{invitationID}/response (respond to an invitation)
			invitationID, err := strconv.Atoi(pathSegments[0])
			if err != nil {
				http.Error(w, "Invalid invitation ID", http.StatusBadRequest)
				return
			}
			handlers.RespondToInvitation(w, r, invitationID)
		} else {
			http.Error(w, "Bad request: Invalid invitation path", http.StatusBadRequest)
		}
	default:
		http.Error(w, "Bad request: Invalid invitation path", http.StatusBadRequest)
	}
}

// HandleRequestRoutes handles routes related to join requests
func HandleRequestRoutes(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/requests/")
	pathSegments := strings.Split(path, "/")

	switch len(pathSegments) {
	case 1:
		if r.Method == http.MethodGet {
			// GET /requests (list all group join requests)
			handlers.ListGroupRequests(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	case 2:
		if pathSegments[1] == "response" {
			// POST /requests/{requestID}/response (respond to a join request)
			requestID, err := strconv.Atoi(pathSegments[0])
			if err != nil {
				http.Error(w, "Invalid request ID", http.StatusBadRequest)
				return
			}
			handlers.RespondToGroupRequest(w, r, requestID)
		} else {
			http.Error(w, "Bad request: Invalid request path", http.StatusBadRequest)
		}
	default:
		http.Error(w, "Bad request: Invalid request path", http.StatusBadRequest)
	}
}

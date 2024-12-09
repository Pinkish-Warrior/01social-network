package handlers

import (
	"Social/pkg/api/middlewares"
	"Social/pkg/models"
	"Social/pkg/services"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

// CreateGroup handles POST requests to create a new group
func CreateGroup(w http.ResponseWriter, r *http.Request) {
	var group models.Group

	// Decode the request body into the Group model
	err := json.NewDecoder(r.Body).Decode(&group)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Retrieve the user ID from the session using GetSessionUserID
	userID, err := middlewares.GetSessionUserID(r)
	if err != nil {
		http.Error(w, "Failed to retrieve user from session: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// Set the creator ID for the group
	group.CreatorID = userID

	// Call the service layer to create the group in the database
	groupID, err := services.CreateGroup(group)
	if err != nil {
		http.Error(w, "Failed to create group: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with the group ID and success message
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":  "Group created successfully",
		"group_id": groupID,
	})
}

func ListGroups(w http.ResponseWriter, r *http.Request) {
	// Example debug log
	fmt.Println("Fetching list of groups...")

	groups, err := services.GetAllGroups()
	if err != nil {
		http.Error(w, "Failed to fetch groups: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if len(groups) == 0 {
		http.Error(w, "No groups found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(groups)
}

func GetGroup(w http.ResponseWriter, r *http.Request) {
	groupID, err := strconv.Atoi(strings.TrimPrefix(r.URL.Path, "/groups/"))
	if err != nil {
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		return
	}

	group, err := services.GetGroup(groupID)
	if err != nil {
		http.Error(w, "Group not found: "+err.Error(), http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(group)
}

// InviteToGroup handles POST requests to invite a user to a group
func InviteToGroup(w http.ResponseWriter, r *http.Request) {
	var invitation models.GroupInvitation
	err := json.NewDecoder(r.Body).Decode(&invitation)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.InviteToGroup(invitation)
	if err != nil {
		http.Error(w, "Failed to invite user to group: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User invited to group successfully",
	})
}

// CreateGroupRequest handles POST requests to create a group request
func CreateGroupRequest(w http.ResponseWriter, r *http.Request) {
	var request models.GroupRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.CreateGroupRequest(request)
	if err != nil {
		http.Error(w, "Failed to create group request: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Group request created successfully",
	})
}

// CreateGroupEvent handles POST requests to create a group event
func CreateGroupEvent(w http.ResponseWriter, r *http.Request) {
	var event models.GroupEvent
	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.CreateGroupEvent(event)
	if err != nil {
		http.Error(w, "Failed to create group event: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Group event created successfully",
	})
}

// RSVPEvent handles POST requests to RSVP to a group event
func RSVPEvent(w http.ResponseWriter, r *http.Request) {
	var rsvp models.EventRespond
	err := json.NewDecoder(r.Body).Decode(&rsvp)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.RSVPEvent(rsvp)
	if err != nil {
		http.Error(w, "Failed to RSVP to event: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "RSVP to event successful",
	})
}

// GetGroupEvent handles GET requests to retrieve a specific group event
func GetGroupEvent(w http.ResponseWriter, r *http.Request) {
	pathSegments := strings.Split(strings.TrimPrefix(r.URL.Path, "/groups/"), "/")
	if len(pathSegments) < 3 || pathSegments[1] != "events" {
		http.Error(w, "Invalid event request", http.StatusBadRequest)
		return
	}

	groupID, err := strconv.Atoi(pathSegments[0])
	if err != nil {
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		return
	}

	eventID, err := strconv.Atoi(pathSegments[2])
	if err != nil {
		http.Error(w, "Invalid event ID", http.StatusBadRequest)
		return
	}

	event, err := services.GetGroupEvent(groupID, eventID)
	if err != nil {
		http.Error(w, "Event not found: "+err.Error(), http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(event)
}

// JoinGroup handles POST requests to join a group
func JoinGroup(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/groups/")
	pathSegments := strings.Split(path, "/")

	if len(pathSegments) < 2 || pathSegments[1] != "join" {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	groupID, err := strconv.Atoi(pathSegments[0])
	if err != nil {
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		return
	}

	var requestBody struct {
		UserID int `json:"user_id"`
	}
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.JoinGroup(groupID, requestBody.UserID)
	if err != nil {
		http.Error(w, "Failed to join group: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Successfully joined the group",
	})
}

// LeaveGroup handles POST requests to leave a group
func LeaveGroup(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/groups/")
	pathSegments := strings.Split(path, "/")

	if len(pathSegments) < 2 || pathSegments[1] != "leave" {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	groupID, err := strconv.Atoi(pathSegments[0])
	if err != nil {
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		return
	}

	var requestBody struct {
		UserID int `json:"user_id"`
	}
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.LeaveGroup(groupID, requestBody.UserID)
	if err != nil {
		http.Error(w, "Failed to leave group: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Successfully left the group",
	})
}

// RespondToInvitation handles POST requests to respond to a group invitation
func RespondToInvitation(w http.ResponseWriter, r *http.Request, invitationID int) {
	var response struct {
		Status string `json:"status"`
	}
	err := json.NewDecoder(r.Body).Decode(&response)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.RespondToInvitation(invitationID, response.Status)
	if err != nil {
		http.Error(w, "Failed to respond to invitation: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Invitation response recorded successfully",
	})
}

// RespondToGroupRequest handles POST requests to respond to a group request
func RespondToGroupRequest(w http.ResponseWriter, r *http.Request, requestID int) {
	var response struct {
		Status string `json:"status"`
	}
	err := json.NewDecoder(r.Body).Decode(&response)
	if err != nil {
		http.Error(w, "Invalid input: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = services.RespondToGroupRequest(requestID, response.Status)
	if err != nil {
		http.Error(w, "Failed to respond to group request: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Group request response recorded successfully",
	})
}

func GetGroupMembers(w http.ResponseWriter, r *http.Request) {
	// Extract the group ID from the URL path
	pathSegments := strings.Split(r.URL.Path, "/")
	if len(pathSegments) < 3 {
		http.Error(w, "Group ID is required", http.StatusBadRequest)
		return
	}

	groupIDStr := pathSegments[2]
	log.Println("Extracted groupID:", groupIDStr)

	groupID, err := strconv.Atoi(groupIDStr)
	if err != nil {
		http.Error(w, "Invalid group ID", http.StatusBadRequest)
		log.Println("Error converting groupID to integer:", err)
		return
	}

	// Retrieve the list of members for the group
	members, err := services.GetGroupMembers(groupID)
	if err != nil {
		http.Error(w, "Failed to fetch group members", http.StatusInternalServerError)
		log.Println("Error fetching group members for groupID", groupID, ":", err)
		return
	}

	// Convert the group members to JSON and send them in the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(members); err != nil {
		http.Error(w, "Failed to encode members", http.StatusInternalServerError)
		log.Println("Error encoding members:", err)
	}
}

// ListGroupRequests handles GET requests to /requests (List group join requests)
func ListGroupRequests(w http.ResponseWriter, r *http.Request) {
	// Retrieve the list of pending group join requests
	requests, err := services.GetPendingGroupRequests()
	if err != nil {
		http.Error(w, "Failed to fetch group join requests", http.StatusInternalServerError)
		log.Println("Error fetching group join requests:", err)
		return
	}

	// Convert the requests to JSON and send them in the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(requests); err != nil {
		http.Error(w, "Failed to encode requests", http.StatusInternalServerError)
		log.Println("Error encoding requests:", err)
	}
}

// ListInvitations handles GET requests to /invitations (List all invitations for the user)
func ListInvitations(w http.ResponseWriter, r *http.Request) {
	// Retrieve the user ID from the request context (assuming you're handling user authentication)
	userID, ok := r.Context().Value("userID").(int) // Assuming user ID is stored in context after authentication
	if !ok {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
		return
	}

	// Retrieve the list of invitations for the user
	invitations, err := services.GetUserInvitations(userID)
	if err != nil {
		http.Error(w, "Failed to fetch invitations", http.StatusInternalServerError)
		log.Println("Error fetching invitations:", err)
		return
	}

	// Convert the invitations to JSON and send them in the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(invitations); err != nil {
		http.Error(w, "Failed to encode invitations", http.StatusInternalServerError)
		log.Println("Error encoding invitations:", err)
	}
}

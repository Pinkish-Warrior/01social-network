import apiClient from "./apiClient";

// Define types for API responses and request data
interface Group {
  id: string;
  name: string;
  description: string;
  [key: string]: any; // Additional fields can be added as needed
}

interface Member {
  id: string;
  name: string;
  role: string;
  [key: string]: any;
}

interface Invitation {
  id: string;
  groupId: string;
  inviterId: string;
  [key: string]: any;
}

interface JoinRequest {
  id: string;
  groupId: string;
  requesterId: string;
  [key: string]: any;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  [key: string]: any;
}

interface CreateGroupData {
  name: string;
  description: string;
  [key: string]: any;
}

interface CreateEventData {
  title: string;
  description: string;
  date: string;
  [key: string]: any;
}

// Fetch all groups
export const getAllGroups = async (): Promise<Group[]> => {
  try {
    const response = await apiClient.get(`/groups`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("No groups found");
  }
};

// Join a group
export const joinGroup = async (groupId: string): Promise<void> => {
  try {
    const response = await apiClient.post(`/groups/${groupId}/join`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error joining group:", error);
    throw new Error("Failed to join the group");
  }
};

// Leave a group
export const leaveGroup = async (groupId: string): Promise<void> => {
  try {
    const response = await apiClient.post(`/groups/${groupId}/leave`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw new Error("Failed to leave the group");
  }
};

// Handle invitations
export const fetchUserInvitations = async (): Promise<Invitation[]> => {
  try {
    const response = await apiClient.get("/invitations", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching invitations:", error);
    throw new Error("Failed to fetch invitations");
  }
};

export const respondToInvitation = async (invitationId: string, responseValue: string): Promise<void> => {
  try {
    const response = await apiClient.post(`/invitations/${invitationId}/response`, {
      response: responseValue,
    });
    return response.data;
  } catch (error) {
    console.error("Error responding to invitation:", error);
    throw new Error("Failed to respond to the invitation");
  }
};

// Handle join requests
export const respondToJoinRequest = async (requestId: string, responseValue: string): Promise<void> => {
  try {
    const response = await apiClient.post(`/requests/${requestId}/response`, {
      response: responseValue,
    });
    return response.data;
  } catch (error) {
    console.error("Error responding to join request:", error);
    throw new Error("Failed to respond to join request");
  }
};

// Create an event
export const createEvent = async (groupId: string, eventData: CreateEventData): Promise<Event> => {
  try {
    const response = await apiClient.post(`/groups/${groupId}/events`, eventData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

// RSVP to an event
export const rsvpToEvent = async (groupId: string, eventId: string, rsvpStatus: string): Promise<void> => {
  try {
    const response = await apiClient.post(`/groups/${groupId}/events/${eventId}/rsvp`, { rsvpStatus }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error RSVPing to event:", error);
    throw new Error("Failed to RSVP to event");
  }
};

// Create a group
export const createGroup = async (groupData: CreateGroupData): Promise<Group> => {
  console.log("Sending POST request to create group with data:", groupData); // Debugging log
  try {
    const response = await apiClient.post("/groups/", groupData, { withCredentials: true });
    console.log("POST request successful:", response.data); // Debugging log
    return response.data;
  } catch (error: any) {
    console.error("Error in POST request:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch group details
export const getGroupDetails = async (groupId: string): Promise<Group> => {
  try {
    const response = await apiClient.get(`/groups/${groupId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching group details:", error);
    throw new Error("Failed to fetch group details");
  }
};

// Fetch group members
export const getGroupMembers = async (groupId: string): Promise<Member[]> => {
  try {
    const response = await apiClient.get(`/groups/${groupId}/members`,{ withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching group members:", error);
    throw new Error("Failed to fetch group members");
  }
};

// Fetch join requests
export const getJoinRequests = async (): Promise<JoinRequest[]> => {
  try {
    const response = await apiClient.get('/groups/join-requests',{ withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching join requests:", error);
    throw new Error("Failed to fetch join requests");
  }
};

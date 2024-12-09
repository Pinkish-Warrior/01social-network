import apiClient from './apiClient';
import axios from 'axios';

interface User {
  id: string;
  [key: string]: any; // Extendable user properties
}

interface Group {
  id: string;
  name: string;
  description: string;
  [key: string]: any; // Extendable group properties
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  [key: string]: any; // Extendable event properties
}

// Login service
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.user; // Assuming the user data is in response.data.user
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Register service
export const register = async (userData: Record<string, any>): Promise<any> => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw new Error('Registration failed');
  }
};

// Logout service
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error: any) {
    throw new Error('Logout failed');
  }
};

export const checkAuthStatus = async (): Promise<string> => {
  try {
    const res = await axios.get("http://localhost:8000/status", {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res.data.userID; // Assuming the server returns the user ID
    } else {
      throw new Error("Unauthorized. Please log in.");
    }
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to check auth status');
  }
};

// Group services
export const getAllGroups = async (): Promise<Group[]> => {
  try {
    const response = await apiClient.get('/groups', { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error('No groups found');
  }
};

export const getGroupDetails = async (groupId: string): Promise<Group> => {
  try {
    const response = await apiClient.get(`/groups/${groupId}`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error('Group details not found');
  }
};

export const getGroupMembers = async (groupId: string): Promise<User[]> => {
  try {
    const response = await apiClient.get(`/groups/${groupId}/members`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error('Error fetching group members');
  }
};

// Group membership actions
export const joinGroup = async (groupId: string): Promise<any> => {
  const response = await apiClient.post(`/groups/${groupId}/join`, {}, { withCredentials: true });
  return response.data;
};

export const leaveGroup = async (groupId: string): Promise<any> => {
  const response = await apiClient.post(`/groups/${groupId}/leave`, {}, { withCredentials: true });
  return response.data;
};

// Invitations
export const getUserInvitations = async (): Promise<any[]> => {
  const response = await apiClient.get('/invitations', { withCredentials: true });
  return response.data;
};

export const respondToInvitation = async (invitationId: string, responseValue: string): Promise<any> => {
  const response = await apiClient.post(`/invitations/${invitationId}/response`, { response: responseValue });
  return response.data;
};

// Join requests
export const getJoinRequests = async (): Promise<any[]> => {
  const response = await apiClient.get('/requests', { withCredentials: true });
  return response.data;
};

export const respondToJoinRequest = async (requestId: string, responseValue: string): Promise<any> => {
  const response = await apiClient.post(`/requests/${requestId}/response`, { response: responseValue });
  return response.data;
};

// Event services
export const createEvent = async (groupId: string, eventData: Event): Promise<Event> => {
  const response = await apiClient.post(`/groups/${groupId}/events`, eventData, { withCredentials: true });
  return response.data;
};

export const rsvpToEvent = async (groupId: string, eventId: string, rsvpStatus: string): Promise<any> => {
  const response = await apiClient.post(`/groups/${groupId}/events/${eventId}/rsvp`, { rsvpStatus }, { withCredentials: true });
  return response.data;
};

// Group creation
export const createGroup = async (groupData: Group): Promise<Group> => {
  try {
    const response = await apiClient.post('/groups/', groupData, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Error creating group');
  }
};

// Define the interface for group invitations
export interface GroupInvitation {
  id: number;
  group_id: number;
  name:string;
  inviter_id: number;
  inviter_username: string;
  invitee_id: number;
  cover_image: string;
  status: "pending" | "accepted" | "declined";
  sent_at: string;
}

const randomImgUrl = "https://picsum.photos/400/265";

// Example fake data for group invitations
export const fakeGroupInvitations: GroupInvitation[] = [
  {
    id: 1,
    group_id: 2,
    name: "Backend Engineers",
    inviter_id: 1,
    inviter_username: "Loki Smith",
    invitee_id: 10,
    cover_image: "",
    status: "pending",
    sent_at: "2024-09-01T10:00:00Z",
  },
  
  {
    id: 2,
    group_id: 4,
    name: "AI and Machine Learning",
    inviter_id: 2,
    inviter_username: "Darcy Smith",
    invitee_id: 10,
    cover_image:  randomImgUrl,
    status: "pending",
    sent_at: "2024-09-02T11:30:00Z",
  },
  {
    id: 3,
    group_id: 6,
    name: "Data Science Innovators",
    inviter_id: 3,
    inviter_username: "Jorddan Smith",
    invitee_id: 124,
    cover_image:  randomImgUrl,
    status: "accepted",
    sent_at: "2024-08-30T14:00:00Z",
  },
  {
    id: 4,
    group_id: 7,
    name: "Game Development",
    inviter_id: 4,
    inviter_username: "Jokob Smith",
    invitee_id: 125,
    cover_image:  randomImgUrl,
    status: "declined",
    sent_at: "2024-08-29T16:45:00Z",
  },
  {
    id: 5,
    group_id: 8,
    name: "Web Design & UX",
    inviter_id: 5,
    inviter_username: "Joe Smith",
    invitee_id: 10,
    cover_image:  randomImgUrl,
    status: "pending",
    sent_at: "2024-09-03T09:00:00Z",
  },
];

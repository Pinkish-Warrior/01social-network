export interface upComingEvent {
  id: number,
  title: string,
  description: string,
  group_id:number,
  user_id:number,
  status: 'pending' | 'attend' | 'not_attend';
  creator_id:number,
  location:string,
  event_date:Date,
  created_at:Date,
  updated_at:Date,
}


// Mock data for upcoming events
export const fakeUpComingEvents : upComingEvent[]=[
  {
    id: 1,
    title: "Annual Tech Conference",
    description: "Join us for the biggest tech event of the year.",
    group_id: 101,
    user_id: 10,
    status: "attend",
    creator_id: 1,
    location: "San Francisco, CA",
    event_date: new Date("2024-09-20T10:00:00"), 
    created_at: new Date("2024-08-01T12:00:00"),
    updated_at: new Date("2024-08-10T15:00:00"),
  },
  {
    id: 2,
    title: "Community Meetup",
    description: "Network with local developers and entrepreneurs.",
    group_id: 102,
    user_id: 202,
    status: "pending",
    creator_id: 2,
    location: "Austin, TX",
    event_date: new Date("2024-08-25T17:30:00"),
    created_at: new Date("2024-07-15T09:30:00"),
    updated_at: new Date("2024-07-20T10:45:00"),
  },
  {
    id: 3,
    title: "Workshop: Intro to React",
    description: "Learn the basics of React in this hands-on workshop.",
    group_id: 4,
    user_id: 10,
    status: "attend",
    creator_id: 3,
    location: "Online",
    event_date: new Date("2024-09-10T16:00:00"), 
    created_at: new Date("2024-08-20T11:00:00"),
    updated_at: new Date("2024-08-25T13:30:00"),
  },
  {
    id: 4,
    title: "Hackathon 2024",
    description: "48 hours of coding, collaboration, and creativity.",
    group_id: 2,
    user_id: 10,
    status: "not_attend",
    creator_id: 4,
    location: "New York, NY",
    event_date: new Date("2024-10-05T09:00:00"), 
    created_at: new Date("2024-09-01T07:45:00"),
    updated_at: new Date("2024-09-10T08:30:00"),
  },
  {
    id: 5,
    title: "Blockchain Summit",
    description: "Deep dive into blockchain technologies and applications.",
    group_id: 2,
    user_id: 10,
    status: "attend",
    creator_id: 5,
    location: "London, UK",
    event_date: new Date("2024-11-15T11:00:00"), 
    created_at: new Date("2024-09-30T14:00:00"),
    updated_at: new Date("2024-10-05T15:30:00"),
  },
  {
    id: 6,
    title: "Virtual Reality Expo",
    description: "Explore the latest advancements in virtual reality technology.",
    group_id: 103,
    user_id: 10,
    status: "attend",
    creator_id: 6,
    location: "San Jose, CA",
    event_date: new Date("2024-10-10T09:00:00"),
    created_at: new Date("2024-09-05T08:00:00"),
    updated_at: new Date("2024-09-10T09:30:00"),
  },
  {
    id: 7,
    title: "AI & Machine Learning Workshop",
    description: "An in-depth workshop on artificial intelligence and machine learning techniques.",
    group_id: 104,
    user_id: 10,
    status: "attend",
    creator_id: 7,
    location: "Boston, MA",
    event_date: new Date("2024-09-25T14:00:00"),
    created_at: new Date("2024-08-30T10:00:00"),
    updated_at: new Date("2024-09-01T11:00:00"),
  },
  {
    id: 8,
    title: "Cybersecurity Bootcamp",
    description: "A bootcamp focusing on the essentials of cybersecurity and threat prevention.",
    group_id: 105,
    user_id: 17,
    status: "pending",
    creator_id: 8,
    location: "Chicago, IL",
    event_date: new Date("2024-11-01T13:00:00"),
    created_at: new Date("2024-09-20T12:00:00"),
    updated_at: new Date("2024-09-25T14:30:00"),
  },
  {
    id: 9,
    title: "Design Thinking Workshop",
    description: "A workshop on design thinking methodologies and practical applications.",
    group_id: 106,
    user_id: 10,
    status: "attend",
    creator_id: 9,
    location: "Seattle, WA",
    event_date: new Date("2024-10-15T11:30:00"),
    created_at: new Date("2024-09-10T09:00:00"),
    updated_at: new Date("2024-09-12T10:15:00"),
  },
  {
    id: 10,
    title: "Startup Pitch Event",
    description: "Watch startups pitch their innovative ideas to potential investors.",
    group_id: 107,
    user_id: 21,
    status: "not_attend",
    creator_id: 10,
    location: "Los Angeles, CA",
    event_date: new Date("2024-12-01T18:00:00"),
    created_at: new Date("2024-10-05T14:00:00"),
    updated_at: new Date("2024-10-10T15:00:00"),
  },
];

// Function to format date
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/* // Convert UK date format (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
export const ukToIsoDate = (date: string): string => {
  const [day, month, year] = date.split('/').map(Number);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

// Convert ISO date format (YYYY-MM-DD) to UK date format (DD/MM/YYYY)
export const isoToUkDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}; */

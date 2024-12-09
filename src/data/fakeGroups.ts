export interface Group {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  creator_id: number;
  imageUrl: string;
  members: string[];
}


const randomImgUrl = "https://picsum.photos/400/265";

export const fakeGroups: Group[] = [
  {
    id: 1,
    title: "Frontend Developers",
    description:
      "A vibrant community of frontend developers who share best practices, resources, and experiences. Whether you're into React, Vue, Angular, or just CSS and JavaScript, this is the place to discuss and collaborate.",
    created_at: "2023-01-01T12:00:00Z",
    updated_at: "2023-08-01T12:00:00Z",
    creator_id: 1,
    imageUrl: "",
    members: ["Evan Lee", "rinrino",  "Loki Smith","Jakob Smith"],
  },
  {
    id: 2,
    title: "Backend Engineers",
    description:
      "Join a collective of backend engineers who dive into the depths of server-side technology. From discussions on Node.js and Python to best practices in database management and API design, this group covers it all.",
    created_at: "2023-02-01T12:00:00Z",
    updated_at: "2023-07-01T12:00:00Z",
    creator_id: 2,
    imageUrl: randomImgUrl,
    members: ["Diana Ross", "Evan Lee",  "Loki Smith","Alice Johnson"],
  },
  {
    id: 3,
    title: "Tech Lovers",
    description:
      "A diverse community of tech enthusiasts who are passionate about all things technology. Whether it's the latest gadgets, emerging tech trends, or discussions about future innovations, you'll find it here.",
    created_at: "2023-03-01T12:00:00Z",
    updated_at: "2023-08-01T12:00:00Z",
    creator_id: 3,
    imageUrl: randomImgUrl,
    members: ["Alice Johnson", "Bob Smith", "Charlie Davis"],
  },
  {
    id: 4,
    title: "AI and Machine Learning",
    description:
      "Explore the fascinating world of AI and machine learning with experts and enthusiasts. This group covers everything from the basics of machine learning to advanced AI algorithms and their applications in real-world scenarios.",
    created_at: "2023-04-01T12:00:00Z",
    updated_at: "2023-08-15T12:00:00Z",
    creator_id: 4,
    imageUrl: randomImgUrl,
    members: [
      "Alice Johnson",
      "Henry King",
      "Loki Smith",
      "Darcy Smith",
      "Isabella Thomas",
      "rinrino",
    ],
  },
  {
    id: 5,
    title: "Cybersecurity Experts",
    description:
      "A group dedicated to discussing and sharing knowledge about cybersecurity threats, solutions, and best practices. Perfect for professionals and hobbyists alike who are interested in securing systems and data.",
    created_at: "2023-05-01T12:00:00Z",
    updated_at: "2023-07-30T12:00:00Z",
    creator_id: 5,
    imageUrl: "",
    members: ["Charlie Davis", "Jack Wilson", "Loki Smith", "Khalid"],
  },
  {
    id: 6,
    title: "Data Science Innovators",
    description:
      "Connect with data scientists and analysts who are pushing the boundaries of data science. Discuss methodologies, tools, and case studies, and collaborate on innovative data-driven projects.",
    created_at: "2023-06-01T12:00:00Z",
    updated_at: "2023-08-10T12:00:00Z",
    creator_id: 6,
    imageUrl: randomImgUrl,
    members: ["rinrino", "Katherine Young", "Linda Adams", "Loki Smith"],
  },
  {
    id: 7,
    title: "Game Development",
    description:
      "Join a community of game developers to share tips, collaborate on projects, and discuss the latest trends in game development. From indie game creation to major studio productions, all levels of experience are welcome.",
    created_at: "2023-07-01T12:00:00Z",
    updated_at: "2023-08-20T12:00:00Z",
    creator_id: 7,
    imageUrl: randomImgUrl,
    members: [
      "Jack Wilson",
      "Olivia Harris",
      "Katherine Young",
      "Loki Smith",
    ],
  },
  {
    id: 8,
    title: "Web Design & UX",
    description:
      "A group for designers and UX professionals to discuss and share insights about web design, user experience, and user interface design. Exchange ideas, review design trends, and get feedback on your projects.",
    created_at: "2023-08-01T12:00:00Z",
    updated_at: "2023-08-25T12:00:00Z",
    creator_id: 8,
    imageUrl: randomImgUrl,
    members: ["Jack Wilson", "rinrino"],
  },
];

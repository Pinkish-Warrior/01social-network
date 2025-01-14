package models

import "time"

const (
	// Privacy levels for posts
	PrivacyPublic        = "public"
	PrivacyPrivate       = "private"
	PrivacyAlmostPrivate = "almost_private"

	// Follow request statuses
	FollowRequestPending  = "pending"
	FollowRequestAccepted = "accepted"
	FollowRequestRejected = "rejected"

	// Group invitation statuses
	GroupInvitationPending  = "pending"
	GroupInvitationAccepted = "accepted"
	GroupInvitationRejected = "rejected"
)

type User struct {
	ID          int       `json:"id"`
	Email       string    `json:"email"`
	Password    string    `json:"-"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	DateOfBirth string    `json:"date_of_birth"`
	Avatar      string    `json:"avatar"`
	Nickname    string    `json:"nickname"`
	AboutMe     string    `json:"about_me"`
	IsPrivate   bool      `json:"is_private"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type RegisterRequest struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	DateOfBirth string `json:"date_of_birth"`
	Avatar      string `json:"avatar,omitempty"`
	Nickname    string `json:"nickname,omitempty"`
	AboutMe     string `json:"about_me,omitempty"`
	IsPrivate   bool   `json:"is_private"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Post struct {
	ID        int       `json:"id"`
	UserID    *int      `json:"user_id,omitempty"`  // Nullable for group posts
	GroupID   *int      `json:"group_id,omitempty"` // Nullable for user posts
	Content   string    `json:"content"`
	Image     string    `json:"image,omitempty"`
	Privacy   string    `json:"privacy"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Comments  []Comment `json:"comments,omitempty"`
	Likes     int       `json:"likes"`
}

// Like represents a like on a post
type Like struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	PostID    int       `json:"post_id"`
	CreatedAt time.Time `json:"created_at"`
}

// Comment represents a comment on a post
type Comment struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	PostID    int       `json:"post_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// FollowRequest represents a follow request between users
type FollowRequest struct {
	ID          int       `json:"id"`
	SenderID    int       `json:"sender_id"`
	RecipientID int       `json:"recipient_id"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

type Group struct {
	ID          int       `json:"id"`
	CreatorID   int       `json:"creator_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type GroupMembership struct {
	UserID   int        `json:"user_id"`
	GroupID  int        `json:"group_id"`
	JoinedAt time.Time  `json:"joined_at"`
	LeftAt   *time.Time `json:"left_at,omitempty"`
}

type GroupInvitation struct {
	ID          int        `json:"id"`
	GroupID     int        `json:"group_id"`
	InviterID   int        `json:"inviter_id"`
	InviteeID   int        `json:"invitee_id"`
	Status      string     `json:"status"`
	InvitedAt   time.Time  `json:"invited_at"`
	RespondedAt *time.Time `json:"responded_at,omitempty"`
}

type GroupRequest struct {
	ID          int       `json:"id"`
	GroupID     int       `json:"group_id"`
	RequesterID int       `json:"requester_id"`
	Status      string    `json:"status"` // pending, accepted, rejected
	RequestedAt time.Time `json:"requested_at"`
	RespondedAt time.Time `json:"responded_at,omitempty"`
}

type GroupEvent struct {
	ID          int       `json:"id"`
	GroupID     int       `json:"group_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	DayTime     time.Time `json:"day_time"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type EventRespond struct {
	ID          int       `json:"id"`
	EventID     int       `json:"event_id"`
	UserID      int       `json:"user_id"`
	Status      string    `json:"status"` // going, not going
	RespondedAt time.Time `json:"responded_at"`
}

type Chat struct {
	ID          int       `json:"id"`
	SenderID    int       `json:"senderID"`
	RecipientID int       `json:"recipientID"`
	GroupID     int       `json:"groupID,omitempty"`
	Message     string    `json:"message"`
	IsGroup     bool      `json:"isGroup"`
	CreatedAt   time.Time `json:"createdAt"`
}

// Notification represents a notification for a user
type Notification struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	Type      string    `json:"type"`
	Message   string    `json:"message"`
	IsRead    bool      `json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
	Details   string    `json:"details"`
}

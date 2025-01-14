package api

import (
	"Social/pkg/api/handlers"
	"Social/pkg/api/middlewares"
	"Social/pkg/api/router"
	"net/http"
)

func InitializeRoutes(mux *http.ServeMux) {
	// Authentication Routes
	mux.Handle("/register", http.HandlerFunc(handlers.Register))
	mux.Handle("/login", http.HandlerFunc(handlers.Login))
	mux.Handle("/logout", http.HandlerFunc(handlers.Logout))
	mux.Handle("/status", http.HandlerFunc(middlewares.CheckAuthStatus))

	// Social Media Authentication Routes (Google, Facebook, GitHub)
	mux.Handle("/auth/google/login", http.HandlerFunc(handlers.GoogleLogin))
	mux.Handle("/auth/google/callback", http.HandlerFunc(handlers.GoogleCallback))

	mux.Handle("/auth/facebook/login", http.HandlerFunc(handlers.FacebookLogin))
	mux.Handle("/auth/facebook/callback", http.HandlerFunc(handlers.FacebookCallback))

	mux.Handle("/auth/github/login", http.HandlerFunc(handlers.GitHubLogin))
	mux.Handle("/auth/github/callback", http.HandlerFunc(handlers.GitHubCallback))

	// Profile Routes
	mux.Handle("/profile/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleProfileRoutes)))
	mux.Handle("/profile/{id}/info", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleProfileInfo)))

	// Post Routes
	mux.Handle("/post/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandlePostRoutes)))

	// Like/Dislike Routes
	mux.Handle("/posts/like", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleLikeDislikeRoutes)))
	mux.Handle("/posts/dislike", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleLikeDislikeRoutes)))

	// Comment Routes
	mux.Handle("/comments/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleCommentRoutes)))
	mux.Handle("/posts/{postID}/comments/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleCommentRoutes)))

	// Group Routes
	mux.Handle("/groups/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleGroupRoutes)))
	mux.Handle("/invitations/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleInvitationRoutes)))
	mux.Handle("/requests/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleRequestRoutes)))

	// Chat Routes
	mux.Handle("/chats/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleChatRoutes)))

	// Notification Routes
	mux.Handle("/notifications", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleNotificationRoutes)))

	// Follow Request Routes
	mux.Handle("/follow-requests", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleFollowRequestRoutes)))
	mux.Handle("/follow-requests/", middlewares.SessionAuthMiddleware(http.HandlerFunc(router.HandleFollowRequestRoutes)))
	mux.Handle("/follow-requests/accept", middlewares.SessionAuthMiddleware(http.HandlerFunc(handlers.AcceptFollowRequest)))
	mux.Handle("/follow-requests/reject", middlewares.SessionAuthMiddleware(http.HandlerFunc(handlers.RejectFollowRequest)))
	mux.Handle("/users/{userID}/followers", middlewares.SessionAuthMiddleware(http.HandlerFunc(handlers.GetFollowers)))
	mux.Handle("/users/{userID}/following", middlewares.SessionAuthMiddleware(http.HandlerFunc(handlers.GetFollowing)))

	// Default route for unsupported paths
	mux.Handle("/", http.NotFoundHandler())
}

package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func SessionAuthMiddleware(next http.Handler) http.Handler {
	fmt.Println("SessionAuthMiddleware got called")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Cookies:", r.Cookies())

		cookie, err := r.Cookie("session_id")
		if err != nil {
			fmt.Println("Error retrieving cookie:", err)
			http.Error(w, "Missing session ID", http.StatusUnauthorized)
			return
		}

		fmt.Println("Retrieved session ID:", cookie.Value)

		// Use custom RetrieveSession function
		userID, err := RetrieveSession(cookie.Value)
		if err != nil {
			fmt.Println("Error retrieving session:", err)
			http.Error(w, "Invalid or expired session", http.StatusUnauthorized)
			return
		}

		ctx := r.Context()
		ctx = context.WithValue(ctx, "userID", userID)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}

// SetSessionCookie sets the session ID in a cookie
func SetSessionCookie(w http.ResponseWriter, sessionID string) {
	fmt.Println("set cookie got called ")
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   false,                // Change to true for production
		SameSite: http.SameSiteLaxMode, // Or StrictMode
		Path:     "/",
	})

	fmt.Println("Setting cookie:", sessionID)
}

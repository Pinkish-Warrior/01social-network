package middlewares

import (
	"Social/pkg/db"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// GenerateSessionID generates a new session ID
func GenerateSessionID(userID int) (string, error) {
	sessionID := generateRandomString(32)
	expiresAt := time.Now().Add(24 * time.Hour) // Sessions expire after 24 hours

	_, err := db.DB.Exec("INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)", sessionID, userID, expiresAt)
	if err != nil {
		return "", err
	}

	return sessionID, nil
}

func GetSessionUserID(r *http.Request) (int, error) {
	cookie, err := r.Cookie("session_id")
	if err != nil {
		if err == http.ErrNoCookie {
			log.Println("No session cookie found")
			return 0, fmt.Errorf("no session cookie found: %w", err)
		}
		log.Printf("Error retrieving session cookie: %v", err)
		return 0, fmt.Errorf("error retrieving session cookie: %w", err)
	}

	userID, err := RetrieveSession(cookie.Value)
	if err != nil {
		log.Printf("Failed to retrieve session for session ID %s: %v", cookie.Value, err)
		return 0, fmt.Errorf("invalid or expired session: %w", err)
	}

	log.Printf("Successfully retrieved userID %d from session", userID)
	return userID, nil
}

func RetrieveSession(sessionID string) (int, error) {
	var userID int
	var expiresAt time.Time

	fmt.Println("Retrieving session for sessionID:", sessionID)

	err := db.DB.QueryRow("SELECT user_id, expires_at FROM sessions WHERE session_id = ?", sessionID).Scan(&userID, &expiresAt)
	if err != nil {
		log.Printf("RetrieveSession error: %v", err)
		return 0, err
	}

	if time.Now().After(expiresAt) {
		log.Println("Session expired")
		return 0, sql.ErrNoRows
	}

	log.Printf("Session valid for userID: %d", userID)
	return userID, nil
}

// DeleteSession deletes a session by session ID
func DeleteSession(sessionID string) error {
	_, err := db.DB.Exec("DELETE FROM sessions WHERE session_id = ?", sessionID)
	return err
}

// generateRandomString generates a random string of the given length
func generateRandomString(length int) string {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return ""
	}
	return hex.EncodeToString(bytes)
}

// ClearSessionCookie clears the session cookie
func ClearSessionCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
		Secure:   false, // Set to true for production with HTTPS
		SameSite: http.SameSiteStrictMode,
	})
}

func CheckAuthStatus(w http.ResponseWriter, r *http.Request) {
	log.Printf("Request Headers: %+v", r.Header) // Log headers to inspect the cookie
	userID, err := GetSessionUserID(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]int{"userID": userID})
}

package middlewares

import (
	"net/http"
)

// EnableCORS middleware to handle cross-origin requests
func EnableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// List of allowed origins
		allowedOrigins := map[string]bool{
			"http://localhost:3000": true, // Frontend URL (Next.js)
		}

		origin := r.Header.Get("Origin")
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		} else {
			w.Header().Set("Access-Control-Allow-Origin", "")
		}

		// Setting CORS headers
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Allow-Credentials", "true") // Allow cookies/auth headers
		w.Header().Set("Access-Control-Expose-Headers", "Set-Cookie")

		// Handle preflight OPTIONS request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Allow CORS for image requests in /uploads
		if r.URL.Path == "/uploads/" || (len(r.URL.Path) > 8 && r.URL.Path[:8] == "/uploads") {
			if allowedOrigins[origin] {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			}
		}

		// Pass the request to the next handler
		next.ServeHTTP(w, r)
	})
}

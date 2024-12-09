package services

import (
	"Social/pkg/db"
	"Social/pkg/models"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
)

var (
	// Define custom errors for better error handling
	ErrEmailInUse         = errors.New("email already in use")
	ErrUserNotFound       = errors.New("user not found")
	ErrInvalidCredentials = errors.New("invalid credentials")
)

// RegisterUser creates a new user in the database
func RegisterUser(user models.RegisterRequest) error {
	tx, err := db.DB.Begin()
	if err != nil {
		return fmt.Errorf("could not start transaction: %w", err)
	}
	defer tx.Rollback()

	// Check if email is already in use
	var existingUser models.User
	err = tx.QueryRow("SELECT id FROM users WHERE email = ?", user.Email).Scan(&existingUser.ID)
	if err == nil {
		return ErrEmailInUse
	} else if err != sql.ErrNoRows {
		return fmt.Errorf("error checking for existing user: %w", err)
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	// Parse date of birth
	dateOfBirth, err := time.Parse("2006-01-02", user.DateOfBirth)
	if err != nil {
		return fmt.Errorf("invalid date of birth format: %w", err)
	}

	// Insert the new user
	_, err = tx.Exec(`INSERT INTO users (email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me,is_private ,created_at, updated_at) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		user.Email,
		hashedPassword,
		user.FirstName,
		user.LastName,
		dateOfBirth,
		user.Avatar,
		user.Nickname,
		user.AboutMe,
		user.IsPrivate,
		time.Now(),
		time.Now(),
	)
	if err != nil {
		return fmt.Errorf("failed to register user: %w", err)
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

// GetUserByID retrieves a user from the database by ID
func GetUserByID(userID interface{}) (models.User, error) {
	var user models.User
	query := "SELECT id, email, first_name, last_name FROM users WHERE id = ?"

	// Querying the database using the user ID
	row := db.DB.QueryRow(query, userID)

	// Scan the result into the user struct
	err := row.Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName)
	if err != nil {
		if err == sql.ErrNoRows {
			return user, fmt.Errorf("user not found")
		}
		return user, fmt.Errorf("error retrieving user: %w", err)
	}

	return user, nil
}

// AuthenticateUser verifies user credentials
func AuthenticateUser(email, password string) (models.User, error) {
	var user models.User

	// Retrieve user by email
	row := db.DB.QueryRow("SELECT id, email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me,is_private ,created_at, updated_at FROM users WHERE email = ?", email)
	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.Password,
		&user.FirstName,
		&user.LastName,
		&user.DateOfBirth,
		&user.Avatar,
		&user.Nickname,
		&user.AboutMe,
		&user.IsPrivate,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return user, ErrUserNotFound
		}
		return user, fmt.Errorf("error retrieving user: %w", err)
	}

	// Compare hashed password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return user, ErrInvalidCredentials
	}

	return user, nil
}

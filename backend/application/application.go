package application

import (
	"errors"
	"net/http"
	"time"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/labstack/echo/v4"
)

type AwsAdminApp interface {
	SetSession(*session.Session) (id string, e error)
	GetSessionFromStore(uuid *string) (s *session.Session, e error)
	DeleteSession(uuid *string) error
	GetConfig() *model.Config
	SetCookie(c interface{}, name string, value string)
	GetCookie(c interface{}, name string) (string, error)
	DeleteCookie(c interface{}, name string)
	SetSessionCookie(c interface{}, name string, value string)
	SetSessionContext(c interface{}, s *session.Session)
	GetCookies() *map[string]*session.Session
}

type App struct {
	Config  *model.Config
	Cookies *map[string]*session.Session
}

func (app *App) SetSession(session *session.Session) (id string, e error) {
	(*app.Cookies)[session.ID] = session
	return session.ID, nil
}
func (app *App) GetSessionFromStore(uuid *string) (s *session.Session, e error) {
	if val, ok := (*app.Cookies)[*uuid]; ok {
		return val, nil
	}
	return nil, nil
}
func (app *App) DeleteSession(uuid *string) error {
	delete((*app.Cookies), *uuid)
	return nil
}
func (app *App) SetCookie(c interface{}, name string, value string) {
	cookie := new(http.Cookie)
	cookie.Name = name
	cookie.Value = value
	cookie.HttpOnly = true
	cookie.Path = "/"
	c.(echo.Context).SetCookie(cookie)
}
func (app *App) GetCookie(c interface{}, name string) (string, error) {
	cookie, err := c.(echo.Context).Cookie(name)
	if err != nil {
		return "", err
	}
	if val, ok := (*app.Cookies)[cookie.Value]; ok {
		return val.ID, nil
	}
	return "", errors.New("cookie not found in store")
}
func (app *App) DeleteCookie(c interface{}, name string) {
	cookie, err := c.(echo.Context).Cookie(name)
	if err != nil {
		return
	}
	cookie.Value = ""
	cookie.Expires = time.Unix(0, 0)
	cookie.HttpOnly = true
	c.(echo.Context).SetCookie(cookie)

}
func (app *App) SetSessionCookie(c interface{}, name string, value string) {
	cookie := new(http.Cookie)
	cookie.Name = name
	cookie.Value = value
	cookie.Expires = time.Now().Add(1 * time.Hour)
	cookie.HttpOnly = true
	cookie.Path = "/"
	c.(echo.Context).SetCookie(cookie)
}
func (app *App) SetSessionContext(c interface{}, s *session.Session) {
	c.(echo.Context).Set("session", s)
}
func (app *App) GetConfig() *model.Config {
	return app.Config
}
func (app *App) GetCookies() *map[string]*session.Session {
	return app.Cookies
}

package api

import (
	"fmt"
	"log"
	"net/http"

	awsMiddleware "github.com/bertrandmartel/aws-admin/backend/middleware"
	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/labstack/echo/v4"
)

func SetConfiguration(c echo.Context) (err error) {
	s := c.Get("session").(*session.Session)
	r := new(model.SetConfigurationInput)
	if err = c.Bind(r); err != nil {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no region specified",
		})
	}
	log.Println(r)
	updated := false
	if s.Region != r.Region {
		log.Println(fmt.Sprintf("switching to region %v", r.Region))
		s.Region = r.Region
		updated = true
	}
	if r.Credentials.CredentialType != s.Credentials.CredentialType {
		log.Println("credential type changed")
		updated = true
	}
	log.Println(r.Credentials.CredentialType)
	switch r.Credentials.CredentialType {
	case session.SharedCred:
		{
			if s.Credentials.SharedCredentials.Profile != r.Credentials.SharedCredentials.Profile {
				updated = true
			}
			s.Credentials = r.Credentials
		}
	case session.StaticCred:
		{
			if s.Credentials.StaticCredentials.AccessID != r.Credentials.StaticCredentials.AccessID {
				updated = true
			}
			if s.Credentials.StaticCredentials.SecretAccessKey != r.Credentials.StaticCredentials.SecretAccessKey {
				updated = true
			}
			if s.Credentials.StaticCredentials.SessionToken != r.Credentials.StaticCredentials.SessionToken {
				updated = true
			}
			s.Credentials = r.Credentials
		}
	case session.FileCred:
		{
			s.Credentials.CredentialType = session.FileCred
			if s.Credentials.FileCredentials.FilePath != r.Credentials.FileCredentials.FilePath {
				s.Credentials.FileCredentials.FilePath = r.Credentials.FileCredentials.FilePath
				updated = true
			}
		}
	}
	if updated {
		awsMiddleware.ReconfigureSession(s)
	}
	return c.JSON(http.StatusOK, &model.SetConfigurationOutput{
		Updated: updated,
	})
}

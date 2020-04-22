package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetSecrets(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetSecrets(s.SecretsManager)
	return utils.ProcessResult(result, err, c)
}

func GetSecretValue(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	arn := c.QueryParam("arn")
	if arn == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no arn specified",
		})
	}
	result, err := services.GetSecretValue(s.SecretsManager, arn)
	return utils.ProcessResult(result, err, c)
}

func CreateSecret(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.FormValue("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "name is required"))
	}
	value := c.FormValue("value")
	if value == "" {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "value is required"))
	}
	result, err := services.CreateSecret(s.SecretsManager, name, &value)
	return utils.ProcessResult(result, err, c)
}

func DeleteSecret(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	arn := c.QueryParam("arn")
	if arn == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no arn specified",
		})
	}
	forceDelete := c.QueryParam("forceDelete")
	if forceDelete == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no forceDelete specified",
		})
	}
	result, err := services.DeleteSecret(s.SecretsManager, arn, forceDelete == "true")
	return utils.ProcessResult(result, err, c)
}

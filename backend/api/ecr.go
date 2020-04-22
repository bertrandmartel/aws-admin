package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetRepositories(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetRepositories(s.ECR)
	return utils.ProcessResult(result, err, c)
}

func GetEcrImages(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	repo := c.QueryParam("repo")
	if repo == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no repo specified",
		})
	}
	result, err := services.GetEcrImages(s.ECR, repo)
	return utils.ProcessResult(result, err, c)
}

func CreateEcrRepo(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.CreateEcrRepo(s.ECR, name)
	return utils.ProcessResult(result, err, c)
}

func DeleteEcrRepo(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.DeleteEcrRepo(s.ECR, name)
	return utils.ProcessResult(result, err, c)
}

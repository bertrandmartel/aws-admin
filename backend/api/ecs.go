package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func ListECSClusters(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.ListECSClusters(s.ECS)
	return utils.ProcessResult(result, err, c)
}

func ListECSServices(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.ListECSServices(s.ECS, name)
	return utils.ProcessResult(result, err, c)
}

func ListECSTasks(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.ListECSTasks(s.ECS, name)
	return utils.ProcessResult(result, err, c)
}

func UpdateECSService(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	serviceName := c.QueryParam("service")
	clusterName := c.QueryParam("cluster")
	if serviceName == "" || clusterName == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no service or cluster specified",
		})
	}
	result, err := services.UpdateECSService(s.ECS, &serviceName, &clusterName)
	return utils.ProcessResult(result, err, c)
}

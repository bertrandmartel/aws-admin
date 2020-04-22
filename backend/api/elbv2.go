package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetLbList(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetLbList(s.ELBV2)
	return utils.ProcessResult(result, err, c)
}

func GetListeners(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	arn := c.QueryParam("arn")
	if arn == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no arn specified",
		})
	}
	result, err := services.GetListeners(s.ELBV2, arn)
	return utils.ProcessResult(result, err, c)
}

func GetTargetGroups(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetTargetGroups(s.ELBV2)
	return utils.ProcessResult(result, err, c)
}

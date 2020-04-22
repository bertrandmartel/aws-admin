package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func ListSSM(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	ec2Names, _ := services.GetEC2NameMap(s.EC2)
	result, err := services.ListSSM(s.SSM, ec2Names)
	return utils.ProcessResult(result, err, c)
}

func StartSession(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	instance := c.QueryParam("instance")
	if instance == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no instance specified",
		})
	}
	result, err := services.StartSession(s.SSM, &instance)
	return utils.ProcessResult(result, err, c)
}

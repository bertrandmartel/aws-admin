package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetEC2Instances(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetEC2Instances(s.EC2)
	return utils.ProcessResult(result, err, c)
}

func GetEC2Keypair(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetEC2Keypair(s.EC2)
	return utils.ProcessResult(result, err, c)
}

func CreateEC2Keypair(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.CreateEC2Keypair(s.EC2, name)
	return utils.ProcessResult(result, err, c)
}

func DeleteEC2Keypair(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.DeleteEC2Keypair(s.EC2, name)
	return utils.ProcessResult(result, err, c)
}

func SetEC2Status(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	id := c.QueryParam("id")
	status := c.QueryParam("status")
	if status == "" || id == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no status or id specified",
		})
	}
	switch status {
	case "stop":
		{
			result, err := services.StopEC2Instance(s.EC2, id)
			return utils.ProcessResult(result, err, c)
		}
	case "start":
		{
			result, err := services.StartEC2Instance(s.EC2, id)
			return utils.ProcessResult(result, err, c)
		}
	case "reboot":
		{
			result, err := services.RebootEC2Instance(s.EC2, id)
			return utils.ProcessResult(result, err, c)
		}
	case "terminate":
		{
			result, err := services.TerminateEC2Instance(s.EC2, id)
			return utils.ProcessResult(result, err, c)
		}
	}
	return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
		Error:            "format_error",
		ErrorDescription: "wrong status",
	})
}

func GetVPC(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetVPC(s.EC2)
	return utils.ProcessResult(result, err, c)
}

func GetSubnets(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetSubnets(s.EC2)
	return utils.ProcessResult(result, err, c)
}

func GetSecurityGroups(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetSecurityGroups(s.EC2)
	return utils.ProcessResult(result, err, c)
}

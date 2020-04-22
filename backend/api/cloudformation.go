package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetStacks(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetStacks(s.CloudFormation)
	return utils.ProcessResult(result, err, c)
}

func CreateStack(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.FormValue("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "name is required"))
	}
	//stack template
	templateFile, err := c.FormFile("template")
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "template is required"))
	}
	templateContent, err := utils.GetFileContent(templateFile)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "template content was not extracted"))
	}
	template := string(*templateContent)
	result, err := services.CreateStack(s.CloudFormation, name, &template)
	return utils.ProcessResult(result, err, c)
}

func DeleteStack(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.FormValue("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "name is required"))
	}
	result, err := services.DeleteStack(s.CloudFormation, name)
	return utils.ProcessResult(result, err, c)
}

func UpdateStack(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.FormValue("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "name is required"))
	}
	//stack template
	templateFile, err := c.FormFile("template")
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "template is required"))
	}
	templateContent, err := utils.GetFileContent(templateFile)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "template content was not extracted"))
	}
	template := string(*templateContent)
	result, err := services.UpdateStack(s.CloudFormation, name, &template)
	return utils.ProcessResult(result, err, c)
}

func GetTemplate(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.GetTemplate(s.CloudFormation, name)
	return utils.ProcessResult(result, err, c)
}

func UpdateTerminationProtection(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	status := c.QueryParam("status")
	if status == "" || name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name, status specified",
		})
	}

	result, err := services.UpdateTerminationProtection(s.CloudFormation, name, status == "true")
	return utils.ProcessResult(result, err, c)
}

func GetStackDescription(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.GetStackDescription(s.CloudFormation, name)
	return utils.ProcessResult(result, err, c)
}

func GetStackEvent(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.GetStackEvent(s.CloudFormation, name)
	return utils.ProcessResult(result, err, c)
}

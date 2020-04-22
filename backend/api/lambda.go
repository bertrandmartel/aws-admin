package api

import (
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetLambdas(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetLambdas(s.Lambda)
	return utils.ProcessResult(result, err, c)
}

func GetLambdaFunction(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.GetLambdaFunction(s.Lambda, name)
	return utils.ProcessResult(result, err, c)
}

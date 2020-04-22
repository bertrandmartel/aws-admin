package api

import (
	"net/http"
	"strconv"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetLogGroups(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetLogGroups(s.CloudWatchLogs)
	return utils.ProcessResult(result, err, c)
}

func GetLogStreams(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.GetLogStreams(s.CloudWatchLogs, name)
	return utils.ProcessResult(result, err, c)
}

func GetLogEvents(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	stream := c.QueryParam("stream")
	if stream == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no stream specified",
		})
	}
	startFromHead := c.QueryParam("startFromHead")
	if startFromHead == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no startFromHead specified",
		})
	}
	startTime := c.QueryParam("startTime")
	nextToken := c.QueryParam("nextToken")

	startTimeNum, err := strconv.ParseInt(startTime, 10, 64)
	if err != nil {
		startTimeNum = 0
	}
	result, err := services.GetLogEvents(s.CloudWatchLogs, name, stream, nextToken, startFromHead == "true", startTimeNum)
	return utils.ProcessResult(result, err, c)
}

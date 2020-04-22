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

func GetHostedZones(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetHostedZones(s.Route53)
	return utils.ProcessResult(result, err, c)
}
func GetRecordSets(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	zone := c.QueryParam("zone")
	if zone == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no zone specified",
		})
	}
	result, err := services.GetRecordSets(s.Route53, zone)
	return utils.ProcessResult(result, err, c)
}
func CreateRecordSet(c echo.Context) error {
	return changeRecordSet(c, "CREATE")
	/*
		s := c.Get("session").(*session.Session)
		zone := c.QueryParam("zone")
		recordName := c.QueryParam("recordName")
		recordType := c.QueryParam("recordType")
		recordValue := c.QueryParam("recordValue")
		recordTTL := c.QueryParam("recordTTL")
		recordHostZoneID := c.QueryParam("hostzoneID")
		alias :=c.QueryParam("alias")
		if (zone == "" || recordName == "" || recordType == ""|| recordValue == "" || recordTTL== "" || alias =="") {
			return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
				Error: "format_error",
				ErrorDescription: "no zone, recordName, recordType, recordValue specified",
			})
		}
		if ttl, err := strconv.Atoi(recordTTL); err == nil {
			result,err := services.ChangeRecordSet(s.Route53, zone, recordName, recordType, recordValue, int64(ttl), "CREATE", alias == "true",recordHostZoneID)
			return utils.ProcessResult(result, err, c)
		} else {
			return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
				Error: "format_error",
				ErrorDescription: "ttl must be an integer",
			})
		}
	*/
}

func DeleteRecordSet(c echo.Context) error {
	return changeRecordSet(c, "DELETE")
	/*
		s := c.Get("session").(*session.Session)
		zone := c.QueryParam("zone")
		recordName := c.QueryParam("recordName")
		recordType := c.QueryParam("recordType")
		recordValue := c.QueryParam("recordValue")
		recordTTL := c.QueryParam("recordTTL")
		alias := c.QueryParam("alias")
		recordHostZoneID := c.QueryParam("hostzoneID")
		if (zone == "" || recordName == "" || recordType == ""|| recordValue == "" || recordTTL== "" || alias == "") {
			return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
				Error: "format_error",
				ErrorDescription: "no zone, recordName, recordType, recordValue specified",
			})
		}
		if ttl, err := strconv.Atoi(recordTTL); err == nil {
			result,err := services.ChangeRecordSet(s.Route53, zone, recordName, recordType, recordValue, int64(ttl), "DELETE", alias == "true",recordHostZoneID)
			return utils.ProcessResult(result, err, c)
		} else {
			return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
				Error: "format_error",
				ErrorDescription: "ttl must be an integer",
			})
		}
	*/
}

func changeRecordSet(c echo.Context, action string) error {
	s := c.Get("session").(*session.Session)
	zone := c.QueryParam("zone")
	recordName := c.QueryParam("recordName")
	recordType := c.QueryParam("recordType")
	recordValue := c.QueryParam("recordValue")
	recordTTL := c.QueryParam("recordTTL")
	alias := c.QueryParam("alias")
	recordHostZoneID := c.QueryParam("hostzoneID")
	if zone == "" || recordName == "" || recordType == "" || recordValue == "" || recordTTL == "" || alias == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no zone, recordName, recordType, recordValue specified",
		})
	}
	if ttl, err := strconv.Atoi(recordTTL); err == nil {
		result, err := services.ChangeRecordSet(s.Route53, zone, recordName, recordType, recordValue, int64(ttl), action, alias == "true", recordHostZoneID)
		return utils.ProcessResult(result, err, c)
	}
	return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
		Error:            "format_error",
		ErrorDescription: "ttl must be an integer",
	})
}

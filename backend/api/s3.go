package api

import (
	"fmt"
	"log"
	"net/http"
	"path/filepath"

	"github.com/bertrandmartel/aws-admin/backend/application"
	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetBucketList(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetBucketList(s.S3)
	return utils.ProcessResult(result, err, c)
}

func CreateBucket(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.CreateBucket(s.S3, name)
	return utils.ProcessResult(result, err, c)
}

func DeleteBucket(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	result, err := services.DeleteBucket(s.S3, name)
	return utils.ProcessResult(result, err, c)
}

func ListObjects(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	marker := c.QueryParam("marker")
	result, err := services.ListObjects(s.S3, name, marker)
	return utils.ProcessResult(result, err, c)
}

func CreateObject(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	bucketName := c.FormValue("name")
	if bucketName == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	key := c.FormValue("key")
	if key == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no key specified",
		})
	}
	file, err := c.FormFile("file")
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "file is required"))
	}
	fileContent, err := utils.GetFileContent(file)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "file content was not extracted"))
	}
	result, err := services.CreateObject(s.S3, bucketName, key, fileContent)
	return utils.ProcessResult(result, err, c)
}

func DeleteObject(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	key := c.QueryParam("key")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no key specified",
		})
	}
	result, err := services.DeleteObject(s.S3, name, key)
	return utils.ProcessResult(result, err, c)
}

func DownloadObject(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	app := c.Get("application").(*application.AwsAdminApp)

	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no name specified",
		})
	}
	key := c.QueryParam("key")
	if name == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no key specified",
		})
	}
	filePath := fmt.Sprintf("%v/%v", (*app).GetConfig().OutputTmpDir, filepath.Base(key))
	err := services.DownloadObject(s.S3, name, key, &filePath)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &model.ErrorResponse{
			Error:            "server_error",
			ErrorDescription: err.Error(),
		})
	}
	log.Println(filePath)
	log.Println(filepath.Base(key))
	c.Response().Header().Set("Content-Disposition", fmt.Sprintf("%s; filename=%q", "attachment", filepath.Base(key)))
	return utils.SendFileAndDelete(&c, filePath)
}

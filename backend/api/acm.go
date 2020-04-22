package api

import (
	"log"
	"net/http"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/bertrandmartel/aws-admin/backend/services"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/bertrandmartel/aws-admin/backend/utils"
	"github.com/labstack/echo/v4"
)

func GetAcmList(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	result, err := services.GetAcmList(s.ACM)
	return utils.ProcessResult(result, err, c)
}

func ImportCertificates(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	name := c.FormValue("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "name is required"))
	}
	//certificate
	certFile, err := c.FormFile("certificate")
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "certificate is required"))
	}
	certContent, err := utils.GetFileContent(certFile)
	if err != nil {
		log.Println(err)
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "certificate content was not extracted"))
	}
	//private key
	privateKeyFile, err := c.FormFile("key")
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "key is required"))
	}
	keyContent, err := utils.GetFileContent(privateKeyFile)
	if err != nil {
		log.Println(err)
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "key content was not extracted"))
	}
	//full chain
	fullChainFile, err := c.FormFile("fullchain")
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "fullchain is required"))
	}
	fullchainContent, err := utils.GetFileContent(fullChainFile)
	if err != nil {
		log.Println(err)
		return c.JSON(http.StatusBadRequest, utils.SendError("format_error", "fullchain content was not extracted"))
	}
	var cert = &model.Certificates{
		PrivateKey:  keyContent,
		Certificate: certContent,
		FullChain:   fullchainContent,
	}
	result, err := services.ImportCertificates(s.ACM, cert, name)
	return utils.ProcessResult(result, err, c)
}

func DeleteCert(c echo.Context) error {
	s := c.Get("session").(*session.Session)
	arn := c.QueryParam("arn")
	if arn == "" {
		return c.JSON(http.StatusBadRequest, &model.ErrorResponse{
			Error:            "format_error",
			ErrorDescription: "no arn specified",
		})
	}
	result, err := services.DeleteCert(s.ACM, arn)
	return utils.ProcessResult(result, err, c)
}

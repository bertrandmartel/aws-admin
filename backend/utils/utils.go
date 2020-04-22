package utils

import (
	"bufio"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/bertrandmartel/aws-admin/backend/model"
	"github.com/labstack/echo/v4"
)

func ProcessResult(i interface{}, err error, c echo.Context) error {
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &model.ErrorResponse{
			Error:            "server_error",
			ErrorDescription: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, i)
}

func SendError(errorMessage string, errorDescription string) *model.ErrorResponse {
	return &model.ErrorResponse{
		Error:            errorMessage,
		ErrorDescription: errorDescription,
	}
}

func GetFileContent(file *multipart.FileHeader) (content *[]byte, error error) {
	src, err := file.Open()
	if err != nil {
		return nil, err
	}
	defer src.Close()
	reader := bufio.NewReader(src)
	contents, err := ioutil.ReadAll(reader)
	if err != nil {
		return nil, err
	}
	return &contents, nil
}

func SendFileAndDelete(c *echo.Context, file string) (err error) {
	f, err := os.Open(file)
	if err != nil {
		return (*c).NoContent(404)
	}
	defer f.Close()
	fi, _ := f.Stat()
	if fi.IsDir() {
		f, err = os.Open(file)
		if err != nil {
			return (*c).NoContent(404)
		}
		defer f.Close()
		if fi, err = f.Stat(); err != nil {
			return
		}
	}
	http.ServeContent((*c).Response(), (*c).Request(), fi.Name(), fi.ModTime(), f)
	e := os.Remove(file)
	if e != nil {
		return e
	}
	return nil
}

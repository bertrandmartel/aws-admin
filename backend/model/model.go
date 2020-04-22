package model

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/bertrandmartel/aws-admin/backend/session"
)

type Config struct {
	Version       string              `json:"version"`
	Port          int                 `json:"port"`
	ServerPath    string              `json:"serverPath"`
	DefaultRegion string              `json:"defaultRegion"`
	Credentials   session.Credentials `json:"credentials"`
	OutputTmpDir  string
}

type SetConfigurationInput struct {
	Region      string              `json:"region"`
	Credentials session.Credentials `json:"credentials"`
}

type SetConfigurationOutput struct {
	Updated bool `json:"updated"`
}

func ParseConfig(path string) (config *Config, err error) {
	jsonFile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var ret Config
	json.Unmarshal(byteValue, &ret)
	return &ret, nil
}

type Certificates struct {
	PrivateKey  *[]byte
	Certificate *[]byte
	FullChain   *[]byte
}

type ErrorResponse struct {
	Error            string `json:"error"`
	ErrorDescription string `json:"error_description"`
}

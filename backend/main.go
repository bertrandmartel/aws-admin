package main

import (
	"fmt"
	"log"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/bertrandmartel/aws-admin/backend/application"
	"github.com/bertrandmartel/aws-admin/backend/model"

	"github.com/bertrandmartel/aws-admin/backend/api"

	"io/ioutil"

	awsMiddleware "github.com/bertrandmartel/aws-admin/backend/middleware"
	"github.com/bertrandmartel/aws-admin/backend/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gopkg.in/go-playground/validator.v9"
)

var outputTmpDir = ""

const rootTmpDir = "tmp"

var cookies = make(map[string]*session.Session)

func main() {
	config, err := model.ParseConfig("config.json")
	if err != nil {
		log.Fatal(err)
		return
	}
	if os.Getenv("AWS_REGION") != "" {
		config.DefaultRegion = os.Getenv("AWS_REGION")
	}
	if _, err := os.Stat(rootTmpDir); os.IsNotExist(err) {
		os.Mkdir(rootTmpDir, os.FileMode(0755))
	}
	if err != nil {
		log.Fatal(err)
		return
	}
	outputTmpDir, err = ioutil.TempDir(rootTmpDir, "aws-admin")
	if err != nil {
		log.Fatal(err)
		return
	}
	config.OutputTmpDir = outputTmpDir

	log.Printf("[aws-admin] version %v\n", config.Version)
	log.Printf("[aws-admin] server path %v:%v\n", config.ServerPath, config.Port)
	e := echo.New()
	/*
		e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: []string{"*"},
			AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},
		}))
	*/
	UseCommonMiddleware(e)
	routes(e, config)
	e.Logger.Fatal(e.Start(":" + strconv.Itoa(config.Port)))
}

func routes(e *echo.Echo, cfg *model.Config) {

	go monitorCredentialFiles()

	var mcHandler application.AwsAdminApp = &application.App{
		Config:  cfg,
		Cookies: &cookies,
	}
	e.Use(bindApp(&mcHandler))

	e.POST("/configuration", api.SetConfiguration, MWSession)

	e.POST("/session_reset", func(c echo.Context) error {
		return c.NoContent(200)
	}, MWClearSession)

	//s3
	e.GET("/service/s3", api.GetBucketList, MWSession)
	e.PUT("/service/s3", api.CreateBucket, MWSession)
	e.DELETE("/service/s3", api.DeleteBucket, MWSession)
	e.GET("/service/s3/objects", api.ListObjects, MWSession)
	e.PUT("/service/s3/objects", api.CreateObject, MWSession)
	e.DELETE("/service/s3/objects", api.DeleteObject, MWSession)
	e.GET("/service/s3/objects/download", api.DownloadObject, MWSession)

	//elbv2
	e.GET("/service/elbv2/lb", api.GetLbList, MWSession)
	e.GET("/service/elbv2/listeners", api.GetListeners, MWSession)
	e.GET("/service/elbv2/tg", api.GetTargetGroups, MWSession)

	//acm
	e.GET("/service/acm/list", api.GetAcmList, MWSession)
	e.PUT("/service/acm/import", api.ImportCertificates, MWSession)
	e.DELETE("/service/acm", api.DeleteCert, MWSession)

	//ec2
	e.GET("/service/ec2/instances", api.GetEC2Instances, MWSession)
	e.GET("/service/ec2/keypair", api.GetEC2Keypair, MWSession)
	e.PUT("/service/ec2/keypair", api.CreateEC2Keypair, MWSession)
	e.DELETE("/service/ec2/keypair", api.DeleteEC2Keypair, MWSession)
	e.POST("/service/ec2/instance", api.SetEC2Status, MWSession)
	e.GET("/service/ec2/vpc", api.GetVPC, MWSession)
	e.GET("/service/ec2/subnets", api.GetSubnets, MWSession)
	e.GET("/service/ec2/sg", api.GetSecurityGroups, MWSession)

	//secretsmanager
	e.GET("/service/secretsmanager", api.GetSecrets, MWSession)
	e.GET("/service/secretsmanager/value", api.GetSecretValue, MWSession)
	e.POST("/service/secretsmanager", api.CreateSecret, MWSession)
	e.DELETE("/service/secretsmanager", api.DeleteSecret, MWSession)

	//lambda
	e.GET("/service/lambda", api.GetLambdas, MWSession)
	e.GET("/service/lambda/function", api.GetLambdaFunction, MWSession)

	//cloudwatchlogs
	e.GET("/service/cloudwatch/loggroup", api.GetLogGroups, MWSession)
	e.GET("/service/cloudwatch/logstreams", api.GetLogStreams, MWSession)
	e.GET("/service/cloudwatch/logevents", api.GetLogEvents, MWSession)

	//cloudformation
	e.GET("/service/cloudformation/stacks", api.GetStacks, MWSession)
	e.PUT("/service/cloudformation/stack", api.CreateStack, MWSession)
	e.DELETE("/service/cloudformation/stack", api.DeleteStack, MWSession)
	e.POST("/service/cloudformation/stack", api.UpdateStack, MWSession)
	e.GET("/service/cloudformation/template", api.GetTemplate, MWSession)
	e.POST("/service/cloudformation/termination_protection", api.UpdateTerminationProtection, MWSession)
	e.GET("/service/cloudformation/description", api.GetStackDescription, MWSession)
	e.GET("/service/cloudformation/events", api.GetStackEvent, MWSession)

	//ssm
	e.GET("/service/ssm/instances", api.ListSSM, MWSession)
	e.POST("/service/ssm/session", api.StartSession, MWSession)

	//ecr
	e.GET("/service/ecr/repositories", api.GetRepositories, MWSession)
	e.GET("/service/ecr/images", api.GetEcrImages, MWSession)
	e.PUT("/service/ecr", api.CreateEcrRepo, MWSession)
	e.DELETE("/service/ecr", api.DeleteEcrRepo, MWSession)

	//ecs
	e.GET("/service/ecs/clusters", api.ListECSClusters, MWSession)
	e.GET("/service/ecs/services", api.ListECSServices, MWSession)
	e.GET("/service/ecs/tasks", api.ListECSTasks, MWSession)
	e.POST("/service/ecs/update", api.UpdateECSService, MWSession)

	//route53
	e.GET("/service/route53/hostedzones", api.GetHostedZones, MWSession)
	e.GET("/service/route53/recordsets", api.GetRecordSets, MWSession)
	e.POST("/service/route53/recordsets", api.CreateRecordSet, MWSession)
	e.DELETE("/service/route53/recordsets", api.DeleteRecordSet, MWSession)

	if os.Getenv("APP_ENV") == "development" {
		devURL, err := url.Parse("http://localhost:8080")
		if err != nil {
			e.Logger.Fatal(err)
		}
		targets := []*middleware.ProxyTarget{
			{
				URL: devURL,
			},
		}
		e.Group("/", middleware.Proxy(middleware.NewRoundRobinBalancer(targets)))
		e.Group("/js/app.js", middleware.Proxy(middleware.NewRoundRobinBalancer(targets)), MWSession)
		e.Group("/js/*", middleware.Proxy(middleware.NewRoundRobinBalancer(targets)))
		e.Group("/fonts/*", middleware.Proxy(middleware.NewRoundRobinBalancer(targets)))
		e.Group("/vendor/*", middleware.Proxy(middleware.NewRoundRobinBalancer(targets)))
		e.Group("/img", middleware.Proxy(middleware.NewRoundRobinBalancer(targets)))
	} else {
		e.Group("/js/app.js", middleware.StaticWithConfig(middleware.StaticConfig{
			Root:   "dist",
			Browse: false,
		}), MWSession)
		e.Group("/*", middleware.StaticWithConfig(middleware.StaticConfig{
			Root:   "dist",
			Browse: false,
		}))
	}
}

func bindApp(app *application.AwsAdminApp) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("application", app)
			return next(c)
		}
	}
}

//middleware for validation
type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

func MWClearSession(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		app := c.Get("application").(*application.AwsAdminApp)
		awsMiddleware.UseClearSession(c, *app)
		return next(c)
	}
}

func MWSession(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		app := c.Get("application").(*application.AwsAdminApp)
		awsMiddleware.UseSession(c, *app)
		return next(c)
	}
}

func UseCommonMiddleware(e *echo.Echo) {
	e.Validator = &CustomValidator{validator: validator.New()}

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${remote_ip} - - ${time_rfc3339_nano} \"${method} ${uri} ${protocol}\" ${status} ${bytes_out} \"${referer}\" \"${user_agent}\"\n",
	}))
	e.Use(middleware.Recover())
}

func monitorCredentialFiles() {
	for {
		for _, s := range cookies {
			if s.Credentials.CredentialType == session.FileCred {
				log.Println(fmt.Sprintf("checking file credentials for session id %v\n", s.ID))
				pwd, _ := os.Getwd()
				path := filepath.Join(pwd, s.Credentials.FileCredentials.FilePath)
				stat, err := os.Stat(path)
				if err != nil {
					log.Println(err)
				}
				if err == nil && (stat.ModTime() != s.Credentials.FileCredentials.InitialModTime) {
					log.Println(fmt.Sprintf("file change detected for session id %v\n", s.ID))
					s.Credentials.FileCredentials.InitialModTime = stat.ModTime()
					staticCreds := &session.StaticCredentials{
						AccessID:        "",
						SecretAccessKey: "",
						SessionToken:    "",
					}
					err := awsMiddleware.ExtractFileCredFromFile(path, staticCreds)
					if err != nil {
						log.Println(err)
					} else {
						awsMiddleware.ConfigureStaticCredSession(s, staticCreds)
					}
				}
			}
		}

		time.Sleep(10 * time.Second)
	}
}

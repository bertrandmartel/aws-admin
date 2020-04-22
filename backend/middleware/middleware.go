package middleware

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	awsSession "github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/acm"
	"github.com/aws/aws-sdk-go/service/cloudformation"
	"github.com/aws/aws-sdk-go/service/cloudwatchlogs"
	"github.com/aws/aws-sdk-go/service/ec2"
	"github.com/aws/aws-sdk-go/service/ecr"
	"github.com/aws/aws-sdk-go/service/ecs"
	"github.com/aws/aws-sdk-go/service/elbv2"
	"github.com/aws/aws-sdk-go/service/lambda"
	"github.com/aws/aws-sdk-go/service/route53"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/aws/aws-sdk-go/service/ssm"
	"github.com/bertrandmartel/aws-admin/backend/application"
	"github.com/bertrandmartel/aws-admin/backend/session"
	uuid "github.com/satori/go.uuid"
)

func UseSession(context interface{}, app application.AwsAdminApp) {
	cookie, err := app.GetCookie(context, session.SessionCookie)
	if err != nil {
		log.Println("creating cookies...")
		s := &session.Session{
			ID:          uuid.NewV4().String(),
			Credentials: app.GetConfig().Credentials,
			Region:      app.GetConfig().DefaultRegion,
		}
		ReconfigureSession(s)
		log.Println(s)
		sessionVal, err := app.SetSession(s)
		if err != nil {
			return
		}
		app.SetSessionCookie(context, session.SessionCookie, sessionVal)
		app.SetSessionContext(context, s)
	} else {
		s, err := app.GetSessionFromStore(&cookie)
		if err != nil {
			return
		}
		app.SetSessionContext(context, s)
	}
}

func UseClearSession(context interface{}, app application.AwsAdminApp) {
	cookie, err := app.GetCookie(context, session.SessionCookie)
	if err == nil {
		app.DeleteSession(&cookie)
	}
	app.DeleteCookie(context, session.SessionCookie)
}

func ReconfigureSession(s *session.Session) {
	log.Println("reconfiguring...")
	switch s.Credentials.CredentialType {
	case session.SharedCred:
		{
			log.Println("use shared credentials")

			if s.Credentials.SharedCredentials.Profile != "" {
				log.Println("custom profile")

				sess := awsSession.Must(awsSession.NewSession())
				awsCredentials := credentials.NewSharedCredentials("", s.Credentials.SharedCredentials.Profile)
				awsConfig := aws.Config{
					Region:      aws.String(s.Region),
					Credentials: awsCredentials,
				}
				log.Println(awsConfig.Credentials)
				s.ELBV2 = elbv2.New(sess, &awsConfig)
				s.ACM = acm.New(sess, &awsConfig)
				s.S3 = s3.New(sess, &awsConfig)
				s.EC2 = ec2.New(sess, &awsConfig)
				s.CloudFormation = cloudformation.New(sess, &awsConfig)
				s.ECR = ecr.New(sess, &awsConfig)
				s.SSM = ssm.New(sess, &awsConfig)
				s.ECS = ecs.New(sess, &awsConfig)
				s.Route53 = route53.New(sess, &awsConfig)
				s.SecretsManager = secretsmanager.New(sess, &awsConfig)
				s.Lambda = lambda.New(sess, &awsConfig)
				s.CloudWatchLogs = cloudwatchlogs.New(sess, &awsConfig)
			} else {
				log.Println("no profile")

				sess := awsSession.Must(awsSession.NewSession(&aws.Config{Region: aws.String(s.Region)}))
				s.ELBV2 = elbv2.New(sess)
				s.ACM = acm.New(sess)
				s.S3 = s3.New(sess)
				s.EC2 = ec2.New(sess)
				s.CloudFormation = cloudformation.New(sess)
				s.ECR = ecr.New(sess)
				s.SSM = ssm.New(sess)
				s.ECS = ecs.New(sess)
				s.Route53 = route53.New(sess)
				s.SecretsManager = secretsmanager.New(sess)
				s.Lambda = lambda.New(sess)
				s.CloudWatchLogs = cloudwatchlogs.New(sess)
			}
		}
	case session.StaticCred:
		{
			log.Println("use static credentials")
			ConfigureStaticCredSession(s, &s.Credentials.StaticCredentials)
		}
	case session.FileCred:
		{
			log.Println("use file credentials")
			staticCreds := &session.StaticCredentials{
				AccessID:        "",
				SecretAccessKey: "",
				SessionToken:    "",
			}
			pwd, _ := os.Getwd()
			path := filepath.Join(pwd, s.Credentials.FileCredentials.FilePath)
			stat, err := os.Stat(path)
			if err != nil {
				log.Println(err)
			} else {
				log.Println(s.Credentials.FileCredentials.FilePath)
				s.Credentials.FileCredentials.InitialModTime = stat.ModTime()
				log.Println(path)
				err = ExtractFileCredFromFile(path, staticCreds)
				if err != nil {
					log.Println(err)
				}
				log.Println(staticCreds)
			}
			ConfigureStaticCredSession(s, staticCreds)
		}
	}
}

func ExtractFileCredFromFile(filePath string, creds *session.StaticCredentials) (err error) {
	data, _ := ioutil.ReadFile(filePath)
	e := json.Unmarshal(data, creds)
	if err != nil {
		log.Println(e)
		return e
	}
	return nil
}

func ConfigureStaticCredSession(s *session.Session, creds *session.StaticCredentials) {
	sess := awsSession.Must(awsSession.NewSession())
	awsCredentials := credentials.NewStaticCredentials(
		creds.AccessID,
		creds.SecretAccessKey,
		creds.SessionToken,
	)
	awsConfig := aws.Config{
		Region:      aws.String(s.Region),
		Credentials: awsCredentials,
	}
	s.ELBV2 = elbv2.New(sess, &awsConfig)
	s.ACM = acm.New(sess, &awsConfig)
	s.S3 = s3.New(sess, &awsConfig)
	s.EC2 = ec2.New(sess, &awsConfig)
	s.CloudFormation = cloudformation.New(sess, &awsConfig)
	s.ECR = ecr.New(sess, &awsConfig)
	s.SSM = ssm.New(sess, &awsConfig)
	s.ECS = ecs.New(sess, &awsConfig)
	s.Route53 = route53.New(sess, &awsConfig)
	s.SecretsManager = secretsmanager.New(sess, &awsConfig)
	s.Lambda = lambda.New(sess, &awsConfig)
	s.CloudWatchLogs = cloudwatchlogs.New(sess, &awsConfig)
}

package session

import (
	"time"

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
)

type CredentialType int32

const (
	SharedCred CredentialType = 0
	StaticCred CredentialType = 1
	FileCred   CredentialType = 2
)

const SessionCookie = "AWS-ADMIN"

type Session struct {
	ID             string
	Credentials    Credentials
	Region         string
	ELBV2          *elbv2.ELBV2
	ACM            *acm.ACM
	S3             *s3.S3
	EC2            *ec2.EC2
	CloudFormation *cloudformation.CloudFormation
	SSM            *ssm.SSM
	ECS            *ecs.ECS
	ECR            *ecr.ECR
	Route53        *route53.Route53
	Lambda         *lambda.Lambda
	SecretsManager *secretsmanager.SecretsManager
	CloudWatchLogs *cloudwatchlogs.CloudWatchLogs
}

type Credentials struct {
	CredentialType    CredentialType    `json:"credentialType"`
	StaticCredentials StaticCredentials `json:"staticCredentials"`
	SharedCredentials SharedCredentials `json:"sharedCredentials"`
	FileCredentials   FileCredentials   `json:"fileCredentials"`
}

type StaticCredentials struct {
	AccessID        string `json:"accessID"`
	SecretAccessKey string `json:"secretAccessKey"`
	SessionToken    string `json:"sessionToken"`
}

type SharedCredentials struct {
	Profile string `json:"profile"`
}

type FileCredentials struct {
	FilePath       string `json:"filePath"`
	InitialModTime time.Time
}

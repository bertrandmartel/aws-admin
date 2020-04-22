package services

import (
	"github.com/aws/aws-sdk-go/service/ssm"
)

func ListSSM(svc *ssm.SSM, nameMap *map[string]string) (result *ssm.DescribeInstanceInformationOutput, error error) {
	input := &ssm.DescribeInstanceInformationInput{}
	data, err := svc.DescribeInstanceInformation(input)
	if err != nil {
		return nil, err
	}
	for i := 0; i < len(data.InstanceInformationList); i++ {
		if val, ok := (*nameMap)[*data.InstanceInformationList[i].InstanceId]; ok {
			data.InstanceInformationList[i].Name = &val
		}
	}
	token := data.NextToken
	for token != nil {
		input := &ssm.DescribeInstanceInformationInput{
			NextToken: token,
		}
		nextResult, err := svc.DescribeInstanceInformation(input)
		if err != nil {
			return nil, err
		}
		data.InstanceInformationList = append(data.InstanceInformationList, nextResult.InstanceInformationList...)
		token = nextResult.NextToken
	}

	return data, nil
}

func StartSession(svc *ssm.SSM, instanceID *string) (result *ssm.StartSessionOutput, error error) {
	input := &ssm.StartSessionInput{
		Target: instanceID,
	}
	data, err := svc.StartSession(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

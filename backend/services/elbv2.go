package services

import (
	"github.com/aws/aws-sdk-go/service/elbv2"
)

func GetLbList(elbv2Svc *elbv2.ELBV2) (result *elbv2.DescribeLoadBalancersOutput, error error) {
	input := &elbv2.DescribeLoadBalancersInput{}
	data, err := elbv2Svc.DescribeLoadBalancers(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetListeners(elbv2Svc *elbv2.ELBV2, arn string) (result *elbv2.DescribeListenersOutput, error error) {
	input := &elbv2.DescribeListenersInput{
		LoadBalancerArn: &arn,
	}
	data, err := elbv2Svc.DescribeListeners(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetTargetGroups(elbv2Svc *elbv2.ELBV2) (result *elbv2.DescribeTargetGroupsOutput, error error) {
	input := &elbv2.DescribeTargetGroupsInput{}
	data, err := elbv2Svc.DescribeTargetGroups(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

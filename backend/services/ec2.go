package services

import (
	"github.com/aws/aws-sdk-go/service/ec2"
)

func GetEC2Instances(ec2Svc *ec2.EC2) (result *ec2.DescribeInstancesOutput, error error) {
	input := &ec2.DescribeInstancesInput{}
	data, err := ec2Svc.DescribeInstances(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetEC2Keypair(ec2Svc *ec2.EC2) (result *ec2.DescribeKeyPairsOutput, error error) {
	input := &ec2.DescribeKeyPairsInput{}
	data, err := ec2Svc.DescribeKeyPairs(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func CreateEC2Keypair(ec2Svc *ec2.EC2, name string) (result *ec2.CreateKeyPairOutput, error error) {
	input := &ec2.CreateKeyPairInput{
		KeyName: &name,
	}
	data, err := ec2Svc.CreateKeyPair(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DeleteEC2Keypair(ec2Svc *ec2.EC2, name string) (result *ec2.DeleteKeyPairOutput, error error) {
	input := &ec2.DeleteKeyPairInput{
		KeyName: &name,
	}
	data, err := ec2Svc.DeleteKeyPair(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func StopEC2Instance(ec2Svc *ec2.EC2, instanceID string) (result *ec2.StopInstancesOutput, error error) {
	input := &ec2.StopInstancesInput{
		InstanceIds: []*string{&instanceID},
	}
	data, err := ec2Svc.StopInstances(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func StartEC2Instance(ec2Svc *ec2.EC2, instanceID string) (result *ec2.StartInstancesOutput, error error) {
	input := &ec2.StartInstancesInput{
		InstanceIds: []*string{&instanceID},
	}
	data, err := ec2Svc.StartInstances(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func RebootEC2Instance(ec2Svc *ec2.EC2, instanceID string) (result *ec2.RebootInstancesOutput, error error) {
	input := &ec2.RebootInstancesInput{
		InstanceIds: []*string{&instanceID},
	}
	data, err := ec2Svc.RebootInstances(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func TerminateEC2Instance(ec2Svc *ec2.EC2, instanceID string) (result *ec2.TerminateInstancesOutput, error error) {
	input := &ec2.TerminateInstancesInput{
		InstanceIds: []*string{&instanceID},
	}
	data, err := ec2Svc.TerminateInstances(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetVPC(ec2Svc *ec2.EC2) (result *ec2.DescribeVpcsOutput, error error) {
	input := &ec2.DescribeVpcsInput{}
	data, err := ec2Svc.DescribeVpcs(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetSubnets(ec2Svc *ec2.EC2) (result *ec2.DescribeSubnetsOutput, error error) {
	input := &ec2.DescribeSubnetsInput{}
	data, err := ec2Svc.DescribeSubnets(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetSecurityGroups(ec2Svc *ec2.EC2) (result *ec2.DescribeSecurityGroupsOutput, error error) {
	input := &ec2.DescribeSecurityGroupsInput{}
	data, err := ec2Svc.DescribeSecurityGroups(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetEC2NameMap(svc *ec2.EC2) (list *map[string]string, error error) {
	data, err := GetEC2Instances(svc)
	if err != nil {
		return nil, err
	}
	result := make(map[string]string)
	for i := 0; i < len(data.Reservations); i++ {
		instance := data.Reservations[i].Instances[0]
		instanceID := *instance.InstanceId
		name := instanceID
		for j := 0; j < len(instance.Tags); j++ {
			if *instance.Tags[j].Key == "Name" {
				name = *instance.Tags[j].Value
				break
			}
		}
		result[instanceID] = name
	}
	return &result, nil
}

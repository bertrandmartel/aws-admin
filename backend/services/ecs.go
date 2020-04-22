package services

import (
	"github.com/aws/aws-sdk-go/service/ecs"
)

func ListECSClusters(svc *ecs.ECS) (result *ecs.DescribeClustersOutput, error error) {
	var maxResults int64 = 100
	input := &ecs.ListClustersInput{
		MaxResults: &maxResults,
	}
	data, err := svc.ListClusters(input)
	if err != nil {
		return nil, err
	}
	res, err := DescribeClusters(svc, data.ClusterArns)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func ListECSServices(svc *ecs.ECS, name string) (result *ecs.DescribeServicesOutput, error error) {
	var maxResults int64 = 100
	input := &ecs.ListServicesInput{
		Cluster:    &name,
		MaxResults: &maxResults,
	}
	data, err := svc.ListServices(input)
	if err != nil {
		return nil, err
	}
	res, err := DescribeServices(svc, &name, data.ServiceArns)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func ListECSTasks(svc *ecs.ECS, name string) (result *ecs.DescribeTasksOutput, error error) {
	var maxResults int64 = 100
	input := &ecs.ListTasksInput{
		Cluster:    &name,
		MaxResults: &maxResults,
	}
	data, err := svc.ListTasks(input)
	if err != nil {
		return nil, err
	}
	res, err := DescribeTasks(svc, &name, data.TaskArns)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func DescribeClusters(svc *ecs.ECS, names []*string) (result *ecs.DescribeClustersOutput, error error) {
	input := &ecs.DescribeClustersInput{
		Clusters: names,
	}
	data, err := svc.DescribeClusters(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DescribeServices(svc *ecs.ECS, clusterName *string, names []*string) (result *ecs.DescribeServicesOutput, error error) {
	input := &ecs.DescribeServicesInput{
		Cluster:  clusterName,
		Services: names,
	}
	data, err := svc.DescribeServices(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DescribeTasks(svc *ecs.ECS, clusterName *string, names []*string) (result *ecs.DescribeTasksOutput, error error) {
	input := &ecs.DescribeTasksInput{
		Cluster: clusterName,
		Tasks:   names,
	}
	data, err := svc.DescribeTasks(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func UpdateECSService(svc *ecs.ECS, serviceName *string, clusterName *string) (result *ecs.UpdateServiceOutput, error error) {
	forceDeployment := true
	input := &ecs.UpdateServiceInput{
		Cluster:            clusterName,
		Service:            serviceName,
		ForceNewDeployment: &forceDeployment,
	}
	data, err := svc.UpdateService(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

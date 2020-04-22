package services

import (
	"github.com/aws/aws-sdk-go/service/ecr"
)

func GetRepositories(svc *ecr.ECR) (result *ecr.DescribeRepositoriesOutput, error error) {
	input := &ecr.DescribeRepositoriesInput{}
	data, err := svc.DescribeRepositories(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetEcrImages(svc *ecr.ECR, repo string) (result *ecr.DescribeImagesOutput, error error) {
	input := &ecr.DescribeImagesInput{
		RepositoryName: &repo,
	}
	data, err := svc.DescribeImages(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func CreateEcrRepo(svc *ecr.ECR, repo string) (result *ecr.CreateRepositoryOutput, error error) {
	input := &ecr.CreateRepositoryInput{
		RepositoryName: &repo,
	}
	data, err := svc.CreateRepository(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DeleteEcrRepo(svc *ecr.ECR, repo string) (result *ecr.DeleteRepositoryOutput, error error) {
	input := &ecr.DeleteRepositoryInput{
		RepositoryName: &repo,
	}
	data, err := svc.DeleteRepository(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

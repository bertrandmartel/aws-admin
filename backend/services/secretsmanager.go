package services

import (
	"github.com/aws/aws-sdk-go/service/secretsmanager"
)

func GetSecrets(svc *secretsmanager.SecretsManager) (result *secretsmanager.ListSecretsOutput, error error) {
	input := &secretsmanager.ListSecretsInput{}
	data, err := svc.ListSecrets(input)
	if err != nil {
		return nil, err
	}
	token := data.NextToken
	for token != nil {
		input := &secretsmanager.ListSecretsInput{
			NextToken: token,
		}
		nextResult, err := svc.ListSecrets(input)
		if err != nil {
			return nil, err
		}
		data.SecretList = append(data.SecretList, nextResult.SecretList...)
		token = nextResult.NextToken
	}
	return data, nil
}

func GetSecretValue(svc *secretsmanager.SecretsManager, arn string) (result *secretsmanager.GetSecretValueOutput, error error) {
	input := &secretsmanager.GetSecretValueInput{
		SecretId: &arn,
	}
	data, err := svc.GetSecretValue(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func CreateSecret(svc *secretsmanager.SecretsManager, name string, value *string) (result *secretsmanager.CreateSecretOutput, error error) {
	input := &secretsmanager.CreateSecretInput{
		Name:         &name,
		SecretString: value,
	}
	data, err := svc.CreateSecret(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DeleteSecret(svc *secretsmanager.SecretsManager, arn string, forceDelete bool) (result *secretsmanager.DeleteSecretOutput, error error) {
	input := &secretsmanager.DeleteSecretInput{
		SecretId:                   &arn,
		ForceDeleteWithoutRecovery: &forceDelete,
	}
	data, err := svc.DeleteSecret(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

package services

import (
	"github.com/aws/aws-sdk-go/service/lambda"
)

func GetLambdas(svc *lambda.Lambda) (result *lambda.ListFunctionsOutput, error error) {
	input := &lambda.ListFunctionsInput{}
	data, err := svc.ListFunctions(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetLambdaFunction(svc *lambda.Lambda, name string) (result *lambda.GetFunctionOutput, error error) {
	input := &lambda.GetFunctionInput{
		FunctionName: &name,
	}
	data, err := svc.GetFunction(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

package services

import (
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go/service/cloudformation"
	uuid "github.com/satori/go.uuid"
)

var stackStatusFilters = [...]string{
	"CREATE_IN_PROGRESS",
	"CREATE_FAILED",
	"CREATE_COMPLETE",
	"ROLLBACK_IN_PROGRESS",
	"ROLLBACK_FAILED",
	"ROLLBACK_COMPLETE",
	"DELETE_IN_PROGRESS",
	"DELETE_FAILED", //no more DELETE_COMPLETE
	"UPDATE_IN_PROGRESS",
	"UPDATE_COMPLETE_CLEANUP_IN_PROGRESS",
	"UPDATE_COMPLETE",
	"UPDATE_ROLLBACK_IN_PROGRESS",
	"UPDATE_ROLLBACK_FAILED",
	"UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS",
	"UPDATE_ROLLBACK_COMPLETE",
	"REVIEW_IN_PROGRESS",
	"IMPORT_IN_PROGRESS",
	"IMPORT_COMPLETE",
	"IMPORT_ROLLBACK_IN_PROGRESS",
	"IMPORT_ROLLBACK_FAILED",
	"IMPORT_ROLLBACK_COMPLETE",
}

func GetStacks(svc *cloudformation.CloudFormation) (result *cloudformation.ListStacksOutput, error error) {
	var statusFilters []*string
	for i := 0; i < len(stackStatusFilters); i++ {
		statusFilters = append(statusFilters, &stackStatusFilters[i])
	}
	input := &cloudformation.ListStacksInput{
		StackStatusFilter: statusFilters,
	}
	data, err := svc.ListStacks(input)
	if err != nil {
		return nil, err
	}
	token := data.NextToken
	for token != nil {
		input := &cloudformation.ListStacksInput{
			NextToken:         token,
			StackStatusFilter: statusFilters,
		}
		nextResult, err := svc.ListStacks(input)
		if err != nil {
			return nil, err
		}
		data.StackSummaries = append(data.StackSummaries, nextResult.StackSummaries...)
		token = nextResult.NextToken
	}
	return data, nil
}

func GetStackDescription(svc *cloudformation.CloudFormation, name string) (result *cloudformation.DescribeStacksOutput, error error) {
	input := &cloudformation.DescribeStacksInput{
		StackName: &name,
	}
	data, err := svc.DescribeStacks(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetStackEvent(svc *cloudformation.CloudFormation, name string) (result *cloudformation.DescribeStackEventsOutput, error error) {
	input := &cloudformation.DescribeStackEventsInput{
		StackName: &name,
	}
	data, err := svc.DescribeStackEvents(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetTemplate(svc *cloudformation.CloudFormation, name string) (result *cloudformation.GetTemplateOutput, error error) {
	input := &cloudformation.GetTemplateInput{
		StackName: &name,
	}
	data, err := svc.GetTemplate(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func CreateStack(svc *cloudformation.CloudFormation, name string, template *string) (result *cloudformation.CreateStackOutput, error error) {
	capabilityIAM := "CAPABILITY_IAM"
	capabilityAutoExpand := "CAPABILITY_AUTO_EXPAND"
	input := &cloudformation.CreateStackInput{
		StackName:    &name,
		TemplateBody: template,
		Capabilities: []*string{&capabilityIAM, &capabilityAutoExpand},
	}
	data, err := svc.CreateStack(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DeleteStack(svc *cloudformation.CloudFormation, name string) (result *cloudformation.DeleteStackOutput, error error) {
	input := &cloudformation.DeleteStackInput{
		StackName: &name,
	}
	data, err := svc.DeleteStack(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func UpdateTerminationProtection(svc *cloudformation.CloudFormation, name string, status bool) (result *cloudformation.UpdateTerminationProtectionOutput, error error) {
	input := &cloudformation.UpdateTerminationProtectionInput{
		StackName:                   &name,
		EnableTerminationProtection: &status,
	}
	data, err := svc.UpdateTerminationProtection(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func UpdateStack(svc *cloudformation.CloudFormation, stackName string, template *string) (result *cloudformation.CreateChangeSetOutput, error error) {
	capabilityIAM := "CAPABILITY_IAM"
	capabilityAutoExpand := "CAPABILITY_AUTO_EXPAND"
	changeSetName := fmt.Sprintf("%s-%s", "update", uuid.NewV4().String())
	input := &cloudformation.CreateChangeSetInput{
		StackName:     &stackName,
		TemplateBody:  template,
		ChangeSetName: &changeSetName,
		Capabilities:  []*string{&capabilityIAM, &capabilityAutoExpand},
	}
	data, err := svc.CreateChangeSet(input)
	if err != nil {
		return nil, err
	}
	go monitorChangeSetProgress(svc, stackName, changeSetName)
	return data, nil
}

func monitorChangeSetProgress(svc *cloudformation.CloudFormation, stackName string, changeSetName string) {
	//wait for 20 seconds max
	for i := 0; i < 10; i++ {
		res, err := DescribeChangeSet(svc, stackName, changeSetName)
		if err != nil {
			log.Println(err)
			break
		}
		status := *res.Status
		log.Println(status)
		if status == "CREATE_COMPLETE" {
			log.Println("executing change set...")
			executeRes, err := ExecuteChangeSet(svc, stackName, changeSetName)
			if err != nil {
				log.Println(err)
				break
			}
			log.Println(executeRes)
			break
		} else if (status != "CREATE_PENDING") && (status != "CREATE_IN_PROGRESS") {
			log.Println(fmt.Sprintf("unexpected state : %v", status))
		}
		time.Sleep(2 * time.Second)
	}
}

func ExecuteChangeSet(svc *cloudformation.CloudFormation, stackName string, changeSetName string) (result *cloudformation.ExecuteChangeSetOutput, error error) {
	input := &cloudformation.ExecuteChangeSetInput{
		StackName:     &stackName,
		ChangeSetName: &changeSetName,
	}
	data, err := svc.ExecuteChangeSet(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DescribeChangeSet(svc *cloudformation.CloudFormation, stackName string, changeSetName string) (result *cloudformation.DescribeChangeSetOutput, error error) {
	input := &cloudformation.DescribeChangeSetInput{
		StackName:     &stackName,
		ChangeSetName: &changeSetName,
	}
	data, err := svc.DescribeChangeSet(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

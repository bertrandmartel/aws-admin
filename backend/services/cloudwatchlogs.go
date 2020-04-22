package services

import (
	"github.com/aws/aws-sdk-go/service/cloudwatchlogs"
)

func GetLogGroups(svc *cloudwatchlogs.CloudWatchLogs) (result *cloudwatchlogs.DescribeLogGroupsOutput, error error) {
	input := &cloudwatchlogs.DescribeLogGroupsInput{}
	data, err := svc.DescribeLogGroups(input)
	if err != nil {
		return nil, err
	}
	token := data.NextToken
	for token != nil {
		input := &cloudwatchlogs.DescribeLogGroupsInput{
			NextToken: token,
		}
		nextResult, err := svc.DescribeLogGroups(input)
		if err != nil {
			return nil, err
		}
		data.LogGroups = append(data.LogGroups, nextResult.LogGroups...)
		token = nextResult.NextToken
	}
	return data, nil
}

func GetLogStreams(svc *cloudwatchlogs.CloudWatchLogs, name string) (result *cloudwatchlogs.DescribeLogStreamsOutput, error error) {
	input := &cloudwatchlogs.DescribeLogStreamsInput{
		LogGroupName: &name,
	}
	data, err := svc.DescribeLogStreams(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetLogEvents(svc *cloudwatchlogs.CloudWatchLogs, name string, stream string, nextToken string, startFromHead bool, startTime int64) (result *cloudwatchlogs.GetLogEventsOutput, error error) {
	var startTimePtr *int64 = nil
	if startTime != 0 {
		startTimePtr = &startTime
	}
	var limit int64 = 100
	var input *cloudwatchlogs.GetLogEventsInput
	if nextToken == "" {
		input = &cloudwatchlogs.GetLogEventsInput{
			LogGroupName:  &name,
			LogStreamName: &stream,
			StartFromHead: &startFromHead,
			Limit:         &limit,
			StartTime:     startTimePtr,
		}
	} else {
		input = &cloudwatchlogs.GetLogEventsInput{
			LogGroupName:  &name,
			LogStreamName: &stream,
			StartFromHead: &startFromHead,
			Limit:         &limit,
			NextToken:     &nextToken,
			StartTime:     startTimePtr,
		}
	}
	data, err := svc.GetLogEvents(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

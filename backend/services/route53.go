package services

import (
	"github.com/aws/aws-sdk-go/service/route53"
)

func GetHostedZones(route53Svc *route53.Route53) (result *route53.ListHostedZonesOutput, error error) {
	input := &route53.ListHostedZonesInput{}
	data, err := route53Svc.ListHostedZones(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func GetRecordSets(route53Svc *route53.Route53, zone string) (result *route53.ListResourceRecordSetsOutput, error error) {
	input := &route53.ListResourceRecordSetsInput{
		HostedZoneId: &zone,
	}
	data, err := route53Svc.ListResourceRecordSets(input)
	if err != nil {
		return nil, err
	}
	truncated := *data.IsTruncated
	nextRecordName := data.NextRecordName
	for truncated {
		result, err = route53Svc.ListResourceRecordSets(&route53.ListResourceRecordSetsInput{
			HostedZoneId:    &zone,
			StartRecordName: nextRecordName,
		})
		if err != nil {
			return nil, err
		}
		data.ResourceRecordSets = append(data.ResourceRecordSets, result.ResourceRecordSets...)
		truncated = *result.IsTruncated
		nextRecordName = result.NextRecordName
	}
	return data, nil
}

func ChangeRecordSet(
	route53Svc *route53.Route53, zone string,
	recordName string, recordType string,
	recordValue string, ttl int64,
	action string, alias bool, recordHostZoneID string) (result *route53.ChangeResourceRecordSetsOutput, error error) {
	input := &route53.ChangeResourceRecordSetsInput{
		HostedZoneId: &zone,
		ChangeBatch: &route53.ChangeBatch{
			Changes: []*route53.Change{
				{
					Action: &action,
				},
			},
		},
	}
	if !alias {
		input.ChangeBatch.Changes[0].ResourceRecordSet = &route53.ResourceRecordSet{
			Name: &recordName,
			Type: &recordType,
			ResourceRecords: []*route53.ResourceRecord{
				{
					Value: &recordValue,
				},
			},
			TTL: &ttl,
		}
	} else {
		evaluateTargetHealth := false
		input.ChangeBatch.Changes[0].ResourceRecordSet = &route53.ResourceRecordSet{
			Name: &recordName,
			Type: &recordType,
			AliasTarget: &route53.AliasTarget{
				DNSName:              &recordValue,
				HostedZoneId:         &recordHostZoneID,
				EvaluateTargetHealth: &evaluateTargetHealth,
			},
		}
	}
	data, err := route53Svc.ChangeResourceRecordSets(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

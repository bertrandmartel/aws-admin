package services

import (
	"github.com/aws/aws-sdk-go/service/acm"
	"github.com/bertrandmartel/aws-admin/backend/model"
)

func GetAcmList(svc *acm.ACM) (result *acm.ListCertificatesOutput, error error) {
	input := &acm.ListCertificatesInput{}
	data, err := svc.ListCertificates(input)
	if err != nil {
		return nil, err
	}
	token := data.NextToken
	for token != nil {
		input := &acm.ListCertificatesInput{
			NextToken: token,
		}
		nextResult, err := svc.ListCertificates(input)
		if err != nil {
			return nil, err
		}
		data.CertificateSummaryList = append(data.CertificateSummaryList, nextResult.CertificateSummaryList...)
		token = nextResult.NextToken
	}
	return data, nil
}

func ImportCertificates(svc *acm.ACM, cert *model.Certificates, name string) (result *acm.ImportCertificateOutput, error error) {
	tagKey := "Name"
	input := &acm.ImportCertificateInput{
		Certificate:      *cert.Certificate,
		CertificateChain: *cert.FullChain,
		PrivateKey:       *cert.PrivateKey,
		Tags: []*acm.Tag{
			{
				Key:   &tagKey,
				Value: &name,
			},
		},
	}
	result, err := svc.ImportCertificate(input)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func DeleteCert(svc *acm.ACM, arn string) (result *acm.DeleteCertificateOutput, error error) {
	input := &acm.DeleteCertificateInput{
		CertificateArn: &arn,
	}
	result, err := svc.DeleteCertificate(input)
	if err != nil {
		return nil, err
	}
	return result, nil
}

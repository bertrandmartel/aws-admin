package services

import (
	"bytes"
	"io"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go/service/s3"
)

func GetBucketList(s3Svc *s3.S3) (result *s3.ListBucketsOutput, error error) {
	input := &s3.ListBucketsInput{}
	data, err := s3Svc.ListBuckets(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func CreateBucket(svc *s3.S3, name string) (result *s3.CreateBucketOutput, error error) {
	input := &s3.CreateBucketInput{
		Bucket: &name,
	}
	data, err := svc.CreateBucket(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DeleteBucket(svc *s3.S3, name string) (result *s3.DeleteBucketOutput, error error) {
	input := &s3.DeleteBucketInput{
		Bucket: &name,
	}
	data, err := svc.DeleteBucket(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func ListObjects(svc *s3.S3, name string, marker string) (result *s3.ListObjectsOutput, error error) {
	var input *s3.ListObjectsInput
	if marker != "" {
		input = &s3.ListObjectsInput{
			Bucket: &name,
			Marker: &marker,
		}
	} else {
		input = &s3.ListObjectsInput{
			Bucket: &name,
		}
	}
	data, err := svc.ListObjects(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func CreateObject(svc *s3.S3, name string, key string, content *[]byte) (result *s3.PutObjectOutput, error error) {
	acl := "private"
	storageClass := "STANDARD"
	contentType := http.DetectContentType(*content)
	input := &s3.PutObjectInput{
		Bucket:       &name,
		Body:         bytes.NewReader(*content),
		StorageClass: &storageClass,
		ACL:          &acl,
		ContentType:  &contentType,
		Key:          &key,
	}
	data, err := svc.PutObject(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DeleteObject(svc *s3.S3, name string, key string) (result *s3.DeleteObjectOutput, error error) {
	input := &s3.DeleteObjectInput{
		Bucket: &name,
		Key:    &key,
	}
	data, err := svc.DeleteObject(input)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func DownloadObject(svc *s3.S3, name string, key string, filePath *string) (error error) {
	input := &s3.GetObjectInput{
		Bucket: &name,
		Key:    &key,
	}
	data, err := svc.GetObject(input)
	if err != nil {
		return err
	}
	outFile, err := os.Create(*filePath)
	if err != nil {
		return err
	}
	defer outFile.Close()
	_, err = io.Copy(outFile, data.Body)
	if err != nil {
		return err
	}
	return nil
}

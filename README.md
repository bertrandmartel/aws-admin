# AWS Admin Dashboard

![build](https://github.com/bertrandmartel/aws-admin/workflows/build/badge.svg) [![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE.md)

An admin Dashboard for AWS using the AWS API under the hood

* support shared and static credentials
* ability to quickly switch between credentials
* static credentials is supported (which is handy if you have temporary credentials)
* static credentials can be read from a file (file changes are tracked in the server)
* switching between services in the UI is fast (compared to AWS web UI)
* ability to customize the navigation drawer menu (pick only services you use)
* UI has no external dependencies (can be run locally on your private network)
* it has a dark mode :sunglasses:

###  [Live demo Here](https://bertrandmartel.github.io/aws-admin)

[![screen](https://user-images.githubusercontent.com/5183022/79948115-8672d700-8473-11ea-9959-0a3e5d09e94c.png)](https://bertrandmartel.github.io/aws-admin)

## Install

#### Using binaries (recommended)

[Download the latest release](https://github.com/bertrandmartel/aws-admin/releases/latest)

go to http://localhost:6004

#### Using Docker

```bash
git clone git://github.com/bertrandmartel/aws-admin.git
cd aws-admin
docker build . -t aws-admin
docker run -p 6004:6004 -v $HOME/.aws:/root/.aws --user=root aws-admin
```
go to http://localhost:6004

#### Developper mode

```bash
git clone git://github.com/bertrandmartel/aws-admin.git
cd aws-admin
make install
make run
```

in another tab

```
cd frontend
npm i
vue ui
```

go to http://localhost:6004

## Credentials type

* Shared credentials (profile)

![shared](https://user-images.githubusercontent.com/5183022/79936665-510cc000-8458-11ea-8957-cf3bc90fd8e5.png)

* static credentials (temporary credentials)

![static](https://user-images.githubusercontent.com/5183022/79936667-51a55680-8458-11ea-89ad-82aa8cdea0f6.png)

* static credentials in a local file

![static](https://user-images.githubusercontent.com/5183022/79936668-51a55680-8458-11ea-86f1-93f2e35c05a4.png)

## Services implemented

* Cloudformation
  - [x] list stacks
  - [x] get stack description
  - [x] get stack template
  - [x] get stack events
  - [x] create stack
  - [x] update stack
  - [x] delete stack
  - [x] protect/unprotect stack

* System Manager
  - [x] list managed instances
  - [x] start SSM session (including web terminal)

* ec2
  - [x] list instances
  - [x] start instance
  - [x] stop instance
  - [x] reboot instance
  - [x] terminate instance
  - [x] list vpc
  - [x] list subnets
  - [x] list keypair
  - [x] create keypair
  - [x] delete keypair
  - [x] list security groups

* lambda
  - [x] list functions
  - [x] get function code (link)

* s3
  - [x] list buckets
  - [x] get objects
  - [x] download object
  - [x] upload object

* load balancers
  - [x] list load balancers
  - [x] list target groups
  
* route53
  - [x] list hostzones
  - [x] list record sets
  - [x] create record set
  - [x] delete record set

* cloudwatchlogs
  - [x] list log groups
  - [x] list log streams
  - [x] list log events (with forward/backward token)

* ecr
  - [x] list repositories
  - [x] list images

* ecs
  - [x] list clusters
  - [x] list services
  - [x] list tasks

* acm
  - [x] list certificates
  - [x] import certificate
  - [x] delete certificate

* secretsmanager
  - [x] list secrets
  - [x] create secret
  - [x] delete secret

## Open Source components

* Backend in Go

  * [aws-sdk-go](https://github.com/aws/aws-sdk-go)
  * [echo](https://echo.labstack.com/)

* Frontend in Javascript

  * [vue.js](https://vuejs.org/)
  * [vuetify](https://vuetifyjs.com/en/getting-started/quick-start/)
  * [vuex](https://vuex.vuejs.org/)
  * [vue-router](https://router.vuejs.org/)
  * [vuedraggable](https://github.com/SortableJS/Vue.Draggable)
  * [xterm.js](https://xtermjs.org/)
  * [ssm-session](https://github.com/bertrandmartel/aws-ssm-session)
  * [codemirror](https://codemirror.net/)
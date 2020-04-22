<template>
  <div>
    <CloudFormation v-show="(this.$route.query.service == 'cloudformation') || !this.$route.query.service" />
    <SSM v-show="this.$route.query.service == 'ssm'" />
    <EC2 v-show="this.$route.query.service == 'ec2'" />
    <Lambda v-show="this.$route.query.service == 'lambda'" />
    <S3 v-show="this.$route.query.service == 's3'" />
    <VPC v-show="this.$route.query.service == 'vpc'" />
    <Subnets v-show="this.$route.query.service == 'subnets'" />
    <LoadBalancers v-show="this.$route.query.service == 'loadbalancer'" />
    <TargetGroups v-show="this.$route.query.service == 'targetgroup'" />
    <SecurityGroups v-show="this.$route.query.service == 'securitygroup'" />
    <Route53 v-show="this.$route.query.service == 'route53'" />
    <CloudWatchLogs v-show="this.$route.query.service == 'cloudwatch'" />
    <ECR v-show="this.$route.query.service == 'ecr'" />
    <ECS v-show="this.$route.query.service == 'ecs'" />
    <ACM v-show="this.$route.query.service == 'acm'" />
    <Keypair v-show="this.$route.query.service == 'keypair'" />
    <SecretsManager v-show="this.$route.query.service == 'secretsmanager'" />
    <Credentials v-show="this.$route.query.service == 'credentials'" />
  </div>
</template>

<script>
import CloudFormation from '../cloudformation/CloudFormation'
import SSM from '../ssm/SSM'
import EC2 from '../ec2/EC2'
import Lambda from '../lambda/Lambda'
import S3 from '../s3/S3'
import VPC from '../vpc/VPC'
import Subnets from '../subnets/Subnets'
import LoadBalancers from '../loadbalancers/LoadBalancers'
import TargetGroups from '../targetgroups/TargetGroups'
import SecurityGroups from '../securitygroups/SecurityGroups'
import Route53 from '../route53/Route53'
import CloudWatchLogs from '../cloudwatchlogs/CloudWatchLogs'
import ECR from '../ecr/ECR'
import ECS from '../ecs/ECS'
import ACM from '../acm/ACM'
import Keypair from '../keypair/Keypair'
import SecretsManager from '../secretsmanager/SecretsManager'
import Credentials from '../credentials/Credentials'

export default {
  name: 'Root',
  components: {
    CloudFormation,
    SSM,
    EC2,
    Lambda,
    S3,
    VPC,
    Subnets,
    LoadBalancers,
    TargetGroups,
    SecurityGroups,
    Route53,
    CloudWatchLogs,
    ECR,
    ECS,
    ACM,
    Keypair,
    SecretsManager,
    Credentials
  },
}
</script>
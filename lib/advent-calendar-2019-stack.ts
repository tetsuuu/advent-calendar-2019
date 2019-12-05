import { Construct, Stack, StackProps }  from '@aws-cdk/core';
import { Group, Policy, PolicyStatement, ManagedPolicy, User } from '@aws-cdk/aws-iam';
import AWS = require('aws-sdk');

const admins = 'testAdminGroup';
const adminUsers = [
  'demo01',
];

const developers = 'testDevGroup';
const devUsers = [
  'demo02',
  'demo03'
];

export class AdventCalendar2019Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Configure account policy
    const accountPasswordPolicy = new AWS.IAM({});
    accountPasswordPolicy.updateAccountPasswordPolicy({
      "MinimumPasswordLength": 9,
      "RequireSymbols": false,
      "RequireNumbers": true,
      "RequireUppercaseCharacters": true,
      "RequireLowercaseCharacters": true,
      "AllowUsersToChangePassword": true,
    }, function(){});
    
    // Allow get account password policy
    const getAccountPassword = new PolicyStatement({
        resources: ["*"],
        actions: [
          "iam:GetAccountPasswordPolicy"
        ]
    });

    // Allow change user password by itself
    const changePassword = new PolicyStatement({
      resources: ["arn:aws:iam::account-id-without-hyphens:user/${aws:username}"],
      actions: [
        "iam:ChangePassword",
      ]
    });

    // Allow IAM Role access
    const iamPassRoleAccess = new PolicyStatement({
      resources: ["*"],
      actions: [
        "iam:Get*",
        "iam:List*",
        "iam:PassRole"
        ],
    });

    // AWS managed policy
    const adminPolicy = ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess');
    const powerUserPolicy = ManagedPolicy.fromAwsManagedPolicyName('PowerUserAccess');

    // Developer policy
    const devPolicy = new Policy(this, 'iamPassRoleAccess', { 
      policyName: "iamPassRoleAccess",
      statements: [iamPassRoleAccess],
    });

    // Common policy
    const commonPolicy = new Policy(this, 'changePassword', { 
      policyName: "changePassword",
      statements: [changePassword, getAccountPassword],
    });

    // Admin group
    const adminGroup = new Group(this, admins, { groupName: admins });
    adminGroup.addManagedPolicy(adminPolicy);
    adminGroup.attachInlinePolicy(commonPolicy);

    // Developer group
    const devGroup = new Group(this, developers, { groupName: developers });
    devGroup.addManagedPolicy(powerUserPolicy);
    devGroup.attachInlinePolicy(devPolicy);
    devGroup.attachInlinePolicy(commonPolicy);

    // Create users
    adminUsers.forEach(adminUser => {
      new User(this, adminUser, {
        userName: adminUser,
        groups: [adminGroup],
      });
    });

    devUsers.forEach(devUser => {
      new User(this, devUser, {
        userName: devUser,
        groups: [devGroup]
      });
    });
  }
}

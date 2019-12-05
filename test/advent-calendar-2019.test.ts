import '@aws-cdk/assert/jest'
import { SynthUtils } from '@aws-cdk/assert'
import { Stack, App } from '@aws-cdk/core'  
 
import { AdventCalendar2019Stack } from '../lib/advent-calendar-2019-stack'

test('IAM users fine', () => {
  const app = new App();
  const stack = new AdventCalendar2019Stack(app, 'usersFineGrainedTestStack');
  expect(stack).toHaveResource('AWS::IAM::User', {
    UserName: 'demo01',
    Groups: [
      {
        "Ref": "testAdminGroupA356E014"
      }
    ]
  })
})
   
test('IAM group fine', () => {
  const app = new App();
  const stack = new AdventCalendar2019Stack(app, 'groupFineGrainedTestStack');
  expect(stack).toHaveResource('AWS::IAM::Group', {
    GroupName: 'testAdminGroup',
    "ManagedPolicyArns": [
      {
        "Fn::Join": [
          "",
          [
            "arn:",
            {
              "Ref": "AWS::Partition"
            },
            ":iam::aws:policy/AdministratorAccess"
          ]
        ]
      }
    ]
  })
})

test('IAM policy fine', () => {
  const app = new App();
  const stack = new AdventCalendar2019Stack(app, 'policyFineGrainedTestStack');
  expect(stack).toHaveResource('AWS::IAM::Policy', {
    PolicyName: 'iamPassRoleAccess',
    Groups: [
        // {"Ref": "testAdminGroupA356E014"},
        {"Ref": "testDevGroup93FABFEE"}
    ],
    PolicyDocument: {
      "Statement": [
        {
          "Action": [
              "iam:Get*",
              "iam:List*",
              "iam:PassRole",
            ],
          "Effect": "Allow",
          "Resource": "*",
        },
      ],
      "Version": "2012-10-17",
    }
  })
})

test('IAM Resource Stack', () => {
  const app = new App();
  const stack = new AdventCalendar2019Stack(app, 'IAMTestStack');
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

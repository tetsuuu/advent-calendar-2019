# advent-calendar-2019

When create PR, Gituhub Actions runs by `.gihub/workflows/test.yml`.
Approve and merge to master the above, Gituhub Actions runs by `.gihub/workflows/deploy.yml`.
It is creating users or somethings.

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

# Main files
The stack ts files are under `lib` directory.
If you decrease or increase resource, change above files.

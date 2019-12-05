# Users
module "demo01" {
  source = "../modules/aws/iam_user"

  name = "demo01"
}

module "demo02" {
  source = "../modules/aws/iam_user"

  name = "demo02"
}

module "demo03" {
  source = "../modules/aws/iam_user"

  name = "demo03"
}

# Admin group
resource "aws_iam_group_membership" "admin" {
  name = "admin"

  users = [
    module.demo01.name,
  ]

  group = module.admin_group.name
}

# Dev group
resource "aws_iam_group_membership" "dev" {
  name = "dev"

  users = [
    module.demo02.name,
    module.demo03.name,
  ]

  group = module.dev_group.name
}

# Change password group
resource "aws_iam_group_membership" "change_passwd" {
  name = "change_password"

  users = [
    module.demo01.name,
    module.demo02.name,
    module.demo03.name,
  ]

  group = module.change_pass_group.name
}

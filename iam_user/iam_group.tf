# Groups
## Admin Group
module "admin_group" {
  source = "../modules/iam_group"
  
  name        = "Admin"
  policy_arns = [
    "arn:aws:iam::aws:policy/AdministratorAccess",
    "${module.switch_admin.policy_arn}",
  ]
}

## Dev Group
module "dev_group" {
  source = "../modules/iam_group"

  name = "Dev"

  policy_arns = [
    "arn:aws:iam::aws:policy/PowerUserAccess",
    "${module.switch_developer.policy_arn}",
  ]
}

## Change Pass Group
module "change_pass_group" {
  source = "../modules/iam_group"

  name        = "Change_pass"
  policy_arns = [module.change_password.policy_arn]
}

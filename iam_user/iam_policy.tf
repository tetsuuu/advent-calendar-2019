data "aws_iam_policy_document" "change_passwod" {
  statement {
    effect = "Allow"

    actions = [
      "iam:GetAccountPasswordPolicy",
    ]

    resources = ["*"]
  }

  statement {
    effect = "Allow"

    actions = [
      "iam:ChangePassword",
    ]

    resources = ["arn:aws:iam::account-id-without-hyphens:user/$${aws:username}"]
  }
}

module "change_password" {
  source = "../modules/aws/iam_policy"

  name        = "change_password"
  description = "for change user password"

  policy = data.aws_iam_policy_document.change_passwod.json
}

data "aws_iam_policy_document" "iam_pass_role_access" {
  statement {
    effect = "Allow"

    actions = [
      "iam:Get*",
      "iam:List*",
      "iam:PassRole"
    ]

    resources = ["*"]
  }
}

module "iam_pass_role_access" {
  source = "../modules/aws/iam_policy"

  name        = "iam_pass_role_access"
  description = "for attach Iam Role"

  policy = data.aws_iam_policy_document.iam_pass_role_access.json
}

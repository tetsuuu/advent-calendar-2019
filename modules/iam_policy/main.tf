resource "aws_iam_policy" "default" {
  name        = var.name
  description = var.description
  policy      = var.policy
}

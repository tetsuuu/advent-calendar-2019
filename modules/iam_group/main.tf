resource "aws_iam_group" "default" {
  name = var.name
}

resource "aws_iam_group_policy_attachment" "default" {
  count = length(compact(distinct(var.policy_arns)))

  group      = aws_iam_group.default.name
  policy_arn = var.policy_arns[count.index]
}

resource "aws_iam_user" "default" {
  name          = "${var.name}"
  force_destroy = false
}

resource "aws_iam_user_policy_attachment" "default" {
  count = "${length(var.policy_arn_list)}"

  user       = "${var.name}"
  policy_arn = "${element(var.policy_arn_list, count.index)}"
}

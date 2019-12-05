resource "aws_iam_account_password_policy" "default" {
  minimum_password_length        = 9
  require_lowercase_characters   = true
  require_numbers                = true
  require_symbols                = false
  require_uppercase_characters   = true
  allow_users_to_change_password = true
}

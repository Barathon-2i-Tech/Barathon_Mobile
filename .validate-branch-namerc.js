module.exports = {
    pattern: '^(main|develop){1}$|^(feat|fix|release)\\/.+$',
    errorMsg:
        '  Branch naming convention error.\n' +
        '  Your branch doesn\'t follow the naming conventions, please follow these steps to rename it accrodingly:\n' +
        '  (where <remote> is the name of your remote, usually origin, check it with: git remote show)\n' +
        '  1. git branch -m <old_name> <new_name>\n' +
        '  2. git push <remote> --delete <old_name>\n' +
        '  3. git branch --unset-upstream <new_name>\n' +
        '  4. git push <remote> <new_name>\n' +
        '  5. git push <remote> --set-upstream <new_name>',
}

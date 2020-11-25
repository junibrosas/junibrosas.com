---
title: Audit your application packages
date: '2020-11-25T12:00:00.00Z'
description: "Recently I've been tasked to audit our npm packages which could introduce vulnerabilities."
---

Recently I've been tasked to audit our npm packages which could introduce not only vulnerabilities but also incompatibility when adding new packages.

Below are the steps I’ve done to audit and fix the vulnerabilities:

- `npm audit` to show all the vulnerabilities.

- `npm audit --audit-level=high` to show vulnerabilities by level. Useful when you just want to manually fix high level once and potentially could reduce breaking changes in the app.

- `npm audit fix` to scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies. Useful for fixing low to moderate vulnerability levels.

- `npm audit fix --force` to have audit fix install semver-major updates to top level dependencies, not just semver-compatible ones. Useful for fixing high level vulnerabilities which wont be solve if manually updating npm packages.

- Revert back npm packages that are not supposed to be updated. In my case I have to revert back to old version of the packages like Material UI and Mongoose.

- Check the logs when building the application and manually test to make sure no breaking changes on the application.

More: https://docs.npmjs.com/cli/v6/commands/npm-audit

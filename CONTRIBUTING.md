# Contributing a harness run

Have a self-learning harness? Start with the [ten-prompt challenge](README.md#try-your-harness), then follow the [pull request instructions](README.md#submit-your-run-with-a-pull-request).

Submit both `prompts/<harness>/` and `results/<harness>/` in the same PR, with matching folder names. Include the actual prompts, final prototype source, memory/guidance files if used, and enough run notes for someone else to understand and run the result. The [PR template](.github/pull_request_template.md) lists the details to include.

Keep the starter and existing submissions unchanged. For a new run of an existing harness, choose a distinct folder name in both locations. Incomplete runs are welcome when the actual pass count and stopping point are clear.

Include dependency manifests and lockfiles where needed. Leave installed dependencies, build caches, and local credentials out of the PR. Run logs and screenshots are welcome; identify any redactions.

This repository uses the [MIT license](LICENSE). Retain applicable notices for any third-party material included in your submission.

For documentation corrections or a proposed change to the challenge itself, open a separate PR so harness results remain easy to review.

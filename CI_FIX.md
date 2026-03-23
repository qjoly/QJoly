# CI Fix Required

## Problem

The `Metrics` workflow (`.github/workflows/stats.yaml`) crashes with:

```
TypeError: Cannot destructure property 'committer' of 'undefined' as it is undefined.
    at RecentAnalyzer.patches (plugins/languages/analyzer/recent.mjs:70:12)
Error: Process completed with exit code 1.
```

The `lowlighter/metrics@latest` action crashes in `RecentAnalyzer` when some commits
in the repository have a `null` committer field. This is triggered by the
`recently-used` section of `plugin_languages_sections`.

## Fix

In `.github/workflows/stats.yaml`, change line 39:

```diff
-          plugin_languages_sections: most-used, recently-used
+          plugin_languages_sections: most-used
```

This removes the `recently-used` section which uses the crashing `RecentAnalyzer`.
The `most-used` section is unaffected and will continue to work normally.

## Why this wasn't applied automatically

The Claude Code OAuth token does not have the `workflow` scope required to push
changes to `.github/workflows/` files. Apply the one-line change above manually
and push.

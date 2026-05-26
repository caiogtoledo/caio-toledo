# Code Agent Loop - Parameter Reference

Complete reference for all `code-agent-loop.sh` flags with defaults, types, and usage notes.

## Required

| Flag | Short | Type | Description |
|------|-------|------|-------------|
| `--prompt TEXT` | `-p` | string | Prompt for the new session. Required unless using `--chain`. |

## Options

| Flag | Short | Default | Type | Description |
|------|-------|---------|------|-------------|
| `--dir PATH` | `-d` | cwd | string | Working directory for the new session |
| `--model MODEL` | `-m` | `nvidia/z-ai/glm-5.1` | string | Model ID for the new session |
| `--agent AGENT` | `-a` | (none) | string | Agent type to use |
| `--continue` | `-c` | false | flag | Continue last session instead of creating new |
| `--file FILE` | `-f` | (none) | string, repeatable | Attach file(s) to the prompt. Can be used multiple times |
| `--title TITLE` | `-t` | (none) | string | Title for the new session |
| `--session ID` | `-s` | (none) | string | Session ID to continue |
| `--skip-permissions` | — | false | flag | Use `--dangerously-skip-permissions` on the new session |
| `--tui` | — | false | flag | Start in interactive TUI mode instead of `opencode run` |

## Chain Mode

| Flag | Default | Type | Description |
|------|---------|------|-------------|
| `--chain PLAN_FILE` | (none) | string | Execute tasks from a plan file sequentially. Replaces `--prompt`. |
| `--max-iterations N` | 10 | int | Maximum number of chain loop iterations |
| `--stop-on-error` | false | flag | Stop the chain if any session exits with non-zero code |

## Context Passing

| Flag | Default | Type | Description |
|------|---------|------|-------------|
| `--context-file PATH` | (none) | string | Export session context to this file before shutdown |
| `--summary-file PATH` | (none) | string | Include this file's content in the next session's prompt |
| `--state-dir PATH` | `.opencode/loop-state/` | string | Directory for persistent state between sessions |

## Server Mode

| Flag | Default | Type | Description |
|------|---------|------|-------------|
| `--serve` | false | flag | Start `opencode serve` in background and attach sessions to it. Avoids MCP cold boot on each iteration. |
| `--port PORT` | random | int | Port for server mode. Use `0` or omit for random port. |

## Utilities

| Flag | Description |
|------|-------------|
| `--install` | Copy script to `~/.local/bin/` for global access |
| `--uninstall` | Remove global installation from `~/.local/bin/` |
| `--test` | Run built-in test suite |
| `--help` / `-h` | Show usage information |
| `--version` / `-v` | Show version number |

## Recommended Combinations

### Long autonomous chain
```bash
bash code-agent-loop.sh \
  --chain plan.md \
  --max-iterations 10 \
  --stop-on-error \
  --serve \
  --context-file .opencode/loop-state/context.json \
  --summary-file .opencode/loop-state/summary.md
```

### Quick context refresh
```bash
bash code-agent-loop.sh \
  -p "Continue implementing X. Completed: Y. Next: Z." \
  --summary-file .opencode/loop-state/summary.md
```

### With file attachments
```bash
bash code-agent-loop.sh \
  -p "Review and fix the issues in these files" \
  -f src/auth.ts \
  -f tests/auth.test.ts
```

### Continue existing session
```bash
bash code-agent-loop.sh \
  -p "Keep going with the same task" \
  --continue \
  --session abc123
```
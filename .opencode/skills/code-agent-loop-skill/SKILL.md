---
name: code-agent-loop
description: Restart opencode sessions with fresh context by calling code-agent-loop.sh. Use this skill whenever the user wants to continue work in a new session, loop through tasks from a plan file, preserve context between sessions, or automate multi-step agent chains. Trigger on phrases like "restart session", "continue in new session", "loop through tasks", "chain mode", "fresh context", "context too large", "run the loop script", or when the agent detects its context is getting large and needs to hand off to a new session. Also use when the user mentions /loop, agent loop, session loop, or chaining agents.
---

# Code Agent Loop

Use the `code-agent-loop.sh` script to close the current opencode session and spawn a fresh one with a new prompt. This enables autonomous agent chains where each session picks up where the last left off, without accumulating stale context.

The script lives at the project root. Find it by checking for `code-agent-loop.sh` in the working directory or `~/.local/bin/code-agent-loop.sh` if globally installed.

## When to Use

- Your context window is getting large and you want to continue in a clean session
- You need to execute a multi-step plan automatically (chain mode)
- The user asks to restart, loop, or chain sessions
- You want to preserve context between sessions via summary or export files

## Core Workflow

### 1. Basic Session Restart

Close the current session and start a new one with a descriptive prompt:

```bash
bash code-agent-loop.sh -p "Continue implementing the auth module. We completed the JWT token generation in src/auth/tokens.ts. Next: add refresh token rotation."
```

The prompt is the most important parameter — the next session relies entirely on it to understand what to do. Always write prompts that are self-contained and specific.

### 2. Chain Mode (Automated Task Execution)

Execute tasks from a markdown plan file sequentially. The script reads unchecked items (`- [ ]`), runs each one in a new session, and marks them done (`- [x]`):

```bash
bash code-agent-loop.sh --chain plan.md --max-iterations 5
```

This is the most powerful mode — it turns a plan.md with checkboxes into an autonomous development loop.

### 3. Context Passing

Preserve context between sessions so the next session knows what happened:

```bash
bash code-agent-loop.sh -p "Continue from where we left off..." \
  --context-file .opencode/loop-state/context.json \
  --summary-file .opencode/loop-state/summary.md
```

- `--context-file`: Exports the current session's full context via `opencode export`
- `--summary-file`: Includes a written summary in the next prompt

Both are recommended for long-running tasks. The state directory defaults to `.opencode/loop-state/`.

## Parameter Reference

Read `references/parameters.md` for the complete flag reference with defaults and examples.

## Best Practices

### Writing Effective Prompts

The prompt is the only thing the next session sees (besides optional context files). A good prompt:

- States what was accomplished in the previous session
- Points to specific files and line numbers for where work left off
- Describes the next concrete task
- References any plan files or state files to consult

Bad: `"Continue the project"`
Good: `"Continue implementing user registration. Completed: models/User.ts, routes/auth.ts. Next: add input validation in src/middleware/validate.ts and write tests in tests/auth.test.ts. See plan.md Sprint 2.3."`

### Choosing Mode

| Situation | Mode | Command |
|-----------|------|---------|
| Context getting large | Basic restart | `-p "Continue..." --summary-file ...` |
| Multi-task plan file | Chain | `--chain plan.md --max-iterations N` |
| Need full context preservation | Context passing | `--context-file ... --summary-file ...` |
| Quick interactive restart | TUI | `--tui -p "..."` |
| Repeated spawns (avoid cold boot) | Server | `--serve --port 8080` |

### Chain Mode Tips

- Start with `--max-iterations 3-5` to test, then increase
- Use `--stop-on-error` for critical tasks where failures should halt the chain
- Each chain iteration automatically marks tasks done in the plan file
- The plan file must use `- [ ]` for pending and `- [x]` for completed tasks

### Before Calling the Script

1. **Write a summary** to `.opencode/loop-state/summary.md` if using `--summary-file`
2. **Verify the plan file** exists and has unchecked tasks if using `--chain`
3. **Include the project directory** with `-d` if running from a different location
4. **Attach relevant files** with `-f` so the next session has them in context

## Script Location

The script can be at:
1. Project root: `./code-agent-loop.sh`
2. Globally installed: `~/.local/bin/code-agent-loop.sh`

If neither is found, suggest the user run `bash code-agent-loop.sh --install` from the project directory.

## Quick Reference

```bash
# Basic restart
bash code-agent-loop.sh -p "Descriptive prompt about what to do next"

# Restart with context
bash code-agent-loop.sh -p "Continue..." \
  --context-file .opencode/loop-state/context.json \
  --summary-file .opencode/loop-state/summary.md

# Chain mode (autonomous)
bash code-agent-loop.sh --chain plan.md --max-iterations 5

# Chain with error handling
bash code-agent-loop.sh --chain plan.md --max-iterations 10 --stop-on-error

# With specific model/directory
bash code-agent-loop.sh -p "Fix the bug" -d /path/to/project -m nvidia/z-ai/glm-5.1

# Server mode (persistent MCP)
bash code-agent-loop.sh --serve -p "Continue..."

# Install globally
bash code-agent-loop.sh --install
```
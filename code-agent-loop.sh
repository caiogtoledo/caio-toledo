#!/usr/bin/env bash
set -euo pipefail

readonly VERSION="1.0.0"
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
readonly TIMESTAMP="$(date +%s)"
readonly LOG_FILE="/tmp/code-agent-loop-${TIMESTAMP}.log"
readonly STATE_DIR_DEFAULT=".opencode/loop-state"

PROMPT=""
DIR=""
MODEL="nvidia/z-ai/glm-5.1"
AGENT=""
CONTINUE=false
FILES=()
TITLE=""
SESSION_ID=""
SKIP_PERMISSIONS=false
TUI_MODE=false
CHAIN_PLAN=""
MAX_ITERATIONS=10
STOP_ON_ERROR=false
CONTEXT_FILE=""
SUMMARY_FILE=""
STATE_DIR=""
SERVE_MODE=false
SERVE_PORT=""
INSTALL=false
UNINSTALL=false
RUN_TESTS=false

log() {
    local level="${1}"
    local msg="${2}"
    local ts
    ts="$(date '+%Y-%m-%d %H:%M:%S')"
    echo "[${ts}] [${level}] ${msg}" >> "${LOG_FILE}"
    if [[ "${level}" != "DEBUG" ]]; then
        if [[ "${level}" == "ERROR" ]]; then
            echo "[ERROR] ${msg}" >&2
        elif [[ "${level}" == "WARN" ]]; then
            echo "[WARN] ${msg}" >&2
        fi
    fi
}

error() {
    log "ERROR" "$1"
    exit 1
}

cleanup() {
    local exit_code=$?
    if [[ -n "${SERVE_PID:-}" ]]; then
        log "INFO" "Cleaning up server process (PID: ${SERVE_PID})"
        kill "${SERVE_PID}" 2>/dev/null || true
        wait "${SERVE_PID}" 2>/dev/null || true
    fi
    if [[ -f "${LOG_FILE}" ]]; then
        log "INFO" "Exit code: ${exit_code}"
    fi
    exit "${exit_code}"
}

trap cleanup EXIT INT TERM

usage() {
    cat <<EOF
Usage: ${SCRIPT_NAME} [OPTIONS]

Required:
  -p, --prompt TEXT          Prompt to send to the new session

Options:
  -d, --dir PATH             Working directory (default: cwd)
  -m, --model MODEL          Model to use (default: nvidia/z-ai/glm-5.1)
  -a, --agent AGENT          Agent to use
  -c, --continue             Continue last session instead of creating new
  -f, --file FILE            File(s) to attach to prompt (can be repeated)
  -t, --title TITLE          Title for the new session
  -s, --session SESSION_ID   Session ID to continue
  --skip-permissions         Use --dangerously-skip-permissions
  --tui                      Start in interactive TUI mode instead of run mode

Chain Mode:
  --chain PLAN_FILE          Execute tasks from a plan file sequentially
  --max-iterations N         Max loop iterations (default: 10)
  --stop-on-error            Stop chain if a session fails

Context Passing:
  --context-file PATH        Export session context to file before shutdown
  --summary-file PATH        Include summary file content in next prompt
  --state-dir PATH           Directory for persistent state (default: .opencode/loop-state/)

Server Mode:
  --serve                    Use opencode serve/attach pattern
  --port PORT                Port for server mode (default: random)

Utilities:
  --install                  Install script globally to ~/.local/bin
  --uninstall                Remove global installation
  --test                     Run built-in tests
  -h, --help                 Show this help
  -v, --version              Show version

Examples:
  ${SCRIPT_NAME} -p "Continue implementing feature X"
  ${SCRIPT_NAME} -p "Fix the bug" -d /path/to/project -m nvidia/z-ai/glm-5.1
  ${SCRIPT_NAME} --chain plan.md --max-iterations 5
  ${SCRIPT_NAME} -p "Continue..." --context-file .opencode/loop-state/context.json
  ${SCRIPT_NAME} --install
EOF
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -p|--prompt)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                PROMPT="$2"
                shift 2
                ;;
            -d|--dir)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                DIR="$2"
                shift 2
                ;;
            -m|--model)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                MODEL="$2"
                shift 2
                ;;
            -a|--agent)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                AGENT="$2"
                shift 2
                ;;
            -c|--continue)
                CONTINUE=true
                shift
                ;;
            -f|--file)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                FILES+=("$2")
                shift 2
                ;;
            -t|--title)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                TITLE="$2"
                shift 2
                ;;
            -s|--session)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                SESSION_ID="$2"
                shift 2
                ;;
            --skip-permissions)
                SKIP_PERMISSIONS=true
                shift
                ;;
            --tui)
                TUI_MODE=true
                shift
                ;;
            --chain)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                CHAIN_PLAN="$2"
                shift 2
                ;;
            --max-iterations)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                MAX_ITERATIONS="$2"
                shift 2
                ;;
            --stop-on-error)
                STOP_ON_ERROR=true
                shift
                ;;
            --context-file)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                CONTEXT_FILE="$2"
                shift 2
                ;;
            --summary-file)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                SUMMARY_FILE="$2"
                shift 2
                ;;
            --state-dir)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                STATE_DIR="$2"
                shift 2
                ;;
            --serve)
                SERVE_MODE=true
                shift
                ;;
            --port)
                [[ $# -lt 2 ]] && error "Option $1 requires an argument"
                SERVE_PORT="$2"
                shift 2
                ;;
            --install)
                INSTALL=true
                shift
                ;;
            --uninstall)
                UNINSTALL=true
                shift
                ;;
            --test)
                RUN_TESTS=true
                shift
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            -v|--version)
                echo "${SCRIPT_NAME} version ${VERSION}"
                exit 0
                ;;
            *)
                error "Unknown option: $1. Use --help for usage."
                ;;
        esac
    done
}

validate_args() {
    if [[ "${INSTALL}" == true ]]; then
        do_install
        exit 0
    fi

    if [[ "${UNINSTALL}" == true ]]; then
        do_uninstall
        exit 0
    fi

    if [[ "${RUN_TESTS}" == true ]]; then
        run_tests
        exit 0
    fi

    if [[ -z "${CHAIN_PLAN}" ]] && [[ -z "${PROMPT}" ]]; then
        echo "Error: --prompt is required (or use --chain)" >&2
        usage
        exit 1
    fi

    if [[ -n "${CHAIN_PLAN}" ]] && [[ ! -f "${CHAIN_PLAN}" ]]; then
        error "Chain plan file not found: ${CHAIN_PLAN}"
    fi

    for f in "${FILES[@]+"${FILES[@]}"}"; do
        if [[ ! -f "${f}" ]]; then
            error "File not found: ${f}"
        fi
    done
}

check_opencode() {
    if ! command -v opencode &>/dev/null; then
        error "opencode is not available in PATH. Install it first: https://opencode.ai"
    fi
    log "INFO" "opencode found at $(command -v opencode)"
}

save_current_session_id() {
    local session_id=""
    if [[ -n "${OPENCODE_SESSION_ID:-}" ]]; then
        session_id="${OPENCODE_SESSION_ID}"
        log "INFO" "Session ID from env: ${session_id}"
    else
        if opencode session list --format json &>/dev/null; then
            session_id="$(opencode session list --format json 2>/dev/null | grep -m1 '"id"' | head -1 | sed 's/.*"id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' || true)"
            if [[ -n "${session_id}" ]]; then
                log "INFO" "Session ID from session list: ${session_id}"
            fi
        fi
    fi
    echo "${session_id}"
}

shutdown_current_session() {
    local parent_pid="${PPID}"
    log "INFO" "Attempting to shutdown current opencode session (parent PID: ${parent_pid})"

    if [[ -z "${parent_pid}" ]] || [[ "${parent_pid}" -eq 1 ]]; then
        log "WARN" "Could not determine parent opencode PID"
        return
    fi

    if ! kill -0 "${parent_pid}" 2>/dev/null; then
        log "WARN" "Parent process ${parent_pid} is not running"
        return
    fi

    log "INFO" "Sending SIGTERM to parent process ${parent_pid}"
    kill -TERM "${parent_pid}" 2>/dev/null || true

    local waited=0
    while [[ ${waited} -lt 5 ]]; do
        if ! kill -0 "${parent_pid}" 2>/dev/null; then
            log "INFO" "Parent process ${parent_pid} terminated gracefully"
            return
        fi
        sleep 1
        waited=$((waited + 1))
    done

    if kill -0 "${parent_pid}" 2>/dev/null; then
        log "WARN" "Parent process ${parent_pid} did not terminate, sending SIGKILL"
        kill -KILL "${parent_pid}" 2>/dev/null || true
        sleep 1
        if kill -0 "${parent_pid}" 2>/dev/null; then
            error "Failed to terminate parent process ${parent_pid}"
        fi
        log "INFO" "Parent process ${parent_pid} killed"
    fi
}

build_opencode_cmd() {
    local prompt="$1"
    local cmd=()

    if [[ "${TUI_MODE}" == true ]]; then
        cmd+=(opencode)
        cmd+=(--prompt "${prompt}")
    else
        cmd+=(opencode run)
    fi

    if [[ -n "${DIR}" ]]; then
        cmd+=(--dir "${DIR}")
    fi

    if [[ -n "${MODEL}" ]]; then
        cmd+=(--model "${MODEL}")
    fi

    if [[ -n "${AGENT}" ]]; then
        cmd+=(--agent "${AGENT}")
    fi

    if [[ "${CONTINUE}" == true ]]; then
        cmd+=(--continue)
    fi

    if [[ -n "${SESSION_ID}" ]]; then
        cmd+=(--session "${SESSION_ID}")
    fi

    if [[ -n "${TITLE}" ]]; then
        cmd+=(--title "${TITLE}")
    fi

    if [[ "${SKIP_PERMISSIONS}" == true ]]; then
        cmd+=(--dangerously-skip-permissions)
    fi

    for f in "${FILES[@]+"${FILES[@]}"}"; do
        cmd+=(-f "${f}")
    done

    if [[ "${TUI_MODE}" != true ]]; then
        cmd+=("${prompt}")
    fi

    printf '%s\n' "${cmd[@]}"
}

spawn_new_session() {
    local prompt="$1"
    local cmd
    cmd="$(build_opencode_cmd "${prompt}")"

    log "INFO" "Spawning new session with command: ${cmd}"

    local exit_code=0
    if [[ "${SERVE_MODE}" == true ]]; then
        spawn_with_server "${prompt}"
        exit_code=$?
    else
        eval "${cmd}"
        exit_code=$?
    fi

    log "INFO" "Session exited with code: ${exit_code}"
    return ${exit_code}
}

start_server() {
    local port="${SERVE_PORT:-0}"

    log "INFO" "Starting opencode server on port ${port}"
    opencode serve --port "${port}" &
    SERVE_PID=$!

    sleep 2

    if ! kill -0 "${SERVE_PID}" 2>/dev/null; then
        error "Server failed to start"
    fi

    if [[ "${port}" == "0" ]]; then
        port="$(lsof -i -P -n 2>/dev/null | grep "${SERVE_PID}" | grep LISTEN | head -1 | grep -oE ':[0-9]+' | tr -d ':' || true)"
        if [[ -z "${port}" ]]; then
            port="$(ss -tlnp 2>/dev/null | grep "${SERVE_PID}" | grep -oE ':[0-9]+' | tr -d ':' || true)"
        fi
    fi

    SERVE_PORT="${port}"
    log "INFO" "Server running on PID ${SERVE_PID}, port ${SERVE_PORT}"
}

spawn_with_server() {
    local prompt="$1"

    start_server

    local cmd=(opencode run --attach "http://localhost:${SERVE_PORT}")

    if [[ -n "${DIR}" ]]; then
        cmd+=(--dir "${DIR}")
    fi
    if [[ -n "${MODEL}" ]]; then
        cmd+=(--model "${MODEL}")
    fi
    if [[ -n "${AGENT}" ]]; then
        cmd+=(--agent "${AGENT}")
    fi
    if [[ "${CONTINUE}" == true ]]; then
        cmd+=(--continue)
    fi
    if [[ -n "${SESSION_ID}" ]]; then
        cmd+=(--session "${SESSION_ID}")
    fi
    if [[ -n "${TITLE}" ]]; then
        cmd+=(--title "${TITLE}")
    fi
    if [[ "${SKIP_PERMISSIONS}" == true ]]; then
        cmd+=(--dangerously-skip-permissions)
    fi
    for f in "${FILES[@]+"${FILES[@]}"}"; do
        cmd+=(-f "${f}")
    done
    cmd+=("${prompt}")

    log "INFO" "Attaching to server with command: ${cmd[*]}"
    "${cmd[@]}"
}

export_context() {
    local session_id
    session_id="$(save_current_session_id)"

    if [[ -z "${session_id}" ]]; then
        log "WARN" "No session ID available for context export"
        return
    fi

    local out_file="${CONTEXT_FILE}"
    if [[ -z "${out_file}" ]]; then
        out_file="${STATE_DIR:-${STATE_DIR_DEFAULT}}/context.json"
    fi

    mkdir -p "$(dirname "${out_file}")"

    log "INFO" "Exporting session context to ${out_file}"
    if opencode export "${session_id}" --sanitize > "${out_file}" 2>/dev/null; then
        log "INFO" "Context exported successfully"
    else
        log "WARN" "Failed to export session context"
    fi
}

build_prompt_with_context() {
    local base_prompt="$1"
    local result="${base_prompt}"

    if [[ -n "${SUMMARY_FILE}" ]] && [[ -f "${SUMMARY_FILE}" ]]; then
        local summary
        summary="$(cat "${SUMMARY_FILE}")"
        result="${result}

--- Previous Session Summary ---
${summary}
--- End Summary ---"
        log "INFO" "Appended summary from ${SUMMARY_FILE}"
    fi

    if [[ -n "${CONTEXT_FILE}" ]] && [[ -f "${CONTEXT_FILE}" ]]; then
        result="${result}

--- Session Context ---
Reference file: ${CONTEXT_FILE}
--- End Context ---"
        log "INFO" "Referenced context file ${CONTEXT_FILE}"
    fi

    echo "${result}"
}

find_next_task() {
    local plan_file="$1"
    grep -n '^\- \[ \]' "${plan_file}" | head -1 || true
}

mark_task_done() {
    local plan_file="$1"
    local line_num="$2"
    sed -i '' "${line_num}s/- \[ \]/- [x]/" "${plan_file}" 2>/dev/null || \
    sed -i "${line_num}s/- \[ \]/- [x]/" "${plan_file}" 2>/dev/null || true
}

get_task_description() {
    local task_line="$1"
    echo "${task_line}" | sed 's/^\- \[ \] *//'
}

run_chain() {
    local plan_file="${CHAIN_PLAN}"
    local iteration=0
    local state_base="${STATE_DIR:-${STATE_DIR_DEFAULT}}"
    mkdir -p "${state_base}"

    log "INFO" "Starting chain mode with plan: ${plan_file}, max iterations: ${MAX_ITERATIONS}"

    while [[ ${iteration} -lt ${MAX_ITERATIONS} ]]; do
        local next_task
        next_task="$(find_next_task "${plan_file}")"

        if [[ -z "${next_task}" ]]; then
            log "INFO" "No more tasks in plan file. Chain complete."
            echo "All tasks completed in ${plan_file}."
            return 0
        fi

        iteration=$((iteration + 1))
        local line_num
        line_num="$(echo "${next_task}" | cut -d: -f1)"
        local task_desc
        task_desc="$(get_task_description "$(echo "${next_task}" | cut -d: -f2-)")"

        log "INFO" "Iteration ${iteration}/${MAX_ITERATIONS}: Task at line ${line_num}: ${task_desc}"

        local chain_prompt="Execute the next task from the plan in ${plan_file}: ${task_desc}"

        if [[ -n "${PROMPT}" ]]; then
            chain_prompt="${PROMPT} - ${chain_prompt}"
        fi

        chain_prompt="$(build_prompt_with_context "${chain_prompt}")"

        shutdown_current_session

        local exit_code=0
        spawn_new_session "${chain_prompt}" || exit_code=$?

        if [[ ${exit_code} -ne 0 ]]; then
            log "ERROR" "Session failed with exit code ${exit_code}"
            if [[ "${STOP_ON_ERROR}" == true ]]; then
                error "Stopping chain due to error (exit code ${exit_code})"
            fi
            log "WARN" "Continuing chain despite error"
        fi

        mark_task_done "${plan_file}" "${line_num}"
        log "INFO" "Marked task at line ${line_num} as done"
    done

    log "INFO" "Chain reached max iterations (${MAX_ITERATIONS})"
    echo "Chain stopped after ${MAX_ITERATIONS} iterations."
}

do_install() {
    local target_dir="${HOME}/.local/bin"
    local target="${target_dir}/${SCRIPT_NAME}"

    mkdir -p "${target_dir}"

    cp "${SCRIPT_DIR}/${SCRIPT_NAME}" "${target}"
    chmod +x "${target}"

    echo "Installed to ${target}"

    if ! echo "${PATH}" | grep -q "${target_dir}"; then
        echo ""
        echo "WARNING: ${target_dir} is not in your PATH."
        echo "Add it by running:"
        echo "  echo 'export PATH=\"${target_dir}:\$PATH\"' >> ~/.zshrc"
        echo "  source ~/.zshrc"
    fi
}

do_uninstall() {
    local target="${HOME}/.local/bin/${SCRIPT_NAME}"

    if [[ -f "${target}" ]]; then
        rm "${target}"
        echo "Uninstalled ${target}"
    else
        echo "Not installed at ${target}"
    fi
}

run_tests() {
    local passed=0
    local failed=0

    test_usage() {
        if bash "${SCRIPT_DIR}/${SCRIPT_NAME}" 2>/dev/null; then
            echo "FAIL: test_usage - should exit with code 1 without --prompt"
            return 1
        else
            echo "PASS: test_usage"
            return 0
        fi
    }

    test_opencode_available() {
        local result
        result="$(bash "${SCRIPT_DIR}/${SCRIPT_NAME}" -p "test" --test-dry-run 2>&1 || true)"
        if echo "${result}" | grep -q "opencode found"; then
            echo "PASS: test_opencode_available"
            return 0
        else
            echo "SKIP: test_opencode_available (opencode may not be installed)"
            return 0
        fi
    }

    test_prompt_passed() {
        local result
        result="$(MOCK_OPENCODE=1 bash "${SCRIPT_DIR}/${SCRIPT_NAME}" -p "hello world" 2>&1 || true)"
        if echo "${result}" | grep -q "hello world"; then
            echo "PASS: test_prompt_passed"
            return 0
        else
            echo "FAIL: test_prompt_passed"
            return 1
        fi
    }

    test_install_uninstall() {
        local tmp_bin
        tmp_bin="$(mktemp -d)"
        HOME="${tmp_bin}" bash "${SCRIPT_DIR}/${SCRIPT_NAME}" --install 2>/dev/null
        if [[ -f "${tmp_bin}/.local/bin/${SCRIPT_NAME}" ]]; then
            echo "PASS: test_install"
            HOME="${tmp_bin}" bash "${SCRIPT_DIR}/${SCRIPT_NAME}" --uninstall 2>/dev/null
            if [[ ! -f "${tmp_bin}/.local/bin/${SCRIPT_NAME}" ]]; then
                echo "PASS: test_uninstall"
                rm -rf "${tmp_bin}"
                return 0
            else
                echo "FAIL: test_uninstall"
                rm -rf "${tmp_bin}"
                return 1
            fi
        else
            echo "FAIL: test_install"
            rm -rf "${tmp_bin}"
            return 1
        fi
    }

    echo "Running tests..."

    for t in test_usage test_opencode_available test_prompt_passed test_install_uninstall; do
        if ${t}; then
            passed=$((passed + 1))
        else
            failed=$((failed + 1))
        fi
    done

    echo ""
    echo "Results: ${passed} passed, ${failed} failed"
    [[ ${failed} -eq 0 ]] && exit 0 || exit 1
}

main() {
    parse_args "$@"
    validate_args

    log "INFO" "=== code-agent-loop v${VERSION} ==="
    log "INFO" "Arguments: $*"

    if [[ -n "${CHAIN_PLAN}" ]]; then
        check_opencode
        if [[ -n "${CONTEXT_FILE}" ]]; then
            export_context
        fi
        run_chain
        exit $?
    fi

    check_opencode

    if [[ -n "${CONTEXT_FILE}" ]]; then
        export_context
    fi

    local final_prompt
    final_prompt="$(build_prompt_with_context "${PROMPT}")"

    shutdown_current_session

    spawn_new_session "${final_prompt}"
}

main "$@"

# Pi configuration package

A Pi package with global agent rules, 14 local skills, a project-local Git status widget, and four third-party resources installed as dependencies.

## Contents

| Path | What it is |
| --- | --- |
| `AGENTS.md` | Agent rules for this project |
| `skills/` | 14 self-contained local skills |
| `.pi/extensions/git-status-widget.ts` | Git status widget; reads Git status only |
| `package.json` | Pi manifest and dependency list |
| `package-lock.json` | Pinned dependency versions |

Third-party resources load from `node_modules/`:

| Resource | Package |
| --- | --- |
| Question UI | `@juicesharp/rpiv-ask-user-question` |
| Tick scheduler | `pi-tick` |
| Subagents | `pi-subagents` |
| Ponytail | `@dietrichgebert/ponytail` |

Verified with the Pi loader: 5 extensions, 22 skills (14 local, 6 ponytail, 2 subagents), and 6 prompts.

## Setup

Run both commands from this directory, in this order:

```sh
npm install
pi install .
```

`npm install` is required first. Pi copies a local path into settings without installing its dependencies, so nothing resolves until you install them.

The install uses about 536 MB on disk. `pi-subagents` depends on Pi's `pi-server`, which pulls the AI SDK chain. `node_modules/` is not tracked by Git.

## Avoid duplicate loading

Pi deduplicates resources by real file path. A globally installed copy and this repository copy are different paths, so both load and you get duplicate tools and commands.

If a package is already installed globally, keep only one copy:

```sh
pi list                          # see current registrations
pi remove npm:pi-subagents       # remove the copy you do not want
```

## Security

Pi extensions run with full system access. Review extensions and skills before you use them. This repository contains no secrets and no private configuration.

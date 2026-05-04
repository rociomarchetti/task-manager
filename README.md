# Task Manager

A task and board management SPA built with Angular 20, NgRx, and Nx — designed with production-level architecture in mind.

> The backend is mocked with localStorage, but the entire data layer is built around observables and async patterns so that replacing it with a real API requires no changes to the domain or state logic.

---

## Table of contents

- [Overview](#overview)
- [Architecture decisions](#architecture-decisions)
  - [Domain-Driven Design with Nx](#domain-driven-design-with-nx)
  - [Facade pattern](#facade-pattern)
  - [View models](#view-models)
  - [State management with NgRx](#state-management-with-ngrx)
  - [Mocked async backend](#mocked-async-backend)
- [Testing strategy](#testing-strategy)
- [Project structure](#project-structure)
- [Features](#features)
- [Getting started](#getting-started)

---

## Overview

This project is a kanban-style task manager with board and task CRUD, drag and drop, filtering, search, and authentication. It was built as a self-contained project to demonstrate architecture decisions that reflect real production team dynamics — not just Angular feature knowledge.

---

## Architecture decisions

### Domain-Driven Design with Nx

The workspace is organized around domains, not technical layers. Each domain (e.g. `boards`, `tasks`, `auth`) is a self-contained Nx library with its own `domain`, `feature`, and `ui` folders.

This means related code lives together. Adding or modifying a domain doesn't require touching unrelated parts of the codebase, and Nx enforces boundaries between libraries to prevent unwanted coupling.

### Facade pattern

Each domain exposes a **facade** — a single injectable service that acts as the interface between the feature layer and the NgRx store.

The feature component's only responsibilities are:
- Rendering UI components
- Forwarding user events to the facade
- Injecting the view model

It dispatches no actions directly and contains no business logic. This keeps features readable at a glance: you can see exactly what data flows in and what events flow out, without needing to understand the state layer underneath.

```
Feature component
  ├── injects: ViewModel (from selectors via facade)
  └── calls: facade methods → dispatch actions → effects / reducers
```

The facade also defines the **testable boundary** of the domain. Since the feature delegates entirely to the facade, testing the facade covers the domain's behavior without needing to test the feature itself.

### View models

Each domain defines its own view model — a typed interface that represents exactly what the feature needs to render, nothing more.

The view model is composed in **selectors**, not in the component. This means:

- Filtering, mapping, and combining state happens in the selector layer, where it's testable and reusable
- The reducer stays clean — it stores raw data, not derived or display-specific shapes
- The feature component receives ready-to-use data with no transformation logic of its own

When what the UI needs diverges from what the store holds, the selector handles that gap. The component never does.

### State management with NgRx

NgRx manages state for all dynamic domain data: tasks, boards, and authentication status. Effects handle async operations (data fetching, persistence), keeping reducers pure and synchronous.

**What does not go into the store:**

Static or purely local data stays out of NgRx. If a piece of data doesn't change in response to user actions or async events — for example, the list of actions available to a button — it lives in the UI component itself. Putting static data in global state adds overhead with no benefit.

### Mocked async backend

The data layer uses localStorage for persistence, but all operations are wrapped in observables and simulate network latency. This was a deliberate decision: it forces the rest of the architecture (effects, loading states, error handling) to behave exactly as it would against a real API.

Swapping in a real backend only requires replacing the data service implementations. The domain logic, state management, and UI layers are completely unaffected.

---

## Testing strategy

Domain logic is tested with **Jest**, following a TDD approach. The covered files are:

- **Facades** — the primary behavioral contracts of each domain
- **Effects** — async flows and side effect handling
- **Reducers** — state transitions given specific actions
- **Selectors** — derived state and view model composition

Feature components are not tested directly. Since they contain no logic — only delegation to the facade and rendering of the view model — testing the facade gives full confidence in the domain's behavior.

---

## Project structure

```
core/
    guards/
    layout/
    services/
features/
  board/
    domain/         # facade, store (actions, effects, reducers, selectors), models
    feature/        # smart component — composes UI, connects facade and view model
    ui/             # presentational components (board card, board list...)
shared/
    models/
    ui/
```

---

## Features

- Board and task CRUD
- Drag and drop to reorder tasks and update their status within a board
- Search and filter (tasks and boards)
- Lazy loading per section — Dashboard and Board list load independently
- Dynamic routing with board ID for board detail view
- Route guards based on authentication state
- Reactive forms with validation
- Responsive, mobile-first UI

---

## Getting started

```bash
# Install dependencies
npm install

# Serve the app
npx nx serve task-manager

# Run tests
npx nx test <library-name>

# Run all tests
npx nx run-many --target=test --all
```

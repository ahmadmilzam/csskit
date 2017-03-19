CSSkit - SASS Based, BEM, OOCSS Framework
======

## Getting started

This is the interim documentation for the framework. Until we get some proper stuff in place, I hope this will see to 90% of questions and issues.

## What is it?

CSSkit is a powerful, Sass-based, BEM, OOCSS framework designed with scalability and performance in mind. It has a tiny footprint, every variants is disabled by default (comes in at ~2KB, gzipped), and can be scaled as much or as little as you need.

## Import order

It is important that you as the developer piece things together in the correct order. That order is:

* **Settings:** Global variables, site-wide settings, config switches, etc.
* **Tools:** Site-wide mixins and functions.
* **Generic:** Low-specificity, far-reaching rulesets (e.g. resets).
* **Elements:** Unclassed HTML elements (e.g. `a {}`, `blockquote {}`, `address {}`).
* **Objects:** Objects, abstractions, and design patterns (e.g. `.media {}`).
* **Components:** Discrete, complete chunks of UI (e.g. `.carousel {}`). This is
  the one layer that the framework doesn’t get involved with.
* **Utilities:** High-specificity, very explicit selectors. Overrides and helper classes (e.g. `.hidden {}`) and the only place where `!important` is allowed.

The order of partials within each layer is fairly open; it is the sections themselves that are important to get in the correct order.

### Edit and compile documentation page

#### 1. go to docs/ directory:
```sh
$ cd docs
```

#### 2. run sass and sass watch:

```sh
$ sass --watch scss/docs.scss:page/docs.css
```

#### 3. You are all set to go

N.B. All partials—including your own—follow the `<section>.<file>` naming convention, e.g. `_objects.box.scss`, `_components.navbar.scss`.

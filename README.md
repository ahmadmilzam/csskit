======
CSSkit
======

SASS Based, BEM, OOCSS Framework

# Getting started

This is the interim documentation for the new CSSkit. Until we get some proper
stuff in place, I hope this will see to 90% of questions and issues.

## What is CSSkit?

inuitcss is a powerful, Sass-based, BEM, OOCSS framework designed with scalability
and performance in mind. It has a tiny footprint (the [Starter
Kit]((https://github.com/inuitcss/starter-kit)) comes in at ~1KB, gzipped), and
can be scaled as much or as little as you need.

## Import order

It is important that you as the developer piece things together in the correct order. That order is:


* **Settings:** Global variables, site-wide settings, config switches, etc.
* **Tools:** Site-wide mixins and functions.
* **Generic:** Low-specificity, far-reaching rulesets (e.g. resets).
* **Base:** Unclassed HTML elements (e.g. `a {}`, `blockquote {}`, `address {}`).
* **Objects:** Objects, abstractions, and design patterns (e.g. `.media {}`).
* **Components:** Discrete, complete chunks of UI (e.g. `.carousel {}`). This is
  the one layer that inuitcss doesn’t get involved with.
* **Utilities:** High-specificity, very explicit selectors. Overrides and helper
  classes (e.g. `.hidden {}`).

The order of partials within each layer is fairly open; it is the sections themselves that are important to get in the correct order.

N.B. All partials—including your own—follow the my-<section>.<file> naming convention, e.g. _objects.box.scss, _components.carousel.scss.

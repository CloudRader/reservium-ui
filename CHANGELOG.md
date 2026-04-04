# Changelog

## [2.3.1](https://github.com/CloudRader/reservium-ui/compare/v2.3.0...v2.3.1) (2026-04-04)


### 🛠️ Fixes

* keycloak realm ([391e6d1](https://github.com/CloudRader/reservium-ui/commit/391e6d1a8e699fb5cbf9045c4e15a2f977500ba9))
* keycloak realm ([#16](https://github.com/CloudRader/reservium-ui/issues/16)) ([7be46f1](https://github.com/CloudRader/reservium-ui/commit/7be46f1e484613484066e3d10e68e9a077cbfc3b))

## [2.3.0](https://github.com/CloudRader/reservium-ui/compare/v2.2.2...v2.3.0) (2026-04-04)


### ✨ New Features

* update ui, fix bugs with relations and keycloak ([#14](https://github.com/CloudRader/reservium-ui/issues/14)) ([a67f53d](https://github.com/CloudRader/reservium-ui/commit/a67f53dccadc94a258d243c10794bdd81bc69e6a))


### 🧱 Updates & Improvements

* update .gitignore, bump package versions, and replace outdated assets ([11d7940](https://github.com/CloudRader/reservium-ui/commit/11d79401035e846c7e30d95da31b037665139f25))
* update dependencies and add new assets ([20a27e4](https://github.com/CloudRader/reservium-ui/commit/20a27e4bbf6c8370ed249b907e0bec19451b9484))


### 🛠️ Fixes

* keycloak ([07a9350](https://github.com/CloudRader/reservium-ui/commit/07a9350285c06de43c898bc0d8381d335e12f709))
* simplify reservation data query ([a4fedce](https://github.com/CloudRader/reservium-ui/commit/a4fedce42d10a4c2cb9e844322332a6f4718b8b1))


### 🧹 Refactors

* update Keycloak configuration to use environment variables ([b354349](https://github.com/CloudRader/reservium-ui/commit/b354349bce09324c70e419e15d8c7e47c57001f5))
* update project to use APP_SETTINGS and move date formatting functions to dateUtils ([6690bfb](https://github.com/CloudRader/reservium-ui/commit/6690bfb11685655e0f79c7394d5f6ed42050f85b))

## [2.2.2](https://github.com/CloudRader/reservium-ui/compare/v2.2.1...v2.2.2) (2025-12-07)


### ⚙️ DevOps & CI/CD

* **release-please:** add job for autogenarate release notes and tags ([#12](https://github.com/CloudRader/reservium-ui/issues/12)) ([5341ef6](https://github.com/CloudRader/reservium-ui/commit/5341ef686205a7b6d438b6e70ab9fd6a42123bb4))


## [2.2.1](https://github.com/CloudRader/reservium-ui/compare/v2.0.0...v2.2.1) (2025-11-24)


### 🚀 Reservium UI v2.2.1 — Minor Auth & CI Fixes

A minor release focused on fixing authentication issues, correcting API usage, view mode correction and stabilizing CI/CD behavior.


#### ✨ Highlights

- 🔐 Fixed authentication handling for views and corrected several endpoints (#11)
- 📅 Fixed reservationData query and calendar/mini-service editing
- 🧭 Updated routing and auth structure (KeycloakContext, ProtectedRoute, ManagerRoute)
- 🎨 Added Main Layout


#### 🛠️ Fixes

- Fixed hot query issues (#10)
- Switched to correct non-public API endpoints
- Fixed manager update logic and domain handling (#9)
- Removed push-hash tag and kept only latest tag on dev
- Corrected API URL usage


####🧪 CI/CD & Tooling

- Added API_BASE_URL as build env
- Fixed env/var usage in actions
- Ensured proper image build on develop


#### 🧹 Refactor

- Restructured auth and routing logic
- Updated axios interceptors and fetch configuration
- Refactored useAuth and useReservationData


**Released:** 24 November 2025  
**Maintainer:** [daniilk11()


## [2.0.0](https://github.com/CloudRader/reservium-ui/compare/v1.0.0...v2.0.0) (2025-10-25)


### 🚀 Reservium Frontend v2.0.0 — Major Update

Complete frontend modernization featuring seamless Keycloak authentication, a faster Vite build system, and an intuitive, enhanced interface for event and reservation management.


### ✨ New Features

- ✅ **Manager Panel** — manage calendars, mini-services, and reservations in one unified workspace.  
- ✅ **Event Dashboard** — view upcoming, past, and managed events, with tools to approve, decline, or request time changes.  
- ✅ **Simplified Reservation Forms** — redesigned with dynamic fields, multi-checkbox support, and improved validation for smoother booking.  
- ✅ **Improved Event Management** — users and managers can now track and modify event requests directly from the dashboard.  
- ✅ **Public View Mode** — browse available calendars and services without logging in.  
- ✅ **Enhanced Authentication Flow** — seamless login/logout via Keycloak with improved security.  
- ✅ **Performance Upgrades** — faster load times, smoother transitions, and cleaner app flow.  


### ✴️ Updates & Improvements

- ✴️ Updated all service and calendar edit views with a consistent design and improved UX.  
- ✴️ Improved data fetching using React Query and standardized API handling.  
- ✴️ Unified time and date formatting for clarity across the UI.  
- ✴️ Refined dashboard layout and responsiveness using Tailwind’s grid system.  
- ✴️ Migrated build system from **CRA** to **Vite** for faster development and smaller bundles.  
- ✴️ Added **ESLint** and **Prettier** for consistent code formatting.  
- ✴️ Updated **TailwindCSS** configuration with custom utilities for layouts.  
- ✴️ Improved caching and API proxy configuration for smoother data handling.  
- ✴️ Updated folder structure and `.gitignore` for cleaner project organization.  
- ✴️ Integrated frontend with GitHub Actions for automated builds and Docker image publishing.


### 🧹 Refactoring

- 🧹 Reorganized the component structure for better maintainability and clarity.  
- 🧹 Refactored form logic into reusable hooks (`useReservationFormLogic`, `useCreateFormLogic`, `useSlotSync`).  
- 🧹 Streamlined route structure — separated logic for user, manager, and public views.  
- 🧹 Cleaned codebase — removed unused components, optimized imports, and standardized naming.  


### 🛠️ Fixes

- 🛠️ Corrected API endpoints and environment variable handling.  
- 🛠️ Fixed login, token refresh, and redirect issues.  
- 🛠️ Resolved pagination, event filtering, and service display problems.  
- 🛠️ Corrected registration form submission and validation errors.  
- 🛠️ Reservation form no longer reloads on error — previously entered data now remains intact.
- 🛠️ Fixed event update and deletion logic for managers.  
- 🛠️ Resolved minor layout issues across responsive breakpoints.  


### ❌ Removed / Deprecated

- ❌ **Legacy token management** replaced with Keycloak authentication.  
- ❌ **Old reservation logic** in forms deprecated in favor of new hooks.  
- ❌ **Deprecated components** removed: `useReservationLogic.js`, old `EventCard` mobile version, and unused helpers.  
- ❌ **Old TailwindCSS configuration** replaced with updated custom utilities.  
- ❌ **Commented-out routes and test components** removed from `App.js`.  
- ❌ **Old form field handlers** deprecated; now consistently handled via `FormFieldRenderer` and associated hooks.  


### ⚙️ DevOps & CI/CD

- ✅ Automated **SemVer tagging** and image versioning  
- ✅ Docker Hub publishing workflow integrated  


### 🏁 Summary

Reservium v2.0.0 is a **major milestone**, delivering:

- Modernized, maintainable frontend architecture  
- Unified CI/CD pipelines with automated builds and Docker publishing  
- Scalable authentication and permission management through Keycloak  
- Enhanced event and reservation management with the **Manager Panel** and **Event Dashboard**  
- Faster performance, improved UX, and consistent UI across all screens  


**Released:** 25 October 2025  
**Maintainer:** [daniilk11]()

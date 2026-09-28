# Project Change Impact Intelligence

### AI-Assisted Decision Support for Product & Requirement Changes

An AI-assisted product decision-support prototype that helps Product Managers and engineering teams understand the downstream impact of proposed requirement or implementation changes before approval.

## 🚀 Live Demo

**[Open the Live Demo](https://project-change-impac-azip.bolt.host/)**

## 💡 Product Concept

Product and engineering changes rarely affect only one requirement or one team.

A seemingly simple change can impact:

* Product requirements
* Engineering components
* Multiple teams
* Tasks and dependencies
* Engineering effort
* Delivery timelines
* Critical-path work
* Risks and assumptions

**Project Change Impact Intelligence** provides an AI-assisted analysis layer before a proposed change is approved.

### Core Workflow

**Proposed Change → AI Interpretation → Impact Mapping → Affected Teams → Impacted Tasks → Dependency Analysis → Effort Estimation → Schedule Impact → Critical Path → Risks & Assumptions → Recommended Actions → Human Approval**

## ✨ Key Capabilities

* Natural-language proposed change input
* AI-assisted change interpretation
* Affected team identification
* Impacted task generation
* Dependency analysis
* Critical-path identification
* Effort estimation in person-days
* Schedule-impact estimation in calendar days
* Parallelizable work identification
* Risk and assumption analysis
* Confidence and uncertainty visibility
* Explainable recommendations
* Human-in-the-loop approval

## 🧪 Example Scenarios

The prototype can analyze different categories of product and implementation changes, including:

* Enterprise SSO / SAML authentication
* AI-powered document classification
* Multilingual product support
* Security and authentication changes
* Data and AI/ML changes
* UI/UX changes
* Integration and API changes
* Compliance and privacy changes
* Infrastructure and DevOps changes
* Payment and financial changes
* Reporting and analytics changes

Example input:

> Enterprise customers now require SSO using SAML before the next release.

The system analyzes the proposed change and identifies affected teams, tasks, dependencies, estimated effort, schedule impact, critical-path impact, risks, assumptions, and recommended actions.

## 🧠 Product Design Principles

### AI assists. Humans decide.

The system is designed as a **decision-support layer**, not an autonomous decision maker.

**AI Analysis → Impact Assessment → Recommendation → HUMAN APPROVAL**

The AI generates analysis, estimates, explanations, and recommendations. Final approval remains with the Product Manager or responsible human decision maker.

### Explainability

The system surfaces why teams and tasks are affected instead of providing only a final recommendation.

### Effort ≠ Schedule

Person-days and calendar-day impact are treated separately.

Parallelizable work and dependencies are considered when estimating delivery impact.

### Uncertainty Is Visible

The system surfaces confidence, assumptions, missing information, and risks instead of presenting estimates as guaranteed outcomes.

## 🏗️ Prototype Architecture

* React
* TypeScript
* Vite
* Tailwind CSS
* Client-side deterministic change-analysis engine
* No backend database
* No authentication system
* No paid AI APIs
* No external model/API keys

The current prototype focuses on demonstrating the **product concept, decision-support workflow, and enterprise UX**.

## 📸 Screenshots

### Proposed Change

![Proposed Change](screenshots/proposed-change.png)

Natural-language input for describing a proposed product or implementation change.

### Change Impact Assessment

![Change Impact Assessment](screenshots/change-impact-assessment.png)

High-level assessment of affected teams, effort, schedule impact, and critical-path impact.

### Affected Teams & Tasks

![Affected Teams and Tasks](screenshots/affected-teams-tasks.png)

Breakdown of affected teams, newly created or modified work, dependencies, effort, and parallelizable tasks.

### Dependency & Critical Path

![Dependency and Critical Path](screenshots/dependency-critical-path.png)

Visualization of the change-to-task dependency chain and critical-path considerations.

### Delivery Impact & Risks

![Delivery Impact and Risks](screenshots/delivery-impact-risks.png)

Estimated delivery impact, assumptions, dependencies, and identified risks.

### Human Approval

![Human Approval](screenshots/human-approval.png)

AI-generated recommendations remain subject to human review and approval.

## 🎯 Why I Built This

Traditional change-impact analysis often depends on manually tracing requirements, components, dependencies, teams, and delivery plans.

This prototype explores how AI can act as a **product decision-support layer** that helps teams understand the consequences of a proposed change before committing to it.

The goal is not to replace Product Managers or engineering leads.

The goal is to help them answer:

> **"If we make this change, what else will be affected?"**

## 📌 Current Scope

This is a working product prototype demonstrating:

* Natural-language change analysis
* Dynamic impact assessment
* Team and task mapping
* Dependency analysis
* Effort estimation
* Schedule-impact estimation
* Critical-path analysis
* Risk and assumption identification
* Explainable recommendations
* Human-in-the-loop approval

It is currently intended as a **product prototype and decision-support demonstration**, not a production project-management system.

## 👤 Author

**Rajesh Y**

AI Product Management | AI Products | Product Discovery | Voice AI | Generative AI | B2B SaaS

* LinkedIn: [Rajesh Y](https://linkedin.com/in/rajesh-y1/)
* GitHub: [RajeshY1](https://github.com/RajeshY1)
* Portfolio: [AI Product Portfolio](https://rajesh-ai-portfolio.vercel.app/)

---

**Project Status:** Working Prototype

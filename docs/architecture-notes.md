# Production Architecture Notes

The diagram describes how this assignment can evolve into a production vacation-rental marketplace rather than presenting the current static clone as a production backend.

## Request path

Web and mobile clients reach the system through DNS, a CDN, web application firewall, and edge routing. Static application assets and listing media are cached at the edge. Server-rendered or API-driven experiences pass through an API gateway or backend-for-frontend layer that handles authentication, request shaping, rate limits, and versioning.

## Domain services

The service boundary follows business capabilities: identity, listings, availability, search, pricing, booking, payments, reviews, media, notifications, and administration. This lets high-read workloads such as search and listing discovery scale separately from consistency-sensitive booking and payment flows.

## Data and search

- PostgreSQL stores transactional entities and uses read replicas and partitioning as volume grows.
- Redis provides cache, session, rate-limit, and short-lived availability data.
- OpenSearch holds denormalized geo and faceted-search indexes.
- Object storage holds listing media behind the CDN.
- An event bus connects domain changes to indexing, notifications, analytics, and audit consumers.

Booking writes should use database transactions, idempotency keys, and temporary inventory holds to prevent double booking. Search indexes and caches update asynchronously from committed domain events.

## Deployment and scaling

Services run in containers across multiple availability zones. Horizontal autoscaling responds to request rate, queue depth, and latency. Infrastructure as code creates reproducible environments. CI/CD uses progressive delivery with health checks and rollback. Centralized logs, metrics, traces, alerting, secrets management, backups, and disaster-recovery procedures support operations.

## Resilience and security

The gateway enforces authentication and abuse controls. Services receive least-privilege identities and encrypted secrets. Payment details remain with a PCI-compliant external provider. Retries use exponential backoff and idempotency; circuit breakers isolate provider failures. Multi-zone databases, tested backups, and defined recovery objectives protect critical reservation data.


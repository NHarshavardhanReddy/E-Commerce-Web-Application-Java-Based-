# Security Fix Results (20260416172145)

- **Project**: ecommerce
- **Completed**: 2026-04-16T22:58:00
- **Duration**: 15m
- **Build attempts**: 2 (1 failed, 1 succeeded)
- **Plan**: `.github/java-upgrade/20260416172145/plan.md`
- **Version control**: Not available / git not detected

## CVE Results

| # | CVE | Dependency | Status |
|---|-----|------------|--------|
| 1 | [CVE-2023-22102](https://github.com/advisories/GHSA-m6vm-37g8-gqvh) | com.mysql:mysql-connector-j | ✅ Fixed (8.0.33 → 8.2.0) |

## Deprecated API Results

No deprecated API changes were part of this fix.

## Summary

- **Build status**: ✅ Passing
- **CVEs fixed**: 1/1
- **Remaining**: 0

## Changes Made

- `backend/pom.xml`: upgraded `com.mysql:mysql-connector-j` from `8.0.33` to `8.2.0`
- `backend/pom.xml`: upgraded `org.projectlombok:lombok` to `1.18.44` and enabled explicit annotation processing for Lombok
- `backend/src/main/java/com/example/ecommerce/config/CorsConfig.java`: corrected `WebMvcConfigurer` override to `addCorsMappings`

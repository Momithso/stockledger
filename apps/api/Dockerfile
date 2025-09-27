# Dockerfile
# === base ===
FROM node:22.20.0-alpine3.22 AS base
RUN corepack enable

# === deps ===
FROM base AS deps
WORKDIR /usr/src/app
# Kopiere Monorepo-Konfiguration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY turbo.json ./
# Kopiere alle package.json Dateien für dependency resolution
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

# === build ===
FROM base AS build
WORKDIR /usr/src/app
# Kopiere Monorepo-Konfiguration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY turbo.json ./
# Kopiere alle package.json Dateien
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
# Kopiere Source Code
COPY . .
# Baue nur die API App
RUN pnpm build --filter=api

# === dev ===
FROM base AS dev
WORKDIR /usr/src/app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "run", "container", "--filter=api"]

# === runner ===
FROM node:22.20.0-alpine3.22 AS runner
RUN corepack enable
WORKDIR /usr/src/app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs

# Kopiere nur was für Production gebraucht wird
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=build /usr/src/app/package.json ./package.json

USER expressjs

ENV NODE_ENV=production
CMD ["node", "apps/api/dist/index.js"]


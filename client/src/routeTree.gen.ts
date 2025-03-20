/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SnakeImport } from './routes/snake'
import { Route as RoadMapImport } from './routes/road-map'
import { Route as PlayImport } from './routes/play'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SnakeRoute = SnakeImport.update({
  id: '/snake',
  path: '/snake',
  getParentRoute: () => rootRoute,
} as any)

const RoadMapRoute = RoadMapImport.update({
  id: '/road-map',
  path: '/road-map',
  getParentRoute: () => rootRoute,
} as any)

const PlayRoute = PlayImport.update({
  id: '/play',
  path: '/play',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/play': {
      id: '/play'
      path: '/play'
      fullPath: '/play'
      preLoaderRoute: typeof PlayImport
      parentRoute: typeof rootRoute
    }
    '/road-map': {
      id: '/road-map'
      path: '/road-map'
      fullPath: '/road-map'
      preLoaderRoute: typeof RoadMapImport
      parentRoute: typeof rootRoute
    }
    '/snake': {
      id: '/snake'
      path: '/snake'
      fullPath: '/snake'
      preLoaderRoute: typeof SnakeImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/play': typeof PlayRoute
  '/road-map': typeof RoadMapRoute
  '/snake': typeof SnakeRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/play': typeof PlayRoute
  '/road-map': typeof RoadMapRoute
  '/snake': typeof SnakeRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/play': typeof PlayRoute
  '/road-map': typeof RoadMapRoute
  '/snake': typeof SnakeRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/play' | '/road-map' | '/snake'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/play' | '/road-map' | '/snake'
  id: '__root__' | '/' | '/about' | '/play' | '/road-map' | '/snake'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  PlayRoute: typeof PlayRoute
  RoadMapRoute: typeof RoadMapRoute
  SnakeRoute: typeof SnakeRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  PlayRoute: PlayRoute,
  RoadMapRoute: RoadMapRoute,
  SnakeRoute: SnakeRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/play",
        "/road-map",
        "/snake"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/play": {
      "filePath": "play.tsx"
    },
    "/road-map": {
      "filePath": "road-map.tsx"
    },
    "/snake": {
      "filePath": "snake.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

import type { FallbackMode } from '../../lib/fallback'
import type { Params } from '../../server/request/params'
import type { DynamicParamTypes } from '../../shared/lib/app-router-types'

type StaticPrerenderedRoute = {
  readonly params: Params
  readonly pathname: string
  readonly encodedPathname: string
  readonly fallbackRouteParams: undefined
  readonly fallbackMode: FallbackMode | undefined
  readonly fallbackRootParams: undefined
  remainingPrerenderableParams?: undefined
  readonly isPrerenderOutput?: undefined

  /**
   * When enabled, the route will be rendered with diagnostics enabled which
   * will error the build if the route that is generated is empty.
   */
  throwOnEmptyStaticShell: undefined
}

export type FallbackRouteParam = {
  /**
   * The name of the param.
   */
  readonly paramName: string

  /**
   * The type of the param.
   */
  readonly paramType: DynamicParamTypes
}

type FallbackPrerenderedRoute = {
  readonly params: Params
  readonly pathname: string
  readonly encodedPathname: string

  /**
   * The fallback route params for the route. This includes all route parameters
   * that are unknown at build time, from both the main children route and any
   * parallel routes.
   */
  readonly fallbackRouteParams: readonly FallbackRouteParam[]
  readonly fallbackMode: FallbackMode | undefined
  readonly fallbackRootParams: readonly string[]
  remainingPrerenderableParams?: readonly FallbackRouteParam[]
  readonly isPrerenderOutput?: false

  /**
   * When enabled, the route will be rendered with diagnostics enabled which
   * will error the build if the route that is generated is empty.
   */
  throwOnEmptyStaticShell: boolean
}

export type PrerenderedRoute = StaticPrerenderedRoute | FallbackPrerenderedRoute

/**
 * Describes how a dynamic pathname is matched when no concrete build-time
 * output matches it. A matcher may refer to a prerendered fallback shell with
 * the same pathname, but it is not itself an output that should be rendered.
 */
export type PrerenderRouteMatcher = {
  readonly pathname: string
  readonly fallbackRouteParams: readonly FallbackRouteParam[]
  readonly fallbackMode: FallbackMode | undefined
  readonly fallbackRootParams: readonly string[]
  readonly remainingPrerenderableParams?: readonly FallbackRouteParam[]
}

export type StaticPathsResult = {
  fallbackMode: FallbackMode | undefined
  prerenderedRoutes: PrerenderedRoute[] | undefined
  prerenderRouteMatchers?: PrerenderRouteMatcher[]
  hasPrerenderMatcher?: true
}

export function evaluateRobotsDirective(directive: string): { isIndexed: boolean; isFollowed: boolean } {
  return {
    isIndexed: !/noindex/i.test(directive),
    isFollowed: !/nofollow/i.test(directive)
  };
}

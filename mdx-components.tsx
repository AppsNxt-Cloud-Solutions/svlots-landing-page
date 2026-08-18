import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx with the App Router.
 *
 * Article body styling comes from the <Prose> wrapper in the page shell, so
 * this only overrides what markdown cannot express on its own.
 */
const components: MDXComponents = {
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-gold-500 pl-5 font-display text-xl leading-snug text-ink-800">
      {children}
    </blockquote>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

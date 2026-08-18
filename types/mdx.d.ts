/** Lets `import { meta } from "./post.mdx"` typecheck. */
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  export const meta: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingMinutes: number;
    category: string;
    image: string;
  };

  export default function MDXContent(props: MDXProps): React.JSX.Element;
}

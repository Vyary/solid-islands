## SSG with Astro-like Islands Architecture in Solid

To get static site generation with dynamic islands (like Astro), there are **two key parts**:

### 1. Enable SSG with link crawling

Set this in your SolidStart config to allow static generation of all reachable routes:

```ts
export default {
  server: {
    prerender: {
      crawlLinks: true,
    },
  },
};
```

### 2. Partial Hydration with `createResource` and `deferStream`

The most crucial part is using `deferStream: true` inside `createResource`. This ensures data is fetched **at build time** and included in the prerendered HTML, but allows client-side updates via `refetch()` later.
`useIsRouting` is used to avoid unnecessary refetches.

```ts
const [data, { refetch }] = createResource(fetchData, {
  deferStream: true,
});

onMount(() => {
  const isRouting = useIsRouting();

  if (!isRouting()) {
    refetch();
  }
});
```

This setup gives you a statically generated page with live interactive islands, much like Astro's behavior.

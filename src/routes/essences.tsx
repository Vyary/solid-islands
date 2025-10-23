import { createAsync, query, revalidate, useIsRouting } from "@solidjs/router";
import { For, onMount, Suspense } from "solid-js";

interface Data {
  name: string;
  price: {
    value: string;
    type: string;
  };
}

const fetchData = query(async () => {
  await new Promise((res) => setTimeout(res, 2000));

  const response = await fetch(
    "https://eu.exile-profit.com/v2/Rise%20of%20the%20Abyssal/essences2",
  );
  return (await response.json()) as Data[];
}, "essences");

export const route = {
  preload: () => fetchData(),
};

export default function Page() {
  const data = createAsync(() => fetchData(), { deferStream: true });

  onMount(() => {
    const isRouting = useIsRouting();

    if (!isRouting()) {
      revalidate("essences");
    }
  });

  return (
    <>
      <h1>Essences</h1>
      <Suspense>
        <For each={data()}>
          {(r) => (
            <div>
              {r.name} - {r.price.value} {r.price.type}
            </div>
          )}
        </For>
      </Suspense>
    </>
  );
}

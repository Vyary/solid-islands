import { createResource, For } from "solid-js";

interface Data {
  name: string;
  price: {
    value: string;
    type: string;
  };
}

const fetchData = async () => {
  const response = await fetch(
    "https://eu.exile-profit.com/v2/Dawn%20of%20the%20Hunt/essences2",
  );
  return (await response.json()) as Data[];
};

export default function Page() {
  const [data] = createResource(fetchData, {
    deferStream: true,
  });

  return (
    <>
      <h1>Essences</h1>
      <For each={data()}>
        {(r) => (
          <div>
            {r.name} - {r.price.value} {r.price.type}
          </div>
        )}
      </For>
    </>
  );
}

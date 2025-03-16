import Calculate from "@/pages/calculate/calculate";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <Calculate searchParams={searchParams} />;
}

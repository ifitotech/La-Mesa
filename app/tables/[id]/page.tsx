import { redirect } from "next/navigation";

export default async function LegacyTablePage({
  params,
}: PageProps<"/tables/[id]">) {
  const { id } = await params;
  redirect(`/lobby/${id}`);
}

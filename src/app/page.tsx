import api from "./api"

export default async function Home() {
  const matches = await api.match.list();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(matches, null, 2)}
    </div>
  )
}

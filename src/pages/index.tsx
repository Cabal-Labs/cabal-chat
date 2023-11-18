import Image from 'next/image'
import SafeConnect from "../components/safeConnect"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Helloo</h1>
        <SafeConnect/>
      </div>
    </main>
  )
}

import Head from 'next/head'
import QABox from '../components/QABox'

export default function Home() {
  return (
    <div>
      <Head>
        <title>LLM Q&A App</title>
        <meta name="description" content="Interactive Q&A with LLM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">LLM Q&A Assistant</h1>
          <QABox />
        </div>
      </main>
    </div>
  )
}
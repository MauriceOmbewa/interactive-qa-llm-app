import Head from 'next/head'
import QABox from '../components/QABox'

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>AI Assistant - LLM Q&A App</title>
        <meta name="description" content="Interactive Q&A with AI Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QABox />
    </div>
  )
}
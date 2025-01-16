'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { parser } from '@/utils/parser/parser'

const Page = () => {
  return (
    <div className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 px-8">
      <Suspense>
        <ShowModule />
      </Suspense>
    </div>
  )
}

const ShowModule = () => {
  const [topicContent, setTopicContent] = useState(null)
  const searchParams = useSearchParams()

  const module = searchParams?.get('module') ?? '0'
  const topic = searchParams?.get('topic') ?? '0'

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/modules/initializer-test/${module}/topics/${topic}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch content')
        }
        const data = await response.json()
        setTopicContent(data)
      } catch (error) {
        console.error('Error fetching topic content:', error)
      }
    }

    fetchContent()
  }, [module, topic])

  if (!topicContent) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>
        Module - {module}, Topic - {topic}
      </h1>
      <div className="content">{parser(topicContent)}</div>
    </>
  )
}

export default Page

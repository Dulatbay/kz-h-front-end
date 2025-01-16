'use client'
import Collapse from '@/components/Common/Hollapse'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreateQuiz({
  params,
}: {
  params: Promise<{ quiz: string }>
}) {
  const router = useRouter()
  const quizId = useParams().quiz
  const { quiz } = useParams()
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: [],
  })
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/quizzes/${quiz}`)
        const data = await response.json()
        setQuizData(data)
      } catch (error) {
        console.error('Error fetching quiz data:', error)
      }
    }

    fetchQuizData()
  }, [quiz])

  return (
    <div className="flex w-full max-w-[1200px] mx-auto mt-10 gap-6 flex-wrap px-8">
      <div className="flex flex-col sm:w-1/2 gap-2">
        <h1 className="text-xl">{quizData.title}</h1>
        <p className="text-sm text-[#91898C]">{quizData.description}</p>
        <button
          type="button"
          onClick={() => router.push(`/quizzes/${quizId}/start`)}
          className="uppercase bg-[#5348F2] w-full h-12 my-6 text-center content-center"
        >
          Start
        </button>

        <Collapse id="openOptions" name="Available options" className="w-full">
          <div></div>
        </Collapse>
      </div>

      <div className="flex-1">
        <Collapse
          name="Вопросы"
          className="w-full max-h-[calc(100vh-180px)]"
          id="openAnswers"
        >
          {quizData.questions.map((question: string, index: number) => {
            return (
              <div
                key={`question${index}`}
                className="flex flex-col border border-white rounded-md p-3"
              >
                <h2>{question}</h2>
              </div>
            )
          })}
        </Collapse>
      </div>
    </div>
  )
}

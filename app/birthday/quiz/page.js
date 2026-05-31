'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { ArrowLeft, Brain, Heart, CheckCircle, XCircle, Trophy, RotateCcw, Sparkles, Star, HelpCircle, Lightbulb } from 'lucide-react'
import { useDarkMode } from '../../../hooks/useDarkMode'

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const { isDarkMode } = useDarkMode()

  // Instant auth check — no delay
  const isAuthenticated = typeof window !== 'undefined'
    ? sessionStorage.getItem('birthday_authenticated') === 'true'
    : false

  useEffect(() => {
    if (!isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  // Quiz questions - these could also come from database in the future
  const questions = [
    {
      id: 1,
      question: "When did we first meet?",
      options: ["At a wedding", "At a coffee shop", "At a mall", "At the airport"],
      correct: 0,
      explanation: "It was love at first sight! ✨"
    },
    {
      id: 2,
      question: "What was the first gift you gave me?",
      options: ["Flowers", "Chocolate", "A book", "A special treat"],
      correct: 3,
      explanation: "It was such a thoughtful surprise! 💫"
    },
    {
      id: 3,
      question: "First movie that we watched together?",
      options: ["A comedy", "A thriller", "An animated movie", "An action movie"],
      correct: 2,
      explanation: "We shared popcorn for the first time! 😄"
    },
    {
      id: 4,
      question: "First flower that I gave you?",
      options: ["Pink Roses", "Sunflower", "White flower", "Yellow Tulips"],
      correct: 3,
      explanation: "Such a sweet moment we shared! 💛"
    },
    {
      id: 5,
      question: "Where did we eat when I first met your family?",
      options: ["A chicken restaurant", "A Filipino restaurant", "A steakhouse", "A casual dining place"],
      correct: 1,
      explanation: "It was such a memorable dinner together! 🍽️"
    },
    {
      id: 6,
      question: "What am I most grateful for?",
      options: ["My career", "My health", "Finding you", "My dreams coming true"],
      correct: 2,
      explanation: "Finding you changed everything. You're my greatest blessing! 💕💛"
    }
  ]

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishQuiz = async () => {
    // Calculate score
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++
      }
    })

    setScore(correctAnswers)
    setShowResults(true)

    // Save to database
    try {
      await supabase.from('quiz_attempts').insert({
        score: correctAnswers,
        total: questions.length,
        answers: selectedAnswers
      })
    } catch (error) {
      console.error('Error saving quiz result:', error)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
    setQuizStarted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "Perfect! You know me so well! 😍"
    if (percentage >= 80) return "Amazing! You really pay attention to me! 🥰"
    if (percentage >= 60) return "Pretty good! We're getting to know each other better! 😊"
    if (percentage >= 40) return "Not bad! There's still more to discover about me! 😉"
    return "We have so much more to learn about each other! 💕"
  }

  // Enhanced loading screen with quiz/brain theme
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
        <div className="text-center"><Brain className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" /></div>
      </div>
    )
  }

  return (
    <div className={`center-container ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-300 opacity-60 animate-bounce">
          <Heart size={20} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-20 text-purple-400 opacity-50">
          <Sparkles size={25} className="animate-spin-slow" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-blue-300 opacity-60">
          <Brain size={18} className="animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/4 text-pink-400 opacity-40">
          <Star size={15} fill="currentColor" className="animate-bounce" />
        </div>
      </div>

      <div className="center-content relative z-10">
        {/* Header */}
        <div className="header-section">
          <Link
            href="/birthday"
            className={`inline-flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-900/20' : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'} transition-colors px-4 py-3 rounded-xl font-medium`}
          >
            <ArrowLeft size={20} className="mr-3" />
            Back to Birthday Hub
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <Brain className="text-purple-500 w-8 h-8 mr-3" />
              <Heart className="text-yellow-500 w-6 h-6" fill="currentColor" />
              <Brain className="text-purple-500 w-8 h-8 ml-3" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                How Well Do You Know Me?
              </span>
            </h1>
            <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              A fun quiz to test your knowledge! 🧠💕
            </p>
          </div>
        </div>

        {!quizStarted ? (
          // Quiz intro
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating p-8 sm:p-10 md:p-12 text-center animate-scale-in`}>
              <div className="icon-container-xl bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg inline-block mb-6">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Ready for the Challenge?</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                I&apos;ve prepared {questions.length} questions about myself. Let&apos;s see how much you&apos;ve been paying attention!
                Each question has one correct answer, and I&apos;ll share little secrets about myself along the way.
              </p>
              <div className={`${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-2xl p-6 mb-8`}>
                <h3 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'} mb-2`}>Quiz Rules:</h3>
                <ul className={`${isDarkMode ? 'text-purple-400' : 'text-purple-700'} text-sm space-y-1`}>
                  <li>• {questions.length} multiple choice questions</li>
                  <li>• Take your time - no rush!</li>
                  <li>• You can go back and change answers</li>
                  <li>• I&apos;ll explain each answer at the end</li>
                </ul>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setQuizStarted(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 text-lg min-h-[56px] cursor-pointer"
                >
                  Start the Quiz! 🚀
                </button>
              </div>
            </div>
          </div>
        ) : !showResults ? (
          // Quiz questions
          <div className="max-w-3xl mx-auto px-2 sm:px-0">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-purple-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question card */}
            <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating p-8 sm:p-10 md:p-12 animate-fade-in w-full`}>
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} quiz-question text-center mb-8 min-h-[4rem] flex items-center justify-center`}>
                {questions[currentQuestion].question}
              </h2>

              <div className="quiz-options space-y-5">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className={`w-full p-4 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${selectedAnswers[currentQuestion] === index
                        ? `border-purple-500 ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'} shadow-lg`
                        : `${isDarkMode ? 'border-gray-600 bg-gray-800/50 hover:border-purple-400 hover:bg-purple-900/10' : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'}`
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 quiz-radio flex items-center justify-center flex-shrink-0 ${selectedAnswers[currentQuestion] === index
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                        }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className={`w-2 h-2 ${isDarkMode ? 'bg-gray-200' : 'bg-white'} rounded-full`}></div>
                        )}
                      </div>
                      <span className={`font-medium ml-3 ${selectedAnswers[currentQuestion] === index
                          ? 'text-purple-700'
                          : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between quiz-nav-buttons">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'} rounded-xl transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed min-h-[48px] font-medium shadow-md hover:shadow-lg`}
                >
                  ← Previous
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform transition-all hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed min-h-[48px] font-medium shadow-md"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz →' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Results
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Score card */}
            <div className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-floating p-6 sm:p-8 md:p-10 text-center mb-8 animate-scale-in mx-4 sm:mx-0`}>
              <Trophy className={`w-16 h-16 mx-auto mb-6 ${score === questions.length ? 'text-yellow-500' :
                  score >= questions.length * 0.8 ? 'text-blue-500' :
                    score >= questions.length * 0.6 ? 'text-green-500' : 'text-purple-500'
                }`} />

              <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Quiz Complete! 🎉</h2>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-6">
                <div className="text-4xl font-bold mb-2">{score}/{questions.length}</div>
                <div className="text-lg opacity-90">
                  {Math.round((score / questions.length) * 100)}% Correct
                </div>
              </div>

              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8">{getScoreMessage()}</p>

              <button
                onClick={restartQuiz}
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 min-h-[56px] cursor-pointer"
              >
                <RotateCcw className="inline w-5 h-5 mr-2" />
                Take Quiz Again
              </button>
            </div>

            {/* Answer explanations */}
            <div className="space-y-6 mx-4 sm:mx-0">
              <h3 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-8`}>Let me explain my answers! 💭</h3>

              {questions.map((question, index) => (
                <div key={question.id} className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 animate-fade-in`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${selectedAnswers[index] === question.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      }`}>
                      {selectedAnswers[index] === question.correct ? (
                        <CheckCircle size={20} />
                      ) : (
                        <XCircle size={20} />
                      )}
                    </div>

                    <div className="flex-1 pl-2">
                      <h4 className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>{question.question}</h4>
                      <div className="mb-4 space-y-2">
                        <div>
                          <span className="text-sm text-gray-600">Correct answer: </span>
                          <span className="font-semibold text-green-600">
                            {question.options[question.correct]}
                          </span>
                        </div>
                        {selectedAnswers[index] !== question.correct && (
                          <div>
                            <span className="text-sm text-gray-600">Your answer: </span>
                            <span className="font-semibold text-red-600">
                              {question.options[selectedAnswers[index]]}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 italic leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-12 mb-8 ${isDarkMode ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-white/20'} backdrop-blur-sm rounded-3xl shadow-elegant p-6 max-w-2xl mx-auto`}>
          <Heart className="text-yellow-500 mx-auto mb-3 w-8 h-8" fill="currentColor" />
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
            Every question reveals a little more of my heart
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Thanks for taking the time to know me better! 💕
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
      `}</style>
    </div>
  )
}
// Made By Krishna Patil
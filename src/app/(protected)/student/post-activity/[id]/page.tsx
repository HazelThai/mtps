"use client";

import { AppTypes } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const mock_data: AppTypes.Post = {
  id: "1",
  title: "Research Methodology Workshop",
  testId: "1",
  dateStart: 1715702400,
  dateEnd: 1715702400,
  status: "Public",
  location: "Online",
  tags: ["Research", "Workshop"],
  category: "Academic",
  semester: "2023-2",
  faculty: "Science Department",
  description:
    "Learn the fundamentals of research methodology in this interactive workshop.",
  points: 20,
  totalQuestions: 10,
  questions: [
    {
      id: "1",
      text: "What is the first step in the research process?",
      options: [
        {
          id: "1",
          text: "Data collection",
        },
        {
          id: "2",
          text: "Identifying a research problem",
        },
        {
          id: "3",
          text: "Data analysis",
        },
        {
          id: "4",
          text: "Writing the research report",
        },
      ],
      correctOption: {
        id: "1",
        text: "Data collection",
      },
      isCompleted: false,
    },
    {
      id: "3",
      text: "What is a hypothesis?",
      options: [
        { id: "1", text: "A proven theory" },
        { id: "2", text: "A research method" },
        { id: "3", text: "A tentative explanation" },
        { id: "4", text: "An observation" },
      ],
      correctOption: {
        id: "3",
        text: "A tentative explanation",
      },
      isCompleted: false,
    },
    {
      id: "4",
      text: "Which type of research involves numbers and statistics?",
      options: [
        { id: "1", text: "Qualitative" },
        { id: "2", text: "Quantitative" },
        { id: "3", text: "Theoretical" },
        { id: "4", text: "Exploratory" },
      ],
      correctOption: {
        id: "2",
        text: "Quantitative",
      },
      isCompleted: false,
      selectedOption: undefined,
    },
    {
      id: "5",
      text: "What is the purpose of a literature review in research?",
      options: [
        { id: "1", text: "To collect new data" },
        { id: "2", text: "To review books only" },
        { id: "3", text: "To summarize existing knowledge" },
        { id: "4", text: "To analyze raw data" },
      ],
      correctOption: {
        id: "3",
        text: "To summarize existing knowledge",
      },
      isCompleted: false,
    },
    {
      id: "6",
      text: "Which of the following is NOT a data collection technique?",
      options: [
        { id: "1", text: "Interview" },
        { id: "2", text: "Observation" },
        { id: "3", text: "Literature review" },
        { id: "4", text: "Hypothesis formulation" },
      ],
      correctOption: {
        id: "4",
        text: "Hypothesis formulation",
      },
      isCompleted: false,
    },
  ],
};

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [activity, setActivity] = useState({ ...mock_data, id: id as string });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    const updatedQuestions = [...activity.questions];
    updatedQuestions[currentQuestionIndex].selectedOption = optionIndex;
    updatedQuestions[currentQuestionIndex].isCompleted = true;
    setActivity({ ...activity, questions: updatedQuestions });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activity.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  const currentQuestion = activity.questions[currentQuestionIndex];
  const allQuestionsAnswered = activity.questions.every((q) => q.isCompleted);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Activity Information */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{activity.title}</h1>
          <Link
            href="/dashboard/student/post-activity"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 text-sm font-medium transition-colors"
          >
            Back to Activities
          </Link>
        </div>
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Faculty</p>
              <p className="font-medium">{activity.faculty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {dayjs(activity.dateStart).format("DD/MM/YYYY")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Points</p>
              <p className="font-medium">{activity.points} points</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{activity.category}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-gray-700">{activity.description}</p>
        </div>
      </div>

      {/* Test UI */}
      {!testSubmitted ? (
        <div className="bg-white rounded-lg border shadow-sm">
          {/* Progress */}
          <div className="border-b p-4 flex justify-between items-center">
            <div className="font-medium">
              Question {currentQuestionIndex + 1} of {activity.questions.length}
            </div>
          </div>

          {/* Question Progress Indicator */}
          <div className="p-4 border-b overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {activity.questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(index)}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer
                    ${
                      currentQuestionIndex === index
                        ? "ring-2 ring-blue-500"
                        : ""
                    }
                    ${
                      q.isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Question */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">{currentQuestion.text}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  onClick={() => handleOptionSelect(optionIndex)}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-colors
                    ${
                      currentQuestion.selectedOption === optionIndex
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div
                      className={`
                      w-5 h-5 rounded-full border flex items-center justify-center mr-3
                      ${
                        currentQuestion.selectedOption === optionIndex
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }
                    `}
                    >
                      {currentQuestion.selectedOption === optionIndex && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="p-4 border-t flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`
                px-4 py-2 rounded-md text-sm font-medium cursor-pointer
                ${
                  currentQuestionIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              `}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {currentQuestionIndex === activity.questions.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={!allQuestionsAnswered}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium cursor-pointer
                    ${
                      allQuestionsAnswered
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Test Submitted View
        <div className="bg-white rounded-lg border p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Test Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing the test for {activity.title}. Your
            responses have been recorded.
          </p>
          <div className="mb-6">
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2">
              <div className="text-sm text-gray-500">Your Score</div>
              <div className="text-2xl font-bold">
                {Math.floor(Math.random() * 40) + 60}/100
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/student/activities"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 inline-block"
          >
            Return to Activities
          </Link>
        </div>
      )}
    </div>
  );
}

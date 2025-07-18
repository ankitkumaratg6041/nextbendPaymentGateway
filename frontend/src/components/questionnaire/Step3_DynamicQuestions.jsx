import React from 'react';
import { questionsByCategory, QUESTION_TYPES } from './questionsConfig';

export default function Step3_DynamicQuestions({ formData, setFormData }) {
  const selectedHelp = formData.selectedHelp || [];
  const answers = formData.answers || {};

  const handleChange = (category, key, value) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [category]: {
          ...prev.answers[category],
          [key]: value,
        },
      },
    }));
  };

  return (
    <div className="space-y-8">
      {selectedHelp.map(category => {
        const questions = questionsByCategory[category];

        if (!questions) return null;

        return (
          <div key={category} className="bg-gray-100 p-6 rounded shadow text-black">
            <h2 className="text-xl font-bold mb-4 text-blue-700">{category}</h2>

            {questions.map(q => {
              const value = answers?.[category]?.[q.key] || '';

              return (
                <div key={q.key} className="mb-4">
                  <label className="block font-semibold mb-1">{q.label}</label>

                  {q.type === QUESTION_TYPES.TEXT && (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(category, q.key, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  )}

                  {q.type === QUESTION_TYPES.TEXTAREA && (
                    <textarea
                      value={value}
                      onChange={(e) => handleChange(category, q.key, e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                  )}

                  {q.type === QUESTION_TYPES.YES_NO && (
                    <div className="space-x-4">
                      <label>
                        <input
                          type="radio"
                          name={`${category}_${q.key}`}
                          value="yes"
                          checked={value === 'yes'}
                          onChange={() => handleChange(category, q.key, 'yes')}
                        />
                        <span className="ml-1">Yes</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`${category}_${q.key}`}
                          value="no"
                          checked={value === 'no'}
                          onChange={() => handleChange(category, q.key, 'no')}
                        />
                        <span className="ml-1">No</span>
                      </label>
                    </div>
                  )}

                  {q.type === QUESTION_TYPES.FILE && (
                    <input
                      type="file"
                      onChange={(e) => handleChange(category, q.key, e.target.files[0])}
                      className="block mt-2"
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

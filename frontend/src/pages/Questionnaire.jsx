import { useState } from 'react';
import Step1_BasicInfo from '@/components/questionnaire/Step1_BasicInfo';
import Step2_HelpSelection from '@/components/questionnaire/Step2_HelpSelection';
import Step3_DynamicQuestions from '@/components/questionnaire/Step3_DynamicQuestions';
import Step4_FileUpload from '@/components/questionnaire/Step4_FileUpload';
import Step5_ReviewSubmit from '@/components/questionnaire/Step5_ReviewSubmit';

const steps = [
  'Basic Info',
  'What Help You Need',
  'Detailed Questions',
  'Upload Files (Optional)',
  'Review & Submit',
];

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    selectedHelp: [],
    answers: {},
    files: [],
  });

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Let's Get to Know Your Needs</h1>

      {/* Step Indicator */}
      <div className="flex justify-between mb-6">
        {steps.map((label, i) => (
          <div
            key={i}
            className={`flex-1 text-center py-2 border-b-4 ${
              i === step ? 'border-blue-500 font-semibold' : 'border-gray-300 text-gray-500'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white p-6 rounded shadow">
        {step === 0 && <Step1_BasicInfo formData={formData} setFormData={setFormData} />}
        {step === 1 && <Step2_HelpSelection formData={formData} setFormData={setFormData} />}
        {step === 2 && <Step3_DynamicQuestions formData={formData} setFormData={setFormData} />}
        {step === 3 && <Step4_FileUpload formData={formData} setFormData={setFormData} />}
        {step === 4 && <Step5_ReviewSubmit formData={formData} />}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={next}
          disabled={step === steps.length - 1}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

"use client";

const GoBackButton = () => {
  return (
        <button className="flex font-semibold text-ecru-white cursor-pointer hover:text-old-gold" onClick={() => history.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-to-line preview-icon"
          >
            <path d="M3 19V5" />
            <path d="m13 6-6 6 6 6" />
            <path d="M7 12h14" />
          </svg>
          Go back
        </button>
  );
};

export default GoBackButton;
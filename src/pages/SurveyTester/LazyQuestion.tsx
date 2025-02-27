import React, { useState, useRef, useEffect, Suspense } from 'react';
const LazyQuestionObject = React.lazy(() => import('./QuestionObject'));

const FallbackComponent = (props: {customHeight?: string}) => {
  const { customHeight } = props;
  return <div style={{height: customHeight || "400px"}}>Loading...</div>;
}

interface LazyQuestionProps {
  question: any; // or your typed question type
}

const LazyQuestion: React.FC<LazyQuestionProps> = ({ question }) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // `entries` can have multiple elements, but we only observe one here
        const [entry] = entries;
        // Toggle `inView` based on whether the element is visible or not
        setInView(entry.isIntersecting);
      },
      {
        // Adjust threshold or rootMargin if needed
        threshold: 0, // triggers as soon as a single pixel is in view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  const questionNumber = question.getQuestionNumber();

  return (
    <div ref={containerRef}>
      {inView ? (
        <Suspense fallback={<FallbackComponent  />}>
          <LazyQuestionObject question={question} />
        </Suspense>
      ) : <FallbackComponent customHeight={questionNumber === 46 ? "600px" : "400px"} />}
    </div>
  );
};

export default LazyQuestion;

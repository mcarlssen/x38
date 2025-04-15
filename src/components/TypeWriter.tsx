import { useState, useEffect } from 'react';

interface TypeWriterProps {
  phrases: string[];
  baseSpeed?: number; // characters per second
  pauseDuration?: number; // milliseconds
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  phrases,
  baseSpeed = 24,
  pauseDuration = 3000,
  className = 'title-keyword-text'
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentPhrase = phrases[phraseIndex];
    const shouldType = !isDeleting && text.length < currentPhrase.length;
    const shouldDelete = isDeleting && text.length > 0;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (shouldType) {
      // Add next character
      const nextChar = currentPhrase[text.length];
      const randomVariation = Math.random() * 0.4 + 0.8; // 80% to 120% of base speed
      const typeSpeed = (1000 / baseSpeed) * randomVariation;

      timeout = setTimeout(() => {
        setText(text + nextChar);
        if (text.length + 1 === currentPhrase.length) {
          setIsPaused(true);
        }
      }, typeSpeed);
    } else if (shouldDelete) {
      // Remove last character
      const randomVariation = Math.random() * 0.3 + 0.85; // 85% to 115% of base speed
      const deleteSpeed = (1000 / baseSpeed) * randomVariation;

      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deleteSpeed);
    } else if (isDeleting && text.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, isPaused, phrases, baseSpeed, pauseDuration]);

  return (
    <span className={className}>
      {text}
      <span className="cursor">_</span>
    </span>
  );
};

export default TypeWriter; 
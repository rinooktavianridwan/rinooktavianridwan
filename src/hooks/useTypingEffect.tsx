import { useState, useEffect } from 'react';

interface UseTypingEffectProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export const useTypingEffect = ({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
}: UseTypingEffectProps) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[currentIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                }, typingSpeed);
            } else {
                // Finished typing, pause then start deleting
                timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                }, deletingSpeed);
            } else {
                // Finished deleting, move to next text
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }, deletingSpeed);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return displayText;
};

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type?: 'text' | 'estimate' | 'lead' | 'subsidy';
};

interface ChatContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    messages: Message[];
    addMessage: (message: Omit<Message, 'id'>) => void;
    isTyping: boolean;
    setIsTyping: (typing: boolean) => void;
    clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const addMessage = useCallback((message: Omit<Message, 'id'>) => {
        const id = Math.random().toString(36).substring(7);
        setMessages((prev) => [...prev, { ...message, id }]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                setIsOpen,
                messages,
                addMessage,
                isTyping,
                setIsTyping,
                clearMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}

import React, { useState } from 'react';
import { sendMessage } from './api';
import AgentChat from './components/AgentChat';

const App: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

    const handleSendMessage = async (text: string) => {
        const userMessage = { sender: 'User', text };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await sendMessage(text);
        const agentMessage = { sender: 'Agent', text: response };
        setMessages((prevMessages) => [...prevMessages, agentMessage]);
    };

    return (
        <div>
            <h1>AI Chat Agent</h1>
            <AgentChat messages={messages} onSendMessage={handleSendMessage} />
        </div>
    );
};

export default App;
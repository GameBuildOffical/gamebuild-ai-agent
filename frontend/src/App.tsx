import React, { useState } from 'react';
import './App.css';
import { sendMessage } from './api';
import ChatInterface from './components/ChatInterface';
import GuildRecommendation from './components/GuildRecommendation';

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
        <div className="App">
            <header className="App-header">
                <h1>Game Build AI Agent</h1>
            </header>
            <main>
                <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
                <GuildRecommendation />
            </main>
        </div>
    );
};

export default App;
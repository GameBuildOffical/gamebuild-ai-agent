import React, { useState } from 'react';
import { sendMessage } from '../api';

const AgentChat: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'User', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await sendMessage(input);
        const agentMessage = { sender: 'Agent', text: response };
        setMessages((prevMessages) => [...prevMessages, agentMessage]);

        setInput('');
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'User' ? 'user-message' : 'agent-message'}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default AgentChat;
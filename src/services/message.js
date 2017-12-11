import fetch from 'node-fetch';

const messageService = () => (
    {
        send(email, text) {
            return fetch('http://localhost:9090/messages', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    text,
                }),
            });
        },
    }
);

export default messageService();

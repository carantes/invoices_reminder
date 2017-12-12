import fetch from 'node-fetch';

const handleFetchErrors = (res) => {
    if (res.status !== 201) {
        throw new Error('Failed to delivery message');
    }

    return res;
};

const messageService = () => (
    {
        send(email, text) {
            return fetch('http://localhost:9090/messages', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    text,
                }),
            })
                .then(handleFetchErrors)
                .then(res => res.json());
        },
    }
);

export default messageService();

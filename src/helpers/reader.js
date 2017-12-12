import fs from 'fs';

const reader = () => (
    {
        readFromCSV(filename, header = true) {
            if (fs.existsSync(filename)) {
                const data = fs.readFileSync(filename, 'utf8');
                const rows = data.split('\n');
                return header ? rows.filter((row, index) => index > 0) : rows;
            }

            console.error('File not found', filename);
            return null;
        },
    }
);

export default reader();

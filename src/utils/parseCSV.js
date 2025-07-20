// Helper to parse CSV data
const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].trim().split(',').map(h => h.trim().replace(/\r$/, ''));
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const values = line.split(',');
            const entry = {};
            headers.forEach((header, index) => {
                const value = values[index] ? values[index].trim().replace(/\r$/, '') : '';
                const numericValue = value.toString().replace(/[^0-9.-]+/g,"");
                if (header.toLowerCase().includes('amount') || header.toLowerCase().includes('balance') || header.toLowerCase().includes('payment') || header.toLowerCase().includes('apr') || header.toLowerCase().includes('value')) {
                     entry[header] = isNaN(Number(numericValue)) || numericValue === '' ? value : Number(numericValue);
                } else {
                    entry[header] = value;
                }
            });
            data.push(entry);
        }
    }
    return data;
};
export default parseCSV;

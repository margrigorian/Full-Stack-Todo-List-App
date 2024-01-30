export function getResponseTemplate(data, error) {
    const response = {
        data: data,
        error: error
    };

    return JSON.stringify(response);
}
// This file provides data for the application

export const getIndexedSites = () => {
    return [
        {
            title: "Example Site 1",
            description: "This is an example site.",
            address: "https://example1.com",
            ispublic: true,
        },
        {
            title: "Example Site 2",
            description: "This is another example site.",
            address: "https://example2.com",
            ispublic: false,
        },
        {
            title: "Sample Site",
            description: "A sample site for testing.",
            address: "https://sample.com",
            ispublic: true,
        },
        {
            title: "Test Site",
            description: "A site used for testing purposes.",
            address: "https://testsite.com",
            ispublic: true,
        },
    ];
};

export const sendWebsiteToAPI = async (htmlCode: string): Promise<string> => {
    // Simulate an API call to send the website HTML code
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success response with a generated URL
            const randomId = Math.random().toString(36).substring(2, 8);
            resolve(`https://rainfall.net/${randomId}`);
        }, 2000);
    });
};

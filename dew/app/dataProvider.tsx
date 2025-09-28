// This file provides data for the application

const server = 'http://localhost:3000';
const server2 = "http://localhost:3001"; // Not used currently


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

export const getSiteContent = async (address: string): Promise<{ success: boolean; html: string }> => {
    try {
        const response = await fetch(`${server}/getWebPage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { success: true, html: data.html };
    } catch (error) {
        console.error('Error fetching site content:', error);
        return { success: false, html: '' };
    }
};

export const createContract = async (): Promise<{ success: boolean; contractAddress?: string }> => {
    //wait three seconds and then return a mocked contract address
    await new Promise(resolve => setTimeout(resolve, 3000));
    return { success: true, contractAddress: '0x1234567890abcdef' }; // Mocked response

    try {
        const response = await fetch(`${server}/generateNewPageContract`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { success: true, contractAddress: data.contractAddress };
    } catch (error) {
        console.error('Error creating contract:', error);
        return { success: false };
    }
};

export const setHtmlCode = async (
    address: string,
    title: string,
    description: string,
    message: string,
): Promise<{ success: boolean; title: string }> => {
    console.log('Sending data to server:', { address, title, description, message });
    return { success: true, title: title }; // Mocked response
    try {
        const response = await fetch(`${server}/setValuesPage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, title, description, message }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, nota: si los codigos de estatus estan mal (por ejemplo siempre da 200) este chance es un error feik`);
        }
        return { success: true, title: title };
    } catch (error) {
        console.error('Error setting HTML code:', error);
        return { success: false, title: '' };
    }
};

export const addAddressToIndex = async (address: string, title: string): Promise<{ success: boolean }> => {
    //endpoint add address
    console.log('Adding address to index:', { address, title });
    return { success: true }; // Mocked response
    try {
        const response = await fetch(`${server2}/addAddressToIndex`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, title }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { success: true };
    } catch (error) {
        console.error('Error adding address to index:', error);
        return { success: false };
    }
};




// This file provides data for the application
import { indexedSite } from './interfaces';

const server = 'http://localhost:3000';
const server2 = "http://localhost:3001";


export const getIndexedSites = async (): Promise<indexedSite[]> => {
    // endpoint /alladdresses
    try {
        const response = await fetch(`${server2}/returnAllAddresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Transform the API response to match indexedSite interface
        if (data.success && data.addresses && Array.isArray(data.addresses)) {
            return data.addresses.map((item: { address: string; title: string }) => ({
                title: item.title,
                description: '', // API doesn't provide description, using empty string
                address: item.address,
                ispublic: true // API doesn't provide ispublic flag, defaulting to true
            }));
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching indexed sites:', error);
        return [];
    }
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

    try {
        const response = await fetch(`${server2}/addAddress`, {
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




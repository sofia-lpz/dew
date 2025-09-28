import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const response = await fetch('http://localhost:3001/addAddress', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error proxying addAddress:', error);
        return NextResponse.json(
            { error: 'Failed to add address' },
            { status: 500 }
        );
    }
}
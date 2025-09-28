import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = await fetch('http://localhost:3000/generateNewPageContract', {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error proxying generateNewPageContract:', error);
        return NextResponse.json(
            { error: 'Failed to generate contract' },
            { status: 500 }
        );
    }
}
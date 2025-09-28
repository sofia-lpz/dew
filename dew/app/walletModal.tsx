'use client';

import { useState, useEffect } from 'react';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
    const [accountNumber, setAccountNumber] = useState<string>('');

    // Generate a random account number when modal opens
    useEffect(() => {
        if (isOpen) {
            const generateAccountNumber = () => {
                // Generate a 12-digit account number
                const number = Math.floor(Math.random() * 900000000000) + 100000000000;
                return number.toString();
            };
            setAccountNumber(generateAccountNumber());
        }
    }, [isOpen]);

    // Close modal when clicking outside or pressing escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountNumber);
        // You could add a toast notification here
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Create Website Account</h2>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>
                
                <div className="modal-body">
                    <p className="modal-description">
                        Your website creation account has been generated. Use this account number to proceed with creating your website.
                    </p>
                    
                    <div className="account-number-container">
                        <label className="account-label">Account Number:</label>
                        <div className="account-number-display">
                            <span className="account-number">{accountNumber}</span>
                            <button 
                                className="copy-button"
                                onClick={copyToClipboard}
                                title="Copy to clipboard"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button className="modal-button secondary" onClick={onClose}>
                        Close
                    </button>
                    <button 
                        className="modal-button primary"
                        onClick={() => {
                            // Navigate to website builder
                            window.location.href = '/create-website';
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

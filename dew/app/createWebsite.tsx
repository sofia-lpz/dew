'use client';

import { useState, useRef, useEffect } from 'react';

export default function CreateWebsite() {
    const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is a sample website. Edit the HTML on the left to see changes here!</p>
    <p>You can add more content, styles, and even JavaScript.</p>
</body>
</html>`);

    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Update the iframe content when HTML changes
    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument || iframe.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(htmlCode);
                doc.close();
            }
        }
    }, [htmlCode]);

    const handleSendToNet = async () => {
        setIsSending(true);
        setSendStatus('idle');
        
        try {
            // Simulate API call to deploy website
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate a random website URL
            const randomId = Math.random().toString(36).substring(2, 8);
            const websiteUrl = `https://rainfall.net/${randomId}`;
            
            setSendStatus('success');
            
            // Show success message with URL
            alert(`Website deployed successfully!\nYour website is now live at: ${websiteUrl}`);
            
        } catch (error) {
            setSendStatus('error');
            alert('Failed to deploy website. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset to the default template? This will lose all your changes.')) {
            setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is a sample website. Edit the HTML on the left to see changes here!</p>
    <p>You can add more content, styles, and even JavaScript.</p>
</body>
</html>`);
        }
    };

    const downloadHtml = () => {
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="website-builder">
            <div className="builder-header">
                <div className="header-left">
                    <button 
                        className="back-button"
                        onClick={() => window.location.href = '/'}
                        title="Back to search"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5"></path>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                    </button>
                    <h1>Website Builder</h1>
                </div>
                <div className="header-actions">
                    <button 
                        className="action-button secondary" 
                        onClick={handleReset}
                        title="Reset to default template"
                    >
                        Reset
                    </button>
                    <button 
                        className="action-button secondary" 
                        onClick={downloadHtml}
                        title="Download HTML file"
                    >
                        Download
                    </button>
                    <button 
                        className={`action-button primary ${isSending ? 'loading' : ''} ${sendStatus === 'success' ? 'success' : ''} ${sendStatus === 'error' ? 'error' : ''}`}
                        onClick={handleSendToNet}
                        disabled={isSending}
                    >
                        {isSending ? 'Sending...' : sendStatus === 'success' ? 'Sent!' : 'Send to the Net'}
                    </button>
                </div>
            </div>

            <div className="builder-content">
                <div className="editor-panel">
                    <div className="panel-header">
                        <h3>HTML Editor</h3>
                        <div className="editor-info">
                            Lines: {htmlCode.split('\n').length} | Characters: {htmlCode.length}
                        </div>
                    </div>
                    <textarea
                        className="html-editor"
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        placeholder="Write your HTML code here..."
                        spellCheck={false}
                    />
                </div>

                <div className="preview-panel">
                    <div className="panel-header">
                        <h3>Live Preview</h3>
                        <div className="preview-controls">
                            <button 
                                className="refresh-button"
                                onClick={() => {
                                    if (iframeRef.current) {
                                        iframeRef.current.src = iframeRef.current.src;
                                    }
                                }}
                                title="Refresh preview"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 4 23 10 17 10"></polyline>
                                    <polyline points="1 20 1 14 7 14"></polyline>
                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="preview-container">
                        <iframe
                            ref={iframeRef}
                            className="preview-iframe"
                            title="Website Preview"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

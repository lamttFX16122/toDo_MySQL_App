import React, { useEffect } from 'react';
import { url } from '../../shares/pageUrl';

const PdfViewer = () => {
    useEffect(() => {
        // Fetch the PDF from the server
        fetch(url + 'generate-pdf')
            .then((response) => response.blob())
            .then((blob) => {
                console.log(blob)
                // Convert the blob to a URL
                const url = URL.createObjectURL(blob);

                // Open the PDF in a new tab
                window.open(url);
            });
    }, []);

    return <div>Loading PDF...</div>;
};
export default PdfViewer;
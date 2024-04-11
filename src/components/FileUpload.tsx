import React from 'react';
import {FileContext} from '../context'
import {parseData} from '../utils'
import { Input } from '@mui/material'

const FileUpload: React.FC = () => {
    const context = React.useContext(FileContext)

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        /**
         * This function reads a file in chunks of 1MB, parses those chunks asynchronously to be usable by the chart, and stores the information.
         * The information is also stored asynchronously in the context every few chunks.
         */
        const file = event.target.files?.[0];
        if (file) {
            // read file in chunks of 1MB, parse it to 
            const chunkSize = 1024 * 1024;
            const totalChunks = Math.ceil(file.size / chunkSize);
            let currentChunk = 0;
            const chunks: (number | null)[][] = [];
            
            const processNextChunk = async () => {
                if (currentChunk < totalChunks) {
                    const start = currentChunk * chunkSize;
                    const end = Math.min((currentChunk + 1) * chunkSize, file.size);
                    const chunk = file.slice(start, end);
                    const reader = new FileReader();
            
                    reader.onload = async (e) => {
                        if (e.target?.result) {
                            const chunkData: string = e.target.result.toString();
                            const parsedChunk = parseData(chunkData)
                            chunks.push(...parsedChunk);
                            currentChunk++;
                            
                            if (currentChunk % 20 === 0 || currentChunk === totalChunks) {
                                // Update context every 20 chunks or when all chunks are processed
                                context?.setData(chunks);
                            }
                            
                            // Process the next chunk recursively
                            await processNextChunk(); 
                        }
                    };
            
                    reader.readAsText(chunk);
                }
            };
        
            await processNextChunk();
        }
    };

    return (
        <Input type="file" onChange={handleFileChange} />
    );
};

export default FileUpload;

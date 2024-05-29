const axios = require('axios');
require('dotenv').config();
const Youtube=
{
     searchYouTube : async (query) => {
        const url = 'https://www.googleapis.com/youtube/v3/search';
        const API_KEY = process.env.YOUTUBE_API_KEY;
    
        try {
            const response = await axios.get(url, {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    key: API_KEY,
                    maxResults: 4,
                },
            });
            return response.data.items;
        } catch (error) {
            console.error('Error searching YouTube:', error);
            throw new Error('Error searching YouTube');
        }
    },
    
     getEmbedCode : (url) => {
        const videoId = Youtube.extractVideoId(url);
        r
        if (videoId) {
            return Youtube.generateEmbedCode(videoId);
        } else {
            return 'Invalid YouTube URL';
        }
    },
    
    extractVideoId: (url) => {
        try
        {
            if (!url || typeof url !== 'string') {
                throw new Error('Invalid URL');
            }
            const regExp = /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|youtu\.be\/|\/v\/|\/embed\/|watch\?v=|\/?v=|\/v\/)([^#&?]*).*/;
            const match=url.match(regExp);            
            if (match && match[1]) {
                return match[1];
            } else {
                throw new Error('Invalid URL');
            }
        }
        catch(err)
        {
            throw(err);
        }
    },
    
    generateEmbedCode : (url) => {
        const videoId = extractVideoId(url);
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    
}

module.exports = Youtube;

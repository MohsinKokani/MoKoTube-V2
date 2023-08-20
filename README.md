# MoKo Tube - YouTube Clone App

> MoKo Tube is a web application inspired by YouTube, where users can browse and search for videos, channels, playlists, and view video details and channel statistics. The app uses an youtube-v3-alternative API to fetch data from YouTube, offering additional features beyond the YouTube v3 API. The app is fully responsive to provide a seamless viewing experience on all devices.

## Features

MoKo Tube is a YouTube clone app that offers several features for a seamless viewing experience. Some of the key features of the app now include:

- **Video Viewing:** Users can browse and view videos from YouTube, including video details and channel statistics.

- **Recent Viewed:** The app provides a "recent viewed" section that allows users to quickly access previously viewed videos, powered by local storage.

- **Dark Mode:** The app offers a dark mode feature that enables users to switch between a light and dark theme.

- **Playlists:** Users can create, browse, and play YouTube playlists directly within the app.

- **Category Suggestion:** The app provides a horizontal scroll of suggested video categories, similar to YouTube's interface.

- **Channel Page:** Users can browse channels on YouTube, view channel details and statistics, including channel description, subscriber count, and video count.

- **Channel Statistics Page:** Users can view detailed channel statistics for a selected YouTube channel, including the number of views, likes, dislikes, and comments.

- **Search Filters:** The app now offers additional search filters, allowing users to refine their search based on view count, duration, and other criteria.

- **Infinite Scroll:** This project includes an example of how to implement infinite scroll using a scroll event in React, which also prevents potential problems caused by race conditions.

MoKo Tube is built using React.js and utilizes an alternative YouTube API to fetch data from YouTube. With these features, the app offers a user-friendly interface that mimics the functionality of YouTube while adding new capabilities.

## API Endpoints

Here are some of the API endpoints used in the app:

| Endpoint Name     | Description                                       | Required Parameters | Optional Parameters |
|-------------------|---------------------------------------------------|---------------------|---------------------|
| Related Videos  | Returns Related videos based on current video  | id  | token, geo, lang |
| Search            | Allows users to search for videos                |  query            | token, geo, lang, duration, features, upload_date, sort_by |
| Video Details     | Returns details about a specific video           | id                 | N/A                 |
| Channel   | Returns details about a specific YouTube channel|  id | sort_by, token |
| Playlist   | Returns videos in a specific YouTube playlist  | id   | token |

The "Required Parameters" column lists the parameters required to make a request to each endpoint. Additional "Optional Parameters" can be included to customize the response.

## Getting Started

1. Open the terminal or command prompt on your computer.
2. Navigate to the directory where you want to store the cloned repository.
3. Run the following command to clone the repository:
```
git clone https://github.com/MohsinKokani/MoKoTube-V2.git
```
4. Once the repository has been cloned, navigate to the project directory:
```
cd MoKoTube-V2
```
5. Install the required dependencies using npm:
```
npm install
```
6. After the dependencies have been installed, you can start the local development server by running:
```
npm start
```
7. This will start the application and open it in your default browser. If the browser doesn't open automatically, you can access the application by going to http://localhost:3000/ in your browser.
8. That's it! You should now have a working copy of MoKo tube running locally on your computer.
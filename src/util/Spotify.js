// This serves as a MODULE not as a COMPONENT! and that is why it needs to be exported as a whole => export default Spotify;

const clientId = '****************************';        
const redirectURI = 'http://localhost:3000/';


let accessToken;

const Spotify = {

    getAccessToken(){
        if (accessToken){
            return accessToken;
        }
        
        // check for access token match
        // window.location.href will give me the exact URL of page I am currently at

        //  /access_token=([^&]*)/ => is a regular expression(REGEX) to access the access token => It will let us to capture all of the characters assigned to access token

        // Example URL from Spotify https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123

        // So this will basically goes through the string and if in the URL strings are both  access_token and expires_in it will carry
        
        const accessTokenMatch =  window.location.href.match(/access_token=([^&]*)/);

        
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        
        // If both accessTokenMatch && expiresInMatch exists we want to set up access token value
        if (accessTokenMatch && expiresInMatch){

            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // clear the parameters from the URL so the App does not try to grab in the access token after its expired, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);

            window.history.pushState('Access Token', null, '/')

            return accessToken;
        }
        
        // If we do not have access token match and the expires in match then we want to redirect users to the following URL
        
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

             window.location = accessUrl;
        }

        
    },
    
    search(term){
        
        const accessToken = Spotify.getAccessToken();

        
        // start the promise chain by returning a GET request (using fetch()) to the following Spotify endpoint: https://api.spotify.com/v1/search?type=track&q=TERM with authorisation header(as that is what Spotify requires)
        
        // the way fetch API works is that we pass URL as the first property and that it has second argument which is optional which si all the different options I want to pass into it. For Example If I want to make POST request instead of GET request

        // also Fetch is promise based and I can use ASYNC and .then and .catch 

        // note the authorization header(second argument of fetch)
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {   headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {                   // converting the response to JSON when 
            return response.json();             // our promise is fulfilled
        
        }).then(jsonResponse => {           // => See the explanation *
            if (!jsonResponse.tracks){
                return [];
            }
            
            return jsonResponse.tracks.items.map(track => ({
                
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    // JSON - JavaScript Object Notation

    // => * => when our response was converted to JSON I want to take that response and I am first going to check: If the JSON response.tracks is false => If there are no tracks that exists, then I want to simply return and empty array. However if there is a response then I want to return a mapped array containing a list of track objects with their proerties such as name, artist, album, id and uri 
    
    // jsonResponse.tracks.items.map() => When I am looking through my array 


   
    // Create a method in Spotify.js that accepts two arguments. The first argument is the name of the playlist. The second is an array of track URIs. Inside the function, check if there are values saved to the method’s two arguments. If not, return.
    
    savePlaylist(name, trackUris){
        if (!name || !trackUris.length){
            return;
        }

        // Create three default variables: An access token variable, set to the current user’s access token, A headers variable, set to an object with an Authorization parameter containing the user’s access token in the implicit grant flow request format, An empty variable for the user’s ID
        
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        // Make a request that returns the user’s Spotify username. Convert the response to JSON and save the response id parameter to the user’s ID variable.

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => { 

            userId = jsonResponse.id;

            // Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID

            // Note that specific Spotify API`s are found on https://developer.spotify.com/documentation/web-api/reference/#/ 
            
            // The base URI for all Web API requests is https://api.spotify.com/v1
            // Get User's Playlists is https://api.spotify.com/v1/me/users/{user_id}/playlists

            //Use the Spotify playlist endpoints to find a request that creates a new playlist.

            // Set the playlist name to the value passed into the method.

                        
            return fetch(`https://api.spotify.com/v1/me/users/${userId}/playlists`,
                {
                    
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name})
                
                }).then(response => response.json()         // -> ** 
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;

                    // Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.

                    // Request that adds tracks to a playlist : https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks that can be found on SPITIFY endpoints -> See Above
                    
                    // Set the URIs parameter to an array of track URIs passed into the method.

                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                    {
                        headers: headers, 
                        method: 'POST',
                        body: JSON.stringify({ uris: trackUris})
                         
                    })
                })
        })

        // -> ** => // Convert the response to JSON and save the response id parameter to a variable called playlistID.

        // We have made a fetch to the endpoint of https://api.spotify.com/v1/me/users/${userId}/playlists where we passed in a user ID where we also passed in an object with properties headers set to headers, method set to POST and body set to the name that user has created their playlist

        // we then converted the response to JSON and then from that JSON response we created a variable called playlistID that was set to jsonResponse.id

    }

}; 


export default Spotify;
// This serves as a MODULE not as a COMPONENT! and that is why it needs to be exported as a whole => export default Spotify;

const clientId = '*********************';        
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
        
        // the way fetch API works is that we pass URL as the first property and that it has second property which is optional which si all the different options I want to pass into it. For Example If I want to make POST request instead of GET request

        // also Fetch is promise based and I can use ASYNC and .then and .catch 
        
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
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }

    // JSON - JavaScript Object Notation

    // => * => when our response was converted to JSON I want to take that response and I am first going to check: If the JSON response.tracks is false => If there are no tracks that exists, then I want to simply return and empty array. However if there is a response then I want to return a mapped array containing a list of track objects with their proerties such as name, artist, album, id and uri 
    
    // jsonResponse.tracks.items.map() => When I am looking through my array 



}; 


export default Spotify;
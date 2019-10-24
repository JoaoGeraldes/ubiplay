# ubiplay
A simple and elegant single-page app designed with REACT (create-react-app framework), those including, Babel (transpiler), NPM (package manager) and Webpack (bundler).

### Main focus:
Comunicate with an external REST API with multiple request methods including, POST, GET and DELETE.

## What the app includes:
+ Simple UI design (using Bootstrap 4.3)
+ List all songs requested from an external API
+ User authentication based on a request to API
+ Able to set and delete user music favorites (API requests)

## What the app is still lacking:
+ Sign up feature (also possible with this REST API - still not implemented)
+ Some refactoring on some features for a better human readibility and understanding

What to I still strive for, when designing an app?
+ Organized code
+ Trying my best to respect the principle of One Function Should Do Only One Thing.
+ A class should not be overloaded
+ Constantly learning new ways for improved performance and up-to-date syntax


## Important note: 
+ This app is not working directly with any database nor server either locally or externally except 
the comunication being made with an external REST API through request methods, 
therefore, you might notice that the only thing that maintains a "session" 
alive is a token saved in the state of the app that might be passed as a child to other components or called in the component itself, that's all for the moment and example purposes.

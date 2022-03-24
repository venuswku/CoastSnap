# Guide for Modifiying CoastSnap Website
## Repository Structure
The following files make up the main content of the website:
- `src/components` files: reusable components of the website.
  - `EnlargeImagePopup.js`: enlarges a clicked image to fill up the full width of the user's device.
    - Required properties:
      - `img`: source of image to display.
      - `description`: title of popup that displays the enlarged image.
      - `close`: function used to close the popup of the enlarged image.
    - Example from `LocationInfo.js`:
      ```html
      <EnlargeImagePopup img={enlargedImg} description={enlargedImgDescription} close={handleClose} />
      ```
  - `Home.js`: homepage of website, which is the first page that any user sees when visiting the website.
    - Many examples of placing components in the homepage are found here.
    - Required properties:
      - `scrollElement`: element to scroll to when the homepage is loaded.
      - `setScrollElement`: sets the new element to scroll to.
    - Example from `App.js`:
      ```html
      <Home scrollElement={scrollElement} setScrollElement={setScrollElement} />
      ```
  - `LocationCard.js`: "card" in homepage for each location.
    - Navigates user to location's own page when clicked.
    - Required property:
      - `location`: name of location that the card is for.
    - Example from `Home.js`:
      ```html
      <LocationCard location={loc} />
      ```
  - `LocationDirections.js`: directions to reach the location's picture spot.
    - Required properties:
      - `loc`: name of the location to display directions for.
      - `enlarge`: function used to set the image and description of the popup that enlarges a clicked image.
    - Example from `LocationInfo.js`:
      ```html
      <LocationDirections loc={location} enlarge={handleEnlarge} />
      ```
  - `LocationInfo.js`: page with more information about each Santa Cruz photo location.
    - No required properties
      - Uses the URL parameter to figure out which location to display information about
    - Gets location information from `locations.json`
    - Example from `App.js`:
      ```html
      <LocationInfo />
      ```
  - `MethodsForUploadingPics.js`: details the different ways to upload coastline pictures (through the CoastSnap app or this website).
    - No required properties
    - Example from `Home.js`:
      ```html
      <MethodsForUploadingPics />
      ```
  - `NavBar.js`: navigation bar at the top of all pages on this website.
    - "CoastSnap" leads back to the homepage.
    - "Upload" leads to the Upload Form for uploading pictures through this website.
    - "About" leads to the About section on the homepage.
    - "Locations" leads to the Locations section on the homepage.
    - Required property:
      - `scrollTo`: function used to set the element to navigate to.
    - Example from `App.js`:
      ```html
      <Navbar scrollTo={setScrollElement} />
      ```
  - `Slideshow.js`: slideshow of images displayed on the homepage.
    - Images are from `src/images/slideshow`.
      - Can change images in slideshow by simply changing the images in the `slideshow` folder.
    - No required properties
    - Example from `Home.js`:
      ```html
      <Slideshow />
      ```
  - `UploadConfirmationPopup.js`: popup that appears after the user submits their picture and information in the Upload Form.
    - Either displays a progress bar or an error message (if the upload was unsuccessful).
    - Required properties:
      - `open`: boolean (true or false value) that determines whether or not to show the popup.
      - `togglePopup`: function used to open and close the popup.
      - `progess`: percentage of image that was uploaded; -1 if upload was unsuccessful.
      - `setUploadProgress`: function used to set the upload progress.
      - `scrollTo`: function used to set the element to navigate to.
    - Example from `App.js`:
      ```html
      <UploadConfirmationPopup open={confirmUpload} togglePopup={setConfirmUpload} progress={uploadProgress} setUploadProgress={setUploadProgress} scrollTo={setScrollElement} />
      ```
  - `UploadPicForm.js`: form that user fills out to upload their pictures through this website.
    - User must provide an image and fill out the Location, Name, and Device fields.
    - Required properties:
      - `togglePopup`: function used to open and close the popup for confirming an image upload.
      - `setUploadProgress`: function used to set the upload progress.
    - Example from `App.js`:
      ```html
      <UploadPicForm togglePopup={setConfirmUpload} setUploadProgress={setUploadProgress} />
      ```
- `src/data` files: text used as content in the website.
  - `devices.json`: options provided for the Devices field in the Upload Form.
    - `devices`: list of devices that the user might have used to take a picture of the coastline.
    - `deviceNotListed`: last option with the message to input the name of the user's device if it was not listed.
  - `locations.json`: information about each Santa Cruz location, which is displayed in their respective pages.
    - `name`
    - `description`
    - `image`
    - `timelapseVids`: list of Youtube links to completed timelapse reels.
    - `reasonsForChosingLocation`
    - `googleMapsLink`: link that navigates user directly to Google Maps.
      - Share > Send a link > Copy link
      - Example: https://goo.gl/maps/wgnan6X8yECkpb4C8
    - `mapEmbedLink`: link provided by Google Maps to embed an interactive map of the location.
      - Navigate to googleMapsLink > Share > Embed a map > Copy the provided link in the snippet of code
      - Example: copy the `src` link from the code
        ```html
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.525689468934!2d-122.05888308470588!3d36.94949997991806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2zMzbCsDU2JzU4LjIiTiAxMjLCsDAzJzI0LjEiVw!5e0!3m2!1sen!2sus!4v1648071468616!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        ```
- `src/images` files: images used in the website.
  - `slideshow`: folder containing images shown in the homepage's slideshow.
- `App.css`: all CSS styling used for the website.
  - `className` value of any element would be customly styled if it matched a [selector](https://www.w3schools.com/cssref/css_selectors.asp) in this file
  - examples:
    - `.centeredContent`: selector for elements with a property of `className="centeredContent"`
    - `#uploadedImg`: selector for elements with a property of `id="uploadedImg"`
    - `h1`: selector for elements with a `<h1>` tag
- `App.js`: contains all possible routes for the website.

## Create New Components
To create a new component, add a new `ComponentName.js` file in `src/components` and copy the following:
```html
import React from "react";

const ComponentName = () => {
  return (
    <div>
      <!-- Place component content here! -->
    </div>
  );
};

export default ComponentName;
```

## Add New Locations
1. Add the required location information in `locations.js`.
    - Example:
      ```json
      {
        "name": "Natural Bridges Site 1",
        "description": "Description for Natural Bridges Site 1...",
        "image": "NB1_21_01_27_16_48_Iphone11_IB.jpeg",
        "timelapseVids": ["https://www.youtube.com/embed/akhXr-6nG5g"],
        "reasonsForChosingLocation": [
          "Good exposure",
          "Solid reliable ground points",
          "Interesting to look at on an image reel / time lapse",
          "Very car accessible"
        ],
        "googleMapsLink": "https://goo.gl/maps/rzwiDPqygU3G2vQz8",
        "mapEmbedLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.5256476102936!2d-122.05889068470603!3d36.94950097991815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2zMzbCsDU2JzU4LjIiTiAxMjLCsDAzJzI0LjEiVw!5e0!3m2!1sen!2sus!4v1645167139815!5m2!1sen!2sus"
      }
      ```
    - Use a comma to separate information about each location.
2. Place images of the new location in `src/images`.
3. Add directions for the newly added location in `LocationDirection.js`:
    - Add the following into `LocationDirection.js`:
      ```html
      {loc === "Location Name" &&
        <div>
          <!-- Place directions and images here! -->
        </div>
      }
      ```
    - Replace `Location Name` with the name of the new location (must match the name in `location.json`).
    - Make sure to import any used images at the top of `LocationDirection.js`.
      - Example: `import NB1Lookout1 from "../images/NB1Pic1.jpg";`

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).\
To learn React, check out the [React documentation](https://reactjs.org/).

## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes.\
You may also see any lint errors in the console.
### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!\
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**\
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.\
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.\
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting
This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size
This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App
This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration
This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

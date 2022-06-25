# Guide for Modifiying CoastSnap in Santa Cruz Website
Please document anything that you contributed here! It helps current and future contributors of this website.\
Feel free to email vwku@ucsc.edu or venuswku@gmail.com if you have any questions! I'm always happy to talk with people who are interested/working on bringing CoastSnap to Santa Cruz. 😊\
View what the UCSC team did so far for the pilot CoastSnap program in our [progress report](https://github.com/venuswku/CoastSnap/blob/main/CoastSnap_Progress_Report_10June2022.pdf).

## Table of Contents
[Repository Structure](https://github.com/venuswku/CoastSnap#repository-structure)\
[Create New Components](https://github.com/venuswku/CoastSnap#create-new-components)\
[Add New Locations](https://github.com/venuswku/CoastSnap#add-new-locations)\
[Add New Section to About Page](https://github.com/venuswku/CoastSnap#add-new-section-to-about-page)\
[Add New Team Member to Homepage](https://github.com/venuswku/CoastSnap#add-new-team-member-to-homepage)\
[Add New Section/Link to Footer](https://github.com/venuswku/CoastSnap#add-new-sectionlink-to-footer)\
[Get a Local Copy of Repository to Modify Website](https://github.com/venuswku/CoastSnap#get-a-local-copy-of-repository-to-modify-website)\
[Save Your Website Changes to GitHub](https://github.com/venuswku/CoastSnap#save-your-website-changes-to-github)\
[Publish Your Website Changes on UCSC Server](https://github.com/venuswku/CoastSnap#publish-your-website-changes-on-ucsc-server)\
[Learn More](https://github.com/venuswku/CoastSnap#learn-more)

![Homepage](https://raw.githubusercontent.com/venuswku/CoastSnap/main/src/images/README/Homepage.gif)

## Repository Structure
The following files make up the main content of the website:
- `src/pages` folder: pages of the website.
  - `Home.js`: homepage of website, which is the first page that any user sees when visiting the website.
    - Many examples of placing components in the homepage are found here.
    - No required properties.
    - Example from `App.js`:
      ```html
      <Home />
      ```
  - `About.js`: page that tells user more about the implementation of CoastSnap in Santa Cruz.
    - No required properties.
  - `LocationInfo.js`: page with more information about each Santa Cruz photo location.
    - No required properties.
    - Uses the URL parameter to figure out which location to display information about.
    - Gets location information from `locations.json`
    - Example from `App.js`:
      ```html
      <LocationInfo />
      ```
  - `UploadPicForm.js`: form that user fills out to upload their pictures through this website.
    - User must provide an image and fill out the Location, Name and Device fields.
    - No required properties.
    - Example from `App.js`:
      ```html
      <UploadPicForm />
      ```
    ![Upload Picture Form](https://raw.githubusercontent.com/venuswku/CoastSnap/main/src/images/README/UploadPicForm.gif)
- `src/components` folder: reusable components of the website.
  - `CoastSnapFeatures.js`: list three main features of CoastSnap on the homepage.
    - No required properties.
    - Example from `Home.js`:
      ```html
      <CoastSnapFeatures />
      ```
  - `CoastSnapInSantaCruz.js`: sections that explain why we are bringing CoastSnap to Santa Cruz.
    - If you want to modify or add a section, make sure to edit `coastsnapInSantaCruz.json` in the `src/data` folder.
      - View detailed instructions [here](https://github.com/venuswku/CoastSnap#add-new-section-to-about-page).
    - No required properties.
    - Example from `About.js`:
      ```html
      <CoastSnapInSantaCruz />
      ```
  - `EnlargeImagePopup.js`: enlarges a clicked image to fill up the full width of the user's device.
    - Required properties:
      - `img`: source of image to display.
      - `description`: title of popup that displays the enlarged image.
      - `close`: function used to close the popup of the enlarged image.
    - Example from `LocationInfo.js`:
      ```html
      <EnlargeImagePopup img={enlargedImg} description={enlargedImgDescription} close={handleClose} />
      ```
  - `Footer.js`: footer containing links to resources provided by the City of Santa Cruz and CoastSnap.
    - No required properties.
    - Example from `App.js`:
      ```html
      <Footer className="footer" />
      ```
      - Make sure to add `footer` class to place the footer at bottom of website.
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
  - `MethodsForUploadingPics.js`: details the different ways to upload coastline pictures (through the CoastSnap app or this website).
    - No required properties.
    - Example from `Home.js`:
      ```html
      <MethodsForUploadingPics />
      ```
  - `NavBar.js`: navigation bar at the top of all pages on this website.
    - "CoastSnap" leads back to the homepage.
    - "Upload" leads to the Upload Form for uploading pictures through this website.
    - "About" leads to the About section on the homepage.
    - "Locations" leads to the Locations section on the homepage.
    - No required properties.
    - Example from `App.js`:
      ```html
      <Navbar scrollTo={setScrollElement} />
      ```
  - `Slideshow.js`: slideshow of images displayed on the homepage.
    - Images are from `src/images/slideshow`.
      - Can change images in slideshow by simply changing the images in the `slideshow` folder.
    - No required properties.
    - Example from `Home.js`:
      ```html
      <Slideshow />
      ```
  - `TeamMembers.js`: list of UCSC team members involved with CoastSnap.
    - No required properties.
    - Add or modify team member information by following [these instructions](https://github.com/venuswku/CoastSnap#add-new-team-member-to-homepage).
    - Example from `Home.js`:
      ```html
      <TeamMembers />
      ```
  - `UploadConfirmationPopup.js`: popup that appears after the user submits their picture and information in the Upload Form.
    - Either displays a progress bar or an error message (if the upload was unsuccessful).
    - No required properties.
    - Example from `App.js`:
      ```html
      <UploadConfirmationPopup />
      ```
- `src/data` folder: text used as content in the website (open the JSON files in this folder to see more examples).
  - `coastsnapInSantaCruz.json`: information for each section in the `CoastSnapInSantaCruz` component.
    - `title`: topic of section.
    - `text`: more information related to the topic.
    - `button`: optional property that can be added if you have a link that leads to even more information about the topic.
      - link will appear as a button underneath the `text`
      - first item in list is the link
      - second item is the text that appears on the button
    - `image`: alternate text for the section's image in case it can't be displayed.
  - `devices.json`: options provided for the Devices field in the Upload Form.
    - `devices`: list of devices that the user might have used to take a picture of the coastline.
    - `deviceNotListed`: last option with the message to input the name of the user's device if it was not listed.
  - `teamMembers.json`: list of CoastSnap team members from UCSC.
    - `name`: first and last name of the team member.
    - One of the two following properties must be included:
      - `image`: property for the name of the team member's image, if provided.
      - `initials`: initials of the team member, if the image is not provided.
    - `role`: role(s) that the team member has for the project.
      - Examples: `"Web Developer"` for one role, `"Web Developer & UX/UI Designer"` for two roles
    - `education`: team member's type of degree, major, and graduation year.
      Examples: `"B.S. in Marine Biology, 2022"`, `"B.S. in Computer Science, 2022"`
    - `link`: optional link to the team member's LinkedIn profile or personal website for people to learn more about them.
      - Omit this from the team member's info if they don't have or want to provide a link.
      - If provided, clicking on the team member will open up the link in a new browser tab.
  - `footer.json`: links to resources from the City of Santa Cruz and CoastSnap.
    - Example:
      ```json
      {
        "Learn More": {
          "About Us": "#/about",
          "Resilient Coast Santa Cruz": "https://www.cityofsantacruz.com/government/city-departments/city-manager/climate-action-program/resilient-coast-santa-cruz",
          "Climate Educational Resources": "https://www.cityofsantacruz.com/government/city-departments/city-manager/climate-action-program/climate-educational-resources"
        }
      }
      ```
        - Footer Section Name: Learn More
        - Footer Link Names Under "Learn More" : About Us, Resilient Coast Santa Cruz, Climate Educational Resources
  - `locations.json`: information about each Santa Cruz location, which is displayed in their respective pages.
    - `name`
    - `description`: what makes the location special (i.e. reasons for chosing this location as a photo station).
    - `image`
    - `timelapseVids`: list of Youtube links to completed timelapse reels.
      - Share > Embed > Copy the provided link in the snippet of code
      - Example: copy the `src` value from the following code
        ```html
        <iframe width="560" height="315" src="https://www.youtube.com/embed/akhXr-6nG5g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        ```
    - `googleMapsLink`: link that navigates user directly to Google Maps.
      - Share > Send a link > Copy link
      - Example: https://goo.gl/maps/wgnan6X8yECkpb4C8
    - `mapEmbedLink`: link provided by Google Maps to embed an interactive map of the location.
      - Click on Satellite view of the location
      - Share > Embed a map > Copy the provided link in the snippet of code
      - Example: copy the `src` value from the following code
        ```html
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.525689468934!2d-122.05888308470588!3d36.94949997991806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2zMzbCsDU2JzU4LjIiTiAxMjLCsDAzJzI0LjEiVw!5e0!3m2!1sen!2sus!4v1648071468616!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        ```
- `src/images` folder: images used in the website.
  - Make sure the name of the location folders match the location's `name` property in `locations.json`.
  - `About`: folder containing images shown on the about page.
  - `Homepage`: folder containing images shown on the homepage.
  - `Homepage Slideshow`: folder containing images shown in the homepage's slideshow.
    - Images will appear in the order that you named each image.
  - `CoastSnap in Santa Cruz`: folder containing illustrations for each subsection in the `CoastSnapInSantaCruz` component.
    - Name illustrations in the numerical order that they should be displayed.
      - Example: `1.svg` is used for the first section of the component.
    - `mobile`: folder containing mobile versions of the illustrations.
      - File name should correspond to the desktop version's name.
  - `Location Info`: folder containing illustrations for the `LocationInfo` pages.
  - `UCSC Team`: folder containing images for the `TeamMembers` component on the homepage.
      - Images should be square-shaped for the sizing to match other team member's images.
      - File name should correspond to the first and last name of the team member (with no spaces in between).
  - `Upload`: folder containing illustrations for the `UploadPicForm` page.
  - `Footer`: folder containing illustrations used for the `Footer` component.
  - `README`: folder containing images and gifs used in `README.md`.
- `App.css`: all CSS styling used for the website.
  - `className` value of any element would be customly styled if it matched a [selector](https://www.w3schools.com/cssref/css_selectors.asp) in this file
  - examples:
    - `.centeredContent`: selector for elements with a property of `className="centeredContent"`
    - `#uploadedImg`: selector for elements with a property of `id="uploadedImg"`
    - `h1`: selector for elements with a `<h1>` tag
- `App.js`: contains all possible routes for the website.
  - `ThemeProvider` is used to override default Material UI (MUI) styling.
  - `WebsiteContext` provides the following for any component or page to use:
    - `mobile`: boolean (true or false value) that is used to check if the user's browser size is similar to mobile devices.
      - MUI's default `sm`/small breakpoint = 600 pixels
    - `tablet`: boolean (true or false value) that is used to check if the user's browser size is similar to tablets.
      - MUI's default `md`/medium breakpoint = 900 pixels
    - `scrollElement`: element to scroll to when the homepage is loaded.
    - `setScrollElement`: sets the new element to scroll to.
    - `confirmUpload`: boolean (true or false value) that determines whether or not to show the image upload confirmation popup.
    - `setConfirmUpload`: function used to open and close the popup for confirming an image upload.
    - `uploadProgess`: percentage of image that was uploaded; -1 if upload was unsuccessful.
    - `setUploadProgress`: function used to set the image upload progress.

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
Replace `ComponentName` in the filename and code with a name that reflects the new component that you want to create.

## Add New Locations
![CoastSnap Locations](https://raw.githubusercontent.com/venuswku/CoastSnap/main/src/images/README/LocationPage.gif)
1. Add the required location information in `locations.json`.
    - Example:
      ```json
      {
        "name": "Natural Bridges Site 1",
        "description": "This station has good exposure, solid reliable ground points, is interesting to look at on an image reel / time lapse and very car accessible.",
        "image": "NB1_21_01_27_16_48_Iphone11_IB.jpeg",
        "timelapseVids": ["https://www.youtube.com/embed/akhXr-6nG5g"],
        "googleMapsLink": "https://goo.gl/maps/rzwiDPqygU3G2vQz8",
        "mapEmbedLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1005.7556443852632!2d-122.05724697064817!3d36.949501299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7bfc93095caca331!2zMzbCsDU2JzU4LjIiTiAxMjLCsDAzJzI0LjEiVw!5e1!3m2!1sen!2sus!4v1650736198124!5m2!1sen!2sus"
      }
      ```
    - Use a comma to separate information about each location.
2. Create a new folder in `src/images` and name it with the location's `name` value from `locations.json`. Then place all images for this new location in the folder.
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
      - Example: `import NB1Lookout1 from "../images/Natural Bridges Site 1/NB1Pic1.jpg";`

## Add New Section to About Page
![About Page](https://raw.githubusercontent.com/venuswku/CoastSnap/main/src/images/README/AboutPage.gif)
1. Each section requires an illustration/image. Rename the new section's illustration/image file with a number.
    - This number will be used to determine where the new illustration/image will be placed relative to other existing illustrations/images.
2. Place the renamed illustration file in the `src/images/CoastSnap in Santa Cruz` folder.
3. The mobile layout of the About page is different than the desktop layout. If you have a specific illustration/image for the mobile layout, then repeat step 1 by renaming that illustration/image with the same number and placing it into the `src/images/CoastSnap in Santa Cruz/mobile` folder. Otherwise, add a copy of the desktop illustration/image into the `src/images/CoastSnap in Santa Cruz/mobile` folder.
3. Open the `coastsnapInSantaCruz.json` file located in the `src/data` folder.
4. Paste and modify the following template in order to add text for the new section in the `CoastSnapInSantaCruz` component.
    - Make sure to paste the template in the order that you would like the new section to appear on the About page.
      - Example: If you renamed the new section's illustration to `5` and there are 4 existing sections, then place the text template at the end of the list in `coastsnapInSantaCruz.json`. There should be 4 of these structured templates above our new template.
    ```json
    {
      "title": "Section Title",
      "text": "This is text that talks about the section title in more depth. You can bring attention to certain keywords by placing <span className=\"blueText\">and some important text in between these span tags</span> to bold the text with a <span className=\"blueText\">blue color</span>.",
      "button": ["https://www.websitelink.com/", "Text on Button that Leads to the Specified Website When Clicked"],
      "image": "Alternative Text that Appears When the Image Cannot Load"
    },
    ```
    - The `button` and `image` properties above are optional in case you don't have any resources/links to add.

## Add New Team Member to Homepage
1. Open the `teamMembers.json` file located in the `src/data` folder.
2. Paste the following template after the last teammate's info.
    - If you have an image of the new team member,
      - crop the image into a square shape for the best results
      - rename the image to the new team member's first and last name (without spaces in between)
      - place the image in the `src/images/UCSC Team` folder
      - replace `FirstLast.jpg` with the name of the image and the image format (e.g. `.jpg`, `.png`):
      ```json
      {
        "name": "First Last",
        "image": "FirstLast.jpg",
        "role": "New Team Member's Role(s)",
        "education": "Type of Degree in Major, Graduation Year"
      }
      ```
    - If you don't have an image of the new team member, then provide their initials instead:
      ```json
      {
        "name": "First Last",
        "initials": "FL",
        "role": "New Team Member's Role(s)",
        "education": "Type of Degree in Major, Graduation Year"
      }
      ```
    - Look at other team members' info for examples.
    - Note: Remember to add a comma `,` after the last teammate's info to separate the new teammate's info from theirs.
3. If the new team member has a LinkedIn profile or personal website that they would like to share, then add the following property and replace the placeholder link with their preferred link:
    ```json
    "link": "https://www.linkedin.com/in/username"
    ```
    - Note: Remember to add a comma `,` after the new teammate's `education` property to separate it from the `link` property.

## Add New Section/Link to Footer
- To add a new section to the footer, copy the following and add it to the object in `data/footer.json`:
  ```json
  "New Section Name": {
    <!-- Place section links here. -->
  }
  ```
- To add a new link under a section, choose a section to add the link to and paste the following underneath the section:
  ```json
  "Link Name": "https://www.link.com"
  ```
  - Replace the above with actual link values.
- Example (to create a new section and add two new links under it):
  ```json
  "New Section Name": {
    "Link Name 1": "https://www.link1.com",
    "Link Name 2": "https://www.link2.com"
  }
  ```

## Get a Local Copy of Repository to Modify Website
1. Open a terminal and navigate to a place where you want to store the CoastSnap repository.
2. Run in the terminal: `git clone https://github.com/venuswku/CoastSnap.git`.
3. Email vwku@ucsc.edu or venuswku@gmail.com to get the `.env` file, which contains the environment variables needed to access the Google Drive API. Save the `.env` file at the root of the repository (i.e. same level as the `App.js` and `package.json` files).
4. Run `npm ci` to locally install all package dependencies found in `package-lock.json`.
5. Run the website in development mode with **`npm start`**. Use `ctrl + C` or `cmd + C` to stop it from running.

Once the repository is copied to your local device, you just need to repeat step 5 to see your changes.

## Save Your Website Changes to GitHub
1. Open a terminal and navigate to the CoastSnap repository (e.g. `cd coastsnap`).
2. Run `git add .` to stage or mark the files that you want to save changes for.
    - Note: `.` stages all files that you have made a change on. You can also just replace `.` with a list of file names, separated with a space, to stage specific files (e.g. `git add Home.js LocationInfo.js`).
3. Run `git commit -m "Commit message"` and replace `Commit message` with a brief summary of the changes you made.
4. Run `git push` to push your changes for everyone to see on [GitHub](https://github.com/venuswku/CoastSnap).

## Publish Your Website Changes on UCSC Server
You need to deploy the website so that anyone who visits our [CoastSnap website](https://coastsnap.ucsc.edu/) would see your changes.
1. Build a production version of the website [based on your operating system](https://stackoverflow.com/a/45300532).
    - Open a terminal and navigate to the CoastSnap repository (e.g. `cd coastsnap`).
    - If you have a Windows operating system, execute `npm run build-windows` in the terminal.
    - If you have a Mac operating system, execute `npm run build-mac` in the terminal.
    - New production files should be saved into a `build` folder.\
  ![Production Build](https://raw.githubusercontent.com/venuswku/CoastSnap/main/src/images/README/ProductionBuild.PNG)
2. Deploy through UCSC's server by following [IT's instructions](https://its.ucsc.edu/web/hosting/hosted-pages-tutorial.html).
    - Connect to the UCSC server with the SFTP software of your choice (e.g. FileZilla, WinSCP).
      - Hostname: sftp.ic.ucsc.edu
      - Username: Your UCSC Cruz ID
      - Port Number: 22
      - Authentication Method: Your UCSC Blue Password
    - Open the directory where we'll store the website files: `/afs/cats.ucsc.edu/www/coastsnap/prod/public_html`.
    - Copy website files from this directory's `build` folder into the directory that we recently navigated to.
      - Overwrite previous files if they exist.\
  ![Transfer Production Build to UCSC Server](https://raw.githubusercontent.com/venuswku/CoastSnap/main/src/images/README/TransferBuildToUCSCServer.gif)
3. View deployed changes at https://coastsnap.ucsc.edu/.

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
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**\
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.\
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.\
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

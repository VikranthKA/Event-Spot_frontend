<h2>Event Spot – Online Event Finding App </h2>
<h2>https://event-spot-frontend.vercel.app/</h2>

<h3>Event Spot is an online event-finding app that helps users discover events happening near them using their location coordinates and a specified radius. It offers features for booking tickets, viewing event details, and managing user accounts.</h3>

Frontend Technologies
<ul>
<li>Geo-Spatial Search : Finds events within user's radius using their location & radius (converted to radians)
                    EventModel.find({
                              location: {
                                  $geoWithin: {
                                      $centerSphere: [[userlon, userlat], radiusInRadians]}}}) </li>

<li>  
Icons: @fortawesome/free-solid-svg-icons - Provides vector icons for various purposes.</li>
<li>
Calendar and Events: @fullcalendar/react - Facilitates displaying bookings and events in a calendar format.</li>

<li>Dashboards: @mui/material, apexcharts, react-chartjs-2 - Create visually appealing and interactive dashboards for displaying data like event statistics.</li>

<li>Data Fetching: axios - Enables communication with the backend API to retrieve and send data.</li>

<li>UI Framework and Components: bootstrap, react-bootstrap, @mui/material - Provide building blocks for creating responsive and visually appealing user interfaces.</li>

<li>Form Management: formik, yup - Offer tools for building efficient and user-friendly forms with validation.</li>

<li>Authentication and Authorization: jwt-decode - Decodes JWT tokens for user data to enable role-based access control.</li>

<li>Date Formatting: moment - Allows converting and formatting date objects for user-friendliness.</li>

<li>Reviews and Ratings: react-awesome-stars-rating, react-rating-stars-component - Facilitate user reviews and ratings for events.</li>

<li>Timing: react-countdown - Displays a countdown timer for events with limited time availability.</li>

<li>Image Uploads: react-filepond - Enables users to upload images for event profiles.</li>

<li>Maps: react-leaflet - Integrates interactive maps for visualizing event locations.</li>

<li>Carousel: react-multi-carousel - Presents a carousel component for showcasing events based on categories.</li>

<li>QR Codes: react-qr-code - Generates QR codes for secure access or displaying ticket details.</li>

<li>State Management: react-redux, Context API, useReducer - Manage complex application state effectively.</li>

<li>Routing: react-router-dom - Enables navigation between different sections of the app.</li>

<li>Dropdowns and Selects: react-select - Provides dropdown menus and selection options for categories, addresses, etc.</li>

<li>Notifications: react-toastify, sweetalert2 - Display user notifications like success messages, warnings, or errors.</li>

</ul>


Backend Technologies:

<ul>
<li>Server Framework: express - Provides the foundation for building the backend API that handles user requests and interacts with the database.</li>

<li>Authentication and Authorization: bcryptjs, jsonwebtoken - Implement secure authentication using password hashing and JWT tokens for user authorization.</li>

<li>Security: express-validator, joi, morgan - Validate user input, prevent vulnerabilities, and log HTTP requests and responses for monitoring.</li>

<li>File Storage: @aws-sdk/client-s3, multer, multer-s3 - Integrate with Amazon S3 cloud storage for uploading and managing event images.</li>

<li>Email Management: nodemailer - Sends emails for functionalities like password reset or notifications.</li>

<li>Location and Distance: geolib - Calculates distances between user location and event locations for radius search.</li>

<li>Payments: stripe - Integrates Stripe for secure payment processing of event tickets.</li>

<li>Scheduling Tasks: node-cron - Enables scheduling automated tasks like sending reminder emails or updating event statuses.</li>
</ul>

Overall, Event Spot leverages a comprehensive set of technologies to deliver a user-friendly and feature-rich online event-finding experience.

Additional Notes:

You can further enhance the project by adding documentation, deployment instructions, and unit tests for better maintainability and scalability.
Consider incorporating accessibility best practices to ensure your application is usable by a wider audience.

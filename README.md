# Sketcha - Digital Whiteboard

Sketcha is a modern, responsive, and feature-rich digital whiteboard application built with React and Tailwind CSS. It empowers users to visualize ideas instantly with a suite of drawing tools, shapes, and AI-powered assistance.

## 🚀 Features

### 🎨 Canvas & Tools
*   **Drawing Tools:** Smooth pen and eraser tools with adjustable sizes and colors.
*   **Shapes:** Easily insert geometric shapes like Circles, Squares, Triangles, Stars, Hearts, and Arrows.
*   **Text:** Add text annotations with customizable fonts (Sans-serif, Serif, Monospace, Cursive, Fantasy).
*   **Fill Tool:** Flood fill shapes with colors.
*   **Move Tool:** Select, move, and resize elements on the canvas.
*   **Customization:** Full control over stroke color, background color, and line width.

### 🤖 AI Integration (Sketchy Assistant)
*   **Text-to-Image:** Generate images directly onto the canvas using AI prompts (powered by Pollinations.ai).
*   **Chat Interface:** Interactive sidebar assistant to help generate content.
*   **Quick Shapes:** Rapidly add shapes via the assistant interface.

### 💾 Project Management
*   **Dashboard:** Manage multiple boards from a central hub.
*   **Themes:** Choose from Light, Dark, Gradient, or Dot Grid canvas themes.
*   **Persistence:** Auto-saves work to local storage so you never lose your sketches.
*   **Export/Import:** Save your work as an image or import existing images to the board.

### 🛠️ Technical Features
*   **Responsive Design:** Works seamlessly on desktop and mobile devices.
*   **Undo/Redo:** Robust history management to correct mistakes.
*   **Authentication:** Simulated Login and Sign-up flow with local storage user management.
*   **Payment Simulation:** UI for subscription plans (Weekly, Monthly, Yearly).

## 🛠️ Tech Stack

*   **Frontend:** React.js
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **Icons:** Lucide React
*   **Canvas:** HTML5 Canvas API
*   **AI Service:** Pollinations.ai (Free AI Image Generation)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd 22-WhiteBoard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

*   `src/components/`
    *   `Board.jsx`: The core whiteboard component containing canvas logic, drawing tools, and AI integration.
    *   `HomeBoard.jsx`: The user dashboard for managing projects and themes.
    *   `Landingpage.jsx`: The marketing landing page with features and pricing.
    *   `SignPop.jsx` / `LogPop.jsx`: Authentication modals.
    *   `PaymentModal.jsx`: Simulated payment interface.
*   `src/App.jsx`: Main application routing.

## 🎮 Usage

1.  **Sign Up/Login:** Create an account (data stored locally) to access the dashboard.
2.  **Create Board:** Click "Create New Board" or select a theme from the sidebar.
3.  **Draw:** Use the toolbar at the top to select tools (Pen, Shape, Text, etc.).
4.  **AI Assistant:** Click the "Sketchy Chat" button in the sidebar to open the AI assistant. Type a prompt like "A futuristic city" to generate an image.
5.  **Save:** Click the Save icon to download your sketch as a PNG.

## 📄 License

This project is open source and available under the MIT License.
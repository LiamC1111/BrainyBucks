# Quick Guide: Running BrainyBucks Website Locally

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd BrainyBucks-1
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   - The site will be available at the local address shown in your terminal (usually http://localhost:5173 or similar).

4. **Environment Variables:**
   - If you need to use environment variables, copy `.env.example` to `.env` and fill in your values. (If no `.env.example` exists, ask the project maintainer for required variables.)

5. **Notes:**
   - All Vite build, cache, and environment files are git-ignored to prevent conflicts.
   - If you encounter issues, delete the `node_modules`, `.vite` amd `package-lock.json` folders, then run `npm install` again.

---

For any questions, contact the project maintainer or open an issue in the repository.
